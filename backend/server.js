import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { searchMockWines, getMockWineById } from "./mockData.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const WINE_API_HOST = "wine-explorer-api-ratings-insights-and-search.p.rapidapi.com";
const DEFAULT_SEARCH_LIMIT = Number.parseInt(process.env.WINE_SEARCH_LIMIT ?? "6", 10);
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

const COUNTRY_NAMES = {
	fr: "France", it: "Italie", es: "Espagne", de: "Allemagne",
	pt: "Portugal", us: "États-Unis", ar: "Argentine", cl: "Chili",
	au: "Australie", nz: "Nouvelle-Zélande", za: "Afrique du Sud",
	gb: "Royaume-Uni", at: "Autriche", hu: "Hongrie", gr: "Grèce",
	ro: "Roumanie", hr: "Croatie", si: "Slovénie",
};

// In-memory cache: prevents redundant API calls when loading wine details after search
const wineCache = new Map();

// --- Custom wines persistence (JSON file) ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const CUSTOM_WINES_FILE = join(DATA_DIR, "custom-wines.json");

const loadCustomWines = () => {
	if (!existsSync(CUSTOM_WINES_FILE)) return [];
	try {
		return JSON.parse(readFileSync(CUSTOM_WINES_FILE, "utf-8"));
	} catch {
		return [];
	}
};

const saveCustomWines = (wines) => {
	if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
	writeFileSync(CUSTOM_WINES_FILE, JSON.stringify(wines, null, 2), "utf-8");
};

// --- API helpers ---
const apiHeaders = () => ({
	"x-rapidapi-key": process.env.WINE_API_KEY,
	"x-rapidapi-host": WINE_API_HOST,
});

const fetchWineInfo = async (wineId) => {
	const response = await axios.get(`https://${WINE_API_HOST}/info`, {
		params: { _id: wineId },
		headers: apiHeaders(),
	});
	return response.data;
};

const normalizeWineFromInfo = (infoPayload, fallback = {}) => {
	const root = infoPayload ?? {};

	const vintages = Array.isArray(root.vintages) ? root.vintages : [];
	const bestVintage =
		vintages.find((v) => v.statistics?.ratings_count > 0 && v.year) ??
		vintages.find((v) => v.year) ??
		null;

	const rawRating = root.statistics?.ratings_average;
	const rating = rawRating && rawRating > 0 ? Math.round(rawRating * 20) : null;
	const ratingCount = root.statistics?.ratings_count > 0 ? root.statistics.ratings_count : null;

	const countryCode = root.region?.country ?? root.winery?.region?.country;
	const country = countryCode ? (COUNTRY_NAMES[countryCode] ?? countryCode.toUpperCase()) : null;
	const appellation = root.region?.name ?? null;
	const region = root.winery?.region?.name !== appellation ? root.winery?.region?.name ?? null : null;
	const classification = root.region?.class?.abbreviation ?? null;

	const normalized = {
		id: root._id ?? fallback.id,
		name: root.name ?? fallback.name,
		vintage: bestVintage?.year ?? null,
		rating,
		ratingCount,
		classification,
		country,
		region,
		appellation,
		winery: root.winery?.name ?? null,
		typeId: root.type_id ?? null,
		source: "api",
	};

	return Object.fromEntries(
		Object.entries(normalized).filter(([, v]) => v !== null && v !== undefined),
	);
};

// Search custom wines by query
const searchCustomWines = (query) => {
	const wines = loadCustomWines();
	if (!query || query.trim() === "") return wines;
	const q = query.toLowerCase().trim();
	return wines.filter(
		(w) =>
			w.name?.toLowerCase().includes(q) ||
			w.appellation?.toLowerCase().includes(q) ||
			w.region?.toLowerCase().includes(q) ||
			w.country?.toLowerCase().includes(q) ||
			w.description?.toLowerCase().includes(q),
	);
};

