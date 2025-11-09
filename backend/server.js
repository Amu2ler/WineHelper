+301 - 44;

// src/backend/server.js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const WINE_API_HOST = "wine-explorer-api-ratings-insights-and-search.p.rapidapi.com";
const DEFAULT_SEARCH_LIMIT = Number.parseInt(process.env.WINE_SEARCH_LIMIT ?? "6", 10);

const firstNonEmpty = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");

const ensureArray = (value) => {
	if (Array.isArray(value)) {
		return value;
	}

	if (value === undefined || value === null) {
		return [];
	}

	if (typeof value === "string") {
		return value.split(/\s*,\s*/).filter(Boolean);
	}

	return [value];
};

const normalizePrice = (candidate) => {
	if (!candidate) {
		return null;
	}
	if (typeof candidate === "number") {
		return { amount: candidate };
	}
	if (typeof candidate === "string") {
		return { display: candidate };
	}
	if (typeof candidate === "object") {
		const amount = firstNonEmpty(
			candidate.amount,
			candidate.value,
			candidate.price,
			candidate.priceValue,
			candidate.min,
			candidate.min_price,
			candidate.max,
			candidate.max_price
		);
		const currency = firstNonEmpty(candidate.currency, candidate.currency_code, candidate.currencyCode, candidate.symbol);
		const display = firstNonEmpty(candidate.display, candidate.formatted, candidate.text, candidate.label);
		const bottleSizeMl = firstNonEmpty(candidate.volume, candidate.bottle_size_ml, candidate.bottleSize, candidate.volume_ml, candidate.ml);
		return Object.fromEntries(Object.entries({ amount, currency, display, bottleSizeMl }).filter(([, value]) => value !== undefined && value !== null));
	}
	return null;
};

const collectImages = (payload) => {
	const sources = [];
	const pushIfString = (value) => {
		if (typeof value === "string" && value.trim()) {
			sources.push(value.trim());
		}
	};
	const explore = (value) => {
		if (!value) {
			return;
		}
		if (typeof value === "string") {
			pushIfString(value);
			return;
		}
		if (Array.isArray(value)) {
			value.forEach(explore);
			return;
		}
		if (typeof value === "object") {
			Object.values(value).forEach(explore);
		}
	};
	explore(payload?.image ?? payload?.image_url ?? payload?.imageUrl);
	explore(payload?.images);
	explore(payload?.labels);
	explore(payload?.photos);
	const unique = [...new Set(sources)];
	return {
		main: unique[0] ?? null,
		gallery: unique,
	};
};

