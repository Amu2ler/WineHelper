// Mock data for WineHelper - Realistic French wines
// Use this when API quota is limited or for offline development

export const MOCK_WINES = [
	{
		id: "mock-1",
		name: "Château Margaux 2015",
		description: "Un grand cru exceptionnel de l'appellation Margaux. Élégant et raffiné, ce vin offre une complexité aromatique remarquable avec des notes de fruits noirs, de violette et de cèdre. La structure tannique est soyeuse et la finale interminable.",
		imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
			"https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400"
		],
		price: {
			amount: 850,
			currency: "EUR",
			display: "850€",
			bottleSizeMl: 750
		},
		vintage: 2015,
		grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
		alcohol: 13.5,
		tastingNotes: "Arômes de cassis, mûre, violette, cèdre et épices douces. Bouche élégante avec des tanins soyeux et une finale persistante.",
		foodPairings: ["Côte de bœuf grillée", "Gigot d'agneau", "Fromages affinés"],
		rating: 96,
		ratingCount: 342,
		classification: "Premier Grand Cru Classé",
		country: "France",
		region: "Bordeaux",
		subregion: "Médoc",
		appellation: "Margaux"
	},
	{
		id: "mock-2",
		name: "Domaine de la Romanée-Conti Échezeaux 2018",
		description: "Un vin de Bourgogne d'exception issu du domaine le plus prestigieux au monde. Pinot Noir d'une finesse incomparable, avec une profondeur aromatique et une élégance rare.",
		imageUrl: "https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400",
			"https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400"
		],
		price: {
			amount: 1200,
			currency: "EUR",
			display: "1200€",
			bottleSizeMl: 750
		},
		vintage: 2018,
		grapes: ["Pinot Noir"],
		alcohol: 13,
		tastingNotes: "Cerise noire, framboise, rose, truffe, sous-bois. Texture soyeuse et finale d'une longueur exceptionnelle.",
		foodPairings: ["Canard rôti aux cerises", "Bœuf bourguignon", "Fromages de Bourgogne"],
		rating: 98,
		ratingCount: 156,
		classification: "Grand Cru",
		country: "France",
		region: "Bourgogne",
		subregion: "Côte de Nuits",
		appellation: "Échezeaux"
	},
	{
		id: "mock-3",
		name: "Champagne Dom Pérignon 2012",
		description: "Le champagne de prestige par excellence. Assemblage parfait de Chardonnay et Pinot Noir, vieilli sur lies pendant au moins 8 ans. Complexité aromatique et effervescence délicate.",
		imageUrl: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
			"https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400"
		],
		price: {
			amount: 180,
			currency: "EUR",
			display: "180€",
			bottleSizeMl: 750
		},
		vintage: 2012,
		grapes: ["Chardonnay", "Pinot Noir"],
		alcohol: 12.5,
		tastingNotes: "Agrumes, fruits blancs, brioche, amande grillée. Bulles fines et persistantes, finale minérale.",
		foodPairings: ["Caviar", "Homard grillé", "Saint-Jacques poêlées"],
		rating: 95,
		ratingCount: 523,
		classification: "Champagne Millésimé",
		country: "France",
		region: "Champagne",
		subregion: "Épernay",
		appellation: "Champagne"
	},
	{
		id: "mock-4",
		name: "Châteauneuf-du-Pape Château de Beaucastel 2019",
		description: "Un des plus grands vins de la Vallée du Rhône. Assemblage complexe de 13 cépages traditionnels, cultivés en biodynamie. Puissance et élégance réunies.",
		imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
			"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400"
		],
		price: {
			amount: 95,
			currency: "EUR",
			display: "95€",
			bottleSizeMl: 750
		},
		vintage: 2019,
		grapes: ["Grenache", "Mourvèdre", "Syrah", "Counoise", "Cinsault"],
		alcohol: 14.5,
		tastingNotes: "Fruits rouges et noirs, garrigue, réglisse, poivre. Bouche ample et généreuse avec des tanins veloutés.",
		foodPairings: ["Daube provençale", "Gibier", "Fromages corsés"],
		rating: 94,
		ratingCount: 287,
		classification: "AOC Châteauneuf-du-Pape",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône méridional",
		appellation: "Châteauneuf-du-Pape"
	},
	{
		id: "mock-5",
		name: "Chablis Grand Cru Les Clos 2020",
		description: "Le terroir le plus prestigieux de Chablis. Chardonnay pur sur sols kimméridgiens, offrant une minéralité exceptionnelle et une fraîcheur incomparable.",
		imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
			"https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400"
		],
		price: {
			amount: 75,
			currency: "EUR",
			display: "75€",
			bottleSizeMl: 750
		},
		vintage: 2020,
		grapes: ["Chardonnay"],
		alcohol: 13,
		tastingNotes: "Citron, pomme verte, silex, notes iodées. Acidité vive et finale saline très longue.",
		foodPairings: ["Huîtres", "Poissons nobles", "Fromages de chèvre"],
		rating: 93,
		ratingCount: 198,
		classification: "Grand Cru",
		country: "France",
		region: "Bourgogne",
		subregion: "Chablis",
		appellation: "Chablis Grand Cru"
	},
	{
		id: "mock-6",
		name: "Sancerre Domaine Vacheron 2021",
		description: "Un Sauvignon Blanc de référence de la Loire. Cultivé en biodynamie, ce vin exprime parfaitement la typicité du terroir de Sancerre avec sa fraîcheur et sa minéralité.",
		imageUrl: "https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400"
		],
		price: {
			amount: 28,
			currency: "EUR",
			display: "28€",
			bottleSizeMl: 750
		},
		vintage: 2021,
		grapes: ["Sauvignon Blanc"],
		alcohol: 12.5,
		tastingNotes: "Agrumes, pamplemousse, buis, pierre à fusil. Bouche vive et tendue avec une belle longueur.",
		foodPairings: ["Fromage de chèvre de Chavignol", "Poissons de rivière", "Asperges"],
		rating: 91,
		ratingCount: 412,
		classification: "AOC Sancerre",
		country: "France",
		region: "Loire",
		subregion: "Centre-Loire",
		appellation: "Sancerre"
	},
	{
		id: "mock-7",
		name: "Hermitage La Chapelle Paul Jaboulet Aîné 2016",
		description: "Un des plus grands vins de Syrah au monde. Issu de la colline mythique de l'Hermitage, ce vin allie puissance et finesse avec un potentiel de garde exceptionnel.",
		imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400"
		],
		price: {
			amount: 220,
			currency: "EUR",
			display: "220€",
			bottleSizeMl: 750
		},
		vintage: 2016,
		grapes: ["Syrah"],
		alcohol: 14,
		tastingNotes: "Cassis, olive noire, violette, poivre noir, fumée. Structure tannique imposante et finale épicée.",
		foodPairings: ["Gibier à plumes", "Viandes rouges en sauce", "Fromages puissants"],
		rating: 97,
		ratingCount: 234,
		classification: "AOC Hermitage",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône septentrional",
		appellation: "Hermitage"
	},
	{
		id: "mock-8",
		name: "Gewurztraminer Grand Cru Rangen Zind-Humbrecht 2018",
		description: "Un Gewurztraminer d'exception d'Alsace. Cultivé sur le terroir volcanique du Rangen, ce vin offre une intensité aromatique et une complexité remarquables.",
		imageUrl: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400"
		],
		price: {
			amount: 65,
			currency: "EUR",
			display: "65€",
			bottleSizeMl: 750
		},
		vintage: 2018,
		grapes: ["Gewurztraminer"],
		alcohol: 14,
		tastingNotes: "Litchi, rose, épices douces, fruits exotiques. Bouche ample et généreuse avec une belle fraîcheur.",
		foodPairings: ["Foie gras", "Cuisine asiatique épicée", "Munster"],
		rating: 92,
		ratingCount: 167,
		classification: "Grand Cru",
		country: "France",
		region: "Alsace",
		subregion: "Haut-Rhin",
		appellation: "Alsace Grand Cru Rangen"
	},
	{
		id: "mock-9",
		name: "Pomerol Château Pétrus 2010",
		description: "Le vin le plus mythique de Pomerol et l'un des plus grands vins du monde. Merlot d'exception sur terroir d'argile bleue, d'une concentration et d'une élégance inégalées.",
		imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400"
		],
		price: {
			amount: 3500,
			currency: "EUR",
			display: "3500€",
			bottleSizeMl: 750
		},
		vintage: 2010,
		grapes: ["Merlot"],
		alcohol: 14.5,
		tastingNotes: "Prune, truffe, chocolat noir, café. Texture veloutée et profondeur aromatique exceptionnelle.",
		foodPairings: ["Truffe noire du Périgord", "Tournedos Rossini", "Fromages d'exception"],
		rating: 100,
		ratingCount: 89,
		classification: "AOC Pomerol",
		country: "France",
		region: "Bordeaux",
		subregion: "Libournais",
		appellation: "Pomerol"
	},
	{
		id: "mock-10",
		name: "Côte-Rôtie La Landonne Guigal 2017",
		description: "Une des trois cuvées mythiques de Guigal. Syrah issue de la Côte Brune, ce vin puissant et structuré nécessite plusieurs années de garde pour révéler toute sa complexité.",
		imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400"
		],
		price: {
			amount: 380,
			currency: "EUR",
			display: "380€",
			bottleSizeMl: 750
		},
		vintage: 2017,
		grapes: ["Syrah"],
		alcohol: 13.5,
		tastingNotes: "Fruits noirs, bacon fumé, violette, réglisse. Tanins puissants et finale très longue.",
		foodPairings: ["Sanglier", "Côte de bœuf", "Fromages affinés"],
		rating: 96,
		ratingCount: 178,
		classification: "AOC Côte-Rôtie",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône septentrional",
		appellation: "Côte-Rôtie"
	},
	{
		id: "mock-11",
		name: "Pouilly-Fumé Didier Dagueneau Silex 2020",
		description: "Le Sauvignon Blanc le plus recherché de France. Élevage sur lies fines, ce vin offre une minéralité fumée caractéristique et une complexité remarquable.",
		imageUrl: "https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400"
		],
		price: {
			amount: 85,
			currency: "EUR",
			display: "85€",
			bottleSizeMl: 750
		},
		vintage: 2020,
		grapes: ["Sauvignon Blanc"],
		alcohol: 13,
		tastingNotes: "Silex, citron vert, fruit de la passion, notes fumées. Acidité vive et finale minérale persistante.",
		foodPairings: ["Saint-Jacques", "Poissons fumés", "Fromages de chèvre affinés"],
		rating: 94,
		ratingCount: 256,
		classification: "AOC Pouilly-Fumé",
		country: "France",
		region: "Loire",
		subregion: "Centre-Loire",
		appellation: "Pouilly-Fumé"
	},
	{
		id: "mock-12",
		name: "Bandol Domaine Tempier 2018",
		description: "Le vin emblématique de Provence. Assemblage dominé par le Mourvèdre, cultivé sur terroir calcaire face à la Méditerranée. Vin de garde par excellence.",
		imageUrl: "https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400"
		],
		price: {
			amount: 45,
			currency: "EUR",
			display: "45€",
			bottleSizeMl: 750
		},
		vintage: 2018,
		grapes: ["Mourvèdre", "Grenache", "Cinsault"],
		alcohol: 14,
		tastingNotes: "Fruits noirs, garrigue, thym, romarin. Structure tannique solide et finale saline.",
		foodPairings: ["Bouillabaisse", "Agneau de Provence", "Tapenade"],
		rating: 92,
		ratingCount: 189,
		classification: "AOC Bandol",
		country: "France",
		region: "Provence",
		subregion: "Bandol",
		appellation: "Bandol"
	},
	{
		id: "mock-13",
		name: "Condrieu Georges Vernay 2021",
		description: "Le Viognier dans toute sa splendeur. Vin blanc sec et aromatique du Rhône septentrional, d'une richesse et d'une élégance exceptionnelles.",
		imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400"
		],
		price: {
			amount: 55,
			currency: "EUR",
			display: "55€",
			bottleSizeMl: 750
		},
		vintage: 2021,
		grapes: ["Viognier"],
		alcohol: 13.5,
		tastingNotes: "Abricot, pêche blanche, fleur d'acacia, miel. Bouche ronde et généreuse avec une belle fraîcheur.",
		foodPairings: ["Homard à l'armoricaine", "Volaille à la crème", "Fromages à pâte molle"],
		rating: 91,
		ratingCount: 143,
		classification: "AOC Condrieu",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône septentrional",
		appellation: "Condrieu"
	},
	{
		id: "mock-14",
		name: "Saint-Émilion Grand Cru Château Angélus 2016",
		description: "Premier Grand Cru Classé A de Saint-Émilion. Assemblage harmonieux de Merlot et Cabernet Franc, ce vin allie puissance et raffinement.",
		imageUrl: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400"
		],
		price: {
			amount: 320,
			currency: "EUR",
			display: "320€",
			bottleSizeMl: 750
		},
		vintage: 2016,
		grapes: ["Merlot", "Cabernet Franc"],
		alcohol: 14,
		tastingNotes: "Fruits noirs, prune, épices, notes toastées. Tanins soyeux et finale persistante.",
		foodPairings: ["Magret de canard", "Entrecôte bordelaise", "Fromages affinés"],
		rating: 97,
		ratingCount: 267,
		classification: "Premier Grand Cru Classé A",
		country: "France",
		region: "Bordeaux",
		subregion: "Libournais",
		appellation: "Saint-Émilion Grand Cru"
	},
	{
		id: "mock-15",
		name: "Meursault Les Perrières Domaine Coche-Dury 2019",
		description: "Un des Chardonnays les plus recherchés au monde. Terroir calcaire exceptionnel, vinification traditionnelle, résultat sublime.",
		imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400"
		],
		price: {
			amount: 450,
			currency: "EUR",
			display: "450€",
			bottleSizeMl: 750
		},
		vintage: 2019,
		grapes: ["Chardonnay"],
		alcohol: 13,
		tastingNotes: "Noisette, beurre, citron confit, minéralité. Texture crémeuse et finale d'une longueur exceptionnelle.",
		foodPairings: ["Homard thermidor", "Volaille de Bresse à la crème", "Comté 24 mois"],
		rating: 96,
		ratingCount: 124,
		classification: "Premier Cru",
		country: "France",
		region: "Bourgogne",
		subregion: "Côte de Beaune",
		appellation: "Meursault Premier Cru"
	},
	{
		id: "mock-16",
		name: "Crozes-Hermitage Domaine Alain Graillot 2020",
		description: "Un excellent rapport qualité-prix pour découvrir la Syrah du Nord-Rhône. Vin élégant et fruité, accessible jeune mais avec un bon potentiel de garde.",
		imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400"
		],
		price: {
			amount: 32,
			currency: "EUR",
			display: "32€",
			bottleSizeMl: 750
		},
		vintage: 2020,
		grapes: ["Syrah"],
		alcohol: 13,
		tastingNotes: "Fruits rouges, violette, poivre blanc. Tanins fins et finale fraîche.",
		foodPairings: ["Côtelettes d'agneau", "Ratatouille", "Fromages de chèvre"],
		rating: 90,
		ratingCount: 312,
		classification: "AOC Crozes-Hermitage",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône septentrional",
		appellation: "Crozes-Hermitage"
	},
	{
		id: "mock-17",
		name: "Riesling Grand Cru Schlossberg Domaine Weinbach 2020",
		description: "Un Riesling d'Alsace d'exception. Terroir granitique du Schlossberg, ce vin sec offre une pureté aromatique et une minéralité cristalline.",
		imageUrl: "https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1566754436306-0b4c01c5b7b0?w=400"
		],
		price: {
			amount: 48,
			currency: "EUR",
			display: "48€",
			bottleSizeMl: 750
		},
		vintage: 2020,
		grapes: ["Riesling"],
		alcohol: 12.5,
		tastingNotes: "Citron, pêche blanche, minéralité granitique, notes florales. Acidité vive et finale saline.",
		foodPairings: ["Poissons d'eau douce", "Choucroute de la mer", "Fromages à pâte pressée"],
		rating: 93,
		ratingCount: 201,
		classification: "Grand Cru",
		country: "France",
		region: "Alsace",
		subregion: "Haut-Rhin",
		appellation: "Alsace Grand Cru Schlossberg"
	},
	{
		id: "mock-18",
		name: "Gigondas Domaine Santa Duc 2019",
		description: "Un des meilleurs vins de Gigondas. Grenache et Syrah cultivés sur terroir argilo-calcaire, offrant puissance et élégance méditerranéenne.",
		imageUrl: "https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400",
		gallery: [
			"https://images.unsplash.com/photo-1598012334146-b39c2ef0c4f5?w=400"
		],
		price: {
			amount: 38,
			currency: "EUR",
			display: "38€",
			bottleSizeMl: 750
		},
		vintage: 2019,
		grapes: ["Grenache", "Syrah", "Mourvèdre"],
		alcohol: 14.5,
		tastingNotes: "Fruits noirs, garrigue, lavande, réglisse. Bouche généreuse avec des tanins mûrs.",
		foodPairings: ["Daube de bœuf", "Gibier", "Fromages du Sud"],
		rating: 92,
		ratingCount: 223,
		classification: "AOC Gigondas",
		country: "France",
		region: "Vallée du Rhône",
		subregion: "Rhône méridional",
		appellation: "Gigondas"
	}
];

/**
 * Search wines by query string
 * @param {string} query - Search query (name, region, appellation, etc.)
 * @param {number} limit - Maximum number of results to return
 * @returns {Array} Array of matching wines
 */
export function searchMockWines(query = "", limit = 6) {
	if (!query || query.trim() === "") {
		return MOCK_WINES.slice(0, limit);
	}

	const searchTerm = query.toLowerCase().trim();
	
	const results = MOCK_WINES.filter(wine => {
		return (
			wine.name.toLowerCase().includes(searchTerm) ||
			wine.region?.toLowerCase().includes(searchTerm) ||
			wine.appellation?.toLowerCase().includes(searchTerm) ||
			wine.grapes?.some(grape => grape.toLowerCase().includes(searchTerm)) ||
			wine.description?.toLowerCase().includes(searchTerm) ||
			wine.country?.toLowerCase().includes(searchTerm)
		);
	});

	return results.slice(0, limit);
}

/**
 * Get wine details by ID
 * @param {string|number} wineId - Wine ID
 * @returns {Object|null} Wine object or null if not found
 */
export function getMockWineById(wineId) {
	return MOCK_WINES.find(wine => wine.id === wineId || wine.id === String(wineId)) || null;
}