// --- Search endpoint ---
app.get("/api/wines/search", async (req, res) => {
	const query = req.query.q || "bordeaux";
	console.log(`[Search] Searching for: "${query}"`);

	// Always include matching custom wines
	const customMatches = searchCustomWines(query);

	if (USE_MOCK_DATA) {
		console.log("[Search] Mock mode");
		const limit = DEFAULT_SEARCH_LIMIT > 0 ? DEFAULT_SEARCH_LIMIT : 6;
		const mockWines = searchMockWines(query, limit);
		return res.json({ wines: [...customMatches, ...mockWines] });
	}

	try {
		const response = await axios.get(`https://${WINE_API_HOST}/search`, {
			params: { wine_name: query },
			headers: apiHeaders(),
		});

		const items = Array.isArray(response.data?.items) ? response.data.items : [];
		const limit = DEFAULT_SEARCH_LIMIT > 0 ? DEFAULT_SEARCH_LIMIT : 6;
		const slicedItems = items.slice(0, limit);
		console.log(`[Search] Found ${items.length} items, processing first ${slicedItems.length}`);

		const apiWines = await Promise.all(
			slicedItems.map(async (item) => {
				let name = "Vin sans nom";
				let id = null;

				if (item && typeof item === "object") {
					const entries = Object.entries(item);
					if (entries.length > 0) {
						name = String(entries[0][0]).trim();
						id = entries[0][1];
					}
				}

				if (!id) return { name };

				// Check cache first to avoid redundant API calls
				if (wineCache.has(id)) {
					console.log(`[Search] Cache hit for ${id}`);
					return wineCache.get(id);
				}

				try {
					const infoPayload = await fetchWineInfo(id);
					const normalized = normalizeWineFromInfo(infoPayload, { id, name });
					wineCache.set(id, normalized);
					return normalized;
				} catch (error) {
					console.error(`[Search] Error fetching info for "${name}" (${id}):`, error.message);
					return { id, name, source: "api" };
				}
			}),
		);

		res.json({ wines: [...customMatches, ...apiWines] });
	} catch (error) {
		console.error("[Search] Error:", error.message);
		if (error.response) console.error("[Search] API response:", error.response.data);
		res.status(500).json({ error: "Erreur lors de la recherche" });
	}
});

// --- Details endpoint ---
app.get("/api/wines/details/:id", async (req, res) => {
	const wineId = req.params.id;
	console.log(`[Details] Fetching details for ID: ${wineId}`);

	// Check if it's a custom wine
	if (wineId.startsWith("custom-")) {
		const customWines = loadCustomWines();
		const wine = customWines.find((w) => w.id === wineId);
		if (wine) return res.json(wine);
		return res.status(404).json({ error: "Vin personnalisé non trouvé" });
	}

	if (USE_MOCK_DATA) {
		const wine = getMockWineById(wineId);
		if (wine) return res.json(wine);
		return res.status(404).json({ error: "Vin non trouvé" });
	}

	// Check in-memory cache first (populated during search)
	if (wineCache.has(wineId)) {
		console.log(`[Details] Cache hit for ${wineId}`);
		return res.json(wineCache.get(wineId));
	}

	try {
		const infoPayload = await fetchWineInfo(wineId);
		const normalized = normalizeWineFromInfo(infoPayload, { id: wineId });
		wineCache.set(wineId, normalized);
		res.json(normalized);
	} catch (error) {
		console.error(`[Details] Error for ${wineId}:`, error.message);
		if (error.response) console.error("[Details] API response:", error.response.data);
		res.status(500).json({ error: "Impossible de récupérer les infos du vin" });
	}
});

// --- Custom wines CRUD ---
app.post("/api/wines/custom", (req, res) => {
	const { name, imageUrl, vintage, appellation, region, country, notes } = req.body;

	if (!name?.trim()) return res.status(400).json({ error: "Le nom est requis" });
	if (!imageUrl?.trim()) return res.status(400).json({ error: "L'URL de l'image est requise" });

	const wine = {
		id: `custom-${Date.now()}`,
		name: name.trim(),
		imageUrl: imageUrl.trim(),
		source: "custom",
		...(vintage && { vintage: String(vintage).trim() }),
		...(appellation && { appellation: appellation.trim() }),
		...(region && { region: region.trim() }),
		...(country && { country: country.trim() }),
		...(notes && { description: notes.trim() }),
	};

	const wines = loadCustomWines();
	wines.push(wine);
	saveCustomWines(wines);

	console.log(`[Custom] Added: "${wine.name}" (${wine.id})`);
	res.status(201).json(wine);
});

app.delete("/api/wines/custom/:id", (req, res) => {
	const wineId = req.params.id;
	const wines = loadCustomWines();
	const filtered = wines.filter((w) => w.id !== wineId);

	if (filtered.length === wines.length) {
		return res.status(404).json({ error: "Vin non trouvé" });
	}

	saveCustomWines(filtered);
	console.log(`[Custom] Deleted: ${wineId}`);
	res.json({ success: true });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
