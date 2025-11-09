export type NormalizedPrice = {
	amount?: number;
	currency?: string;
	display?: string;
	bottleSizeMl?: number;
};

export type WineResult = {
	id?: number | string;
	name: string;
	description?: string;
	imageUrl?: string | null;
	gallery?: string[];
	price?: NormalizedPrice | null;
	vintage?: string | number;
	releaseDate?: string;
	grapes?: string[];
	alcohol?: string | number;
	tastingNotes?: string;
	foodPairings?: string[];
	rating?: number | string | null;
	ratingCount?: number | null;
	classification?: string;
	country?: string;
	region?: string;
	subregion?: string;
	appellation?: string;
};

export type SearchResponse = {
	wines?: unknown;
};