const normalizeWineDetails = (detailPayload, fallback = {}) => {
	const root = detailPayload?.data ?? detailPayload ?? {};
	const wineNode = root.wine ?? root.wine_information ?? root.wineInformation ?? {};
	const metaNode = root.metadata ?? {};
	const vintages = [
		...(Array.isArray(root.vintages) ? root.vintages : []),
		...(Array.isArray(wineNode.vintages) ? wineNode.vintages : []),
		...(Array.isArray(metaNode.vintages) ? metaNode.vintages : []),
	];
	const primaryVintage =
		vintages.find((entry) => entry?.is_main || entry?.isMain || entry?.primary) ??
		(typeof root.vintage === "object" ? root.vintage : undefined) ??
		(typeof wineNode.vintage === "object" ? wineNode.vintage : undefined) ??
		vintages[0];
	const priceCandidate =
		firstNonEmpty(
			primaryVintage?.price,
			Array.isArray(primaryVintage?.prices) ? primaryVintage.prices[0] : undefined,
			root.price,
			Array.isArray(root.prices) ? root.prices[0] : undefined,
			wineNode.price,
			Array.isArray(wineNode.prices) ? wineNode.prices[0] : undefined
		) ?? {};
	const ratingNode = firstNonEmpty(primaryVintage?.ratings, root.ratings, wineNode.ratings, root.scores, wineNode.scores);
	const grapes = firstNonEmpty(root.grapes, wineNode.grapes, primaryVintage?.grapes);
	const classification = firstNonEmpty(root.classification, wineNode.classification, primaryVintage?.classification);
	const country = firstNonEmpty(root.country, wineNode.country, primaryVintage?.country);
	const region = firstNonEmpty(root.region, wineNode.region, primaryVintage?.region);
	const subregion = firstNonEmpty(root.subregion, wineNode.subregion, primaryVintage?.subregion);
	const appellation = firstNonEmpty(root.appellation, wineNode.appellation, primaryVintage?.appellation);
	const { main: imageUrl, gallery } = collectImages({
		image: root.image ?? wineNode.image,
		image_url: root.image_url ?? wineNode.image_url,
		imageUrl: root.imageUrl ?? wineNode.imageUrl,
		images: root.images ?? wineNode.images,
		labels: root.labels ?? wineNode.labels,
		photos: root.photos ?? wineNode.photos,
	});
	const normalized = {
		id: firstNonEmpty(root.wine_id, wineNode.wine_id, wineNode.id, root.id, fallback.id),
		name: firstNonEmpty(root.wine_name, wineNode.wine_name, wineNode.name, root.name, fallback.name),
		description: firstNonEmpty(root.description, wineNode.description, primaryVintage?.description),
		imageUrl,
		gallery,
		price: normalizePrice(priceCandidate),
		vintage: firstNonEmpty(primaryVintage?.year, primaryVintage?.vintage, root.vintage, wineNode.vintage),
		releaseDate: firstNonEmpty(primaryVintage?.release_date, primaryVintage?.releaseDate, root.release_date, root.releaseDate),
		grapes: ensureArray(grapes),
		alcohol: firstNonEmpty(root.alcohol, wineNode.alcohol, primaryVintage?.alcohol),
		tastingNotes: firstNonEmpty(root.tasting_notes, root.tastingNotes, wineNode.tasting_notes, wineNode.tastingNotes),
		foodPairings: ensureArray(firstNonEmpty(root.food_pairings, root.foodPairings, wineNode.food_pairings, wineNode.foodPairings)),
		rating: ratingNode?.average ?? ratingNode?.score ?? ratingNode?.value ?? null,
		ratingCount: ratingNode?.count ?? ratingNode?.reviews ?? ratingNode?.total ?? null,
		classification,
		country,
		region,
		subregion,
		appellation,
	};
	return Object.fromEntries(Object.entries(normalized).filter(([, value]) => value !== undefined && value !== null));
};

const fetchWineDetails = async (wineId) => {
	const response = await axios.get(`https://${WINE_API_HOST}/wine`, {
		params: { wine_id: wineId },
		headers: {
			"x-rapidapi-key": process.env.WINE_API_KEY,
			"x-rapidapi-host": WINE_API_HOST,
		},
	});
	return response.data;
};

app.get("/api/wines/search", async (req, res) => {
	const query = req.query.q || "syrah";

	try {
		const response = await axios.get(`https://${WINE_API_HOST}/search`, {
			params: {
				wine_name: query,
			},
			headers: {
				"x-rapidapi-key": process.env.WINE_API_KEY,
				"x-rapidapi-host": WINE_API_HOST,
			},
		});

		const items = Array.isArray(response.data?.items) ? response.data.items : [];
		const limit = Number.isFinite(DEFAULT_SEARCH_LIMIT) && DEFAULT_SEARCH_LIMIT > 0 ? DEFAULT_SEARCH_LIMIT : 6;
		const slicedItems = items.slice(0, limit);

		const wines = await Promise.all(
			slicedItems.map(async (item) => {
				const entry = item && typeof item === "object" ? Object.entries(item)[0] : undefined;
				const rawName = Array.isArray(entry) ? entry[0] : undefined;
				const rawId = Array.isArray(entry) ? entry[1] : undefined;
				const name = typeof rawName === "string" && rawName.trim() ? rawName.trim() : "Vin sans nom";
				const id = rawId ?? null;

				if (!id) {
					return { name };
				}

				try {
					const detailPayload = await fetchWineDetails(id);
					return normalizeWineDetails(detailPayload, { id, name });
				} catch (error) {
					console.error(`Erreur API Wine Info pour ${id}:`, error.response?.data || error.message);
					return { id, name };
				}
			})
		);

		res.json({ wines });
	} catch (error) {
		console.error("Erreur API vin:", error.response?.data || error.message);
		res.status(500).json({ error: "Erreur lors de la recherche" });
	}
});

app.get("/api/wines/details/:id", async (req, res) => {
	const wineId = req.params.id;

	try {
		const detailPayload = await fetchWineDetails(wineId);
		const normalized = normalizeWineDetails(detailPayload, { id: wineId });
		res.json(normalized);
	} catch (error) {
		console.error("Erreur API Wine Info:", error.response?.data || error.message);
		res.status(500).json({ error: "Impossible de récupérer les infos du vin" });
	}
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
