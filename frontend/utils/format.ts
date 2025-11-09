import type { NormalizedPrice, WineResult } from "../types";

export const formatPrice = (price?: NormalizedPrice | null) => {
	if (!price) return null;
	if (price.display) {
		return price.display;
	}

	if (typeof price.amount === "number") {
		const currency = price.currency || "EUR";

		try {
			return new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency,
				maximumFractionDigits: 0,
			}).format(price.amount);
		} catch (error) {
			console.error("Erreur format prix:", error);
			return `${price.amount} ${currency}`.trim();
		}
	}

	return null;
};

export const formatLocation = (wine: WineResult) => {
	const parts = [wine.appellation, wine.subregion, wine.region, wine.country]
		.filter((part): part is string => Boolean(part && part.trim()))
		.map((part) => part.trim());

	if (parts.length === 0) {
		return null;
	}

	return parts.join(" · ");
};

export const formatRating = (rating?: WineResult["rating"], ratingCount?: number | null) => {
	if (rating === null || rating === undefined || rating === "") {
		return null;
	}

	const numeric = typeof rating === "string" ? Number.parseFloat(rating) : rating;

	if (!Number.isFinite(numeric)) {
		return null;
	}

	const base = `${numeric.toFixed(1)}/5`;

	if (typeof ratingCount === "number" && ratingCount > 0) {
		return `${base} · ${ratingCount} avis`;
	}

	return base;
};

export const formatVintage = (wine: WineResult) => {
	if (!wine.vintage) return null;
	if (typeof wine.vintage === "number") {
		return `Millésime ${wine.vintage}`;
	}

	const trimmed = wine.vintage.trim();
	if (!trimmed) return null;

	if (/^\d{4}$/.test(trimmed)) {
		return `Millésime ${trimmed}`;
	}

	return trimmed;
};

export const formatBottleSize = (price?: NormalizedPrice | null) => {
	if (!price?.bottleSizeMl) return null;
	const litres = price.bottleSizeMl / 1000;
	if (!Number.isFinite(litres)) return null;

	return `${litres.toFixed(litres < 1 ? 2 : 1)} L`;
};
