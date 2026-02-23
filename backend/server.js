import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
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

const apiHeaders = () => ({
	"x-rapidapi-key": process.env.WINE_API_KEY,
	"x-rapidapi-host": WINE_API_HOST,
});

// Fetch wine info from the real API using /info?_id=wineId
const fetchWineInfo = async (wineId) => {
	const response = await axios.get(`https://${WINE_API_HOST}/info`, {
		params: { _id: wineId },
		headers: apiHeaders(),
	});
	return response.data;
};

// Normalize the /info API response into our standard WineResult shape
const normalizeWineFromInfo = (infoPayload, fallback = {}) => {
	const root = infoPayload ?? {};

	// Pick best vintage: most recent with ratings, fallback to most recent with a year
	const vintages = Array.isArray(root.vintages) ? root.vintages : [];
	const bestVintage =
		vintages.find((v) => v.statistics?.ratings_count > 0 && v.year) ??
		vintages.find((v) => v.year) ??
		null;

	// Rating is on a 0-5 scale → convert to 0-100
	const rawRating = root.statistics?.ratings_average;
	const rating = rawRating && rawRating > 0 ? Math.round(rawRating * 20) : null;
	const ratingCount = root.statistics?.ratings_count > 0 ? root.statistics.ratings_count : null;

	// Location
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
	};

	return Object.fromEntries(
		Object.entries(normalized).filter(([, v]) => v !== null && v !== undefined),
	);
};

// --- Search endpoint ---
app.get("/api/wines/search", async (req, res) => {
	const query = req.query.q || "bordeaux";
	console.log(`[Search] Searching for: "${query}"`);

	if (USE_MOCK_DATA) {
		console.log("[Search] Mock mode");
		const limit = DEFAULT_SEARCH_LIMIT > 0 ? DEFAULT_SEARCH_LIMIT : 6;
		return res.json({ wines: searchMockWines(query, limit) });
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

		const wines = await Promise.all(
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

				try {
					const infoPayload = await fetchWineInfo(id);
					return normalizeWineFromInfo(infoPayload, { id, name });
				} catch (error) {
					console.error(`[Search] Error fetching info for "${name}" (${id}):`, error.message);
					return { id, name };
				}
			}),
		);

		res.json({ wines });
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

	if (USE_MOCK_DATA) {
		const wine = getMockWineById(wineId);
		if (wine) return res.json(wine);
		return res.status(404).json({ error: "Vin non trouvé" });
	}

	try {
		const infoPayload = await fetchWineInfo(wineId);
		const normalized = normalizeWineFromInfo(infoPayload, { id: wineId });
		res.json(normalized);
	} catch (error) {
		console.error(`[Details] Error for ${wineId}:`, error.message);
		if (error.response) console.error("[Details] API response:", error.response.data);
		res.status(500).json({ error: "Impossible de récupérer les infos du vin" });
	}
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
