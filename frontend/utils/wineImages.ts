// frontend/utils/wineImages.ts

/**
 * Mapping manuel des images de vins.
 * La clé est l'ID du vin (ou son nom si l'ID n'est pas fiable), la valeur est l'URL de l'image.
 * Vous pouvez utiliser des images locales (dans public/) ou des URL externes.
 */
export const manualWineImages: Record<string, string> = {
    // Exemple :
    // "12345": "/images/chablis-grand-cru.jpg",
    // "nom-du-vin": "https://example.com/wine.jpg",
};

/**
 * Récupère l'image d'un vin en priorisant le mapping manuel, puis l'image de l'API.
 */
export const getWineImage = (wine: { id?: string | number; name?: string; imageUrl?: string | null }): string | null => {
    if (!wine) return null;

    const id = String(wine.id);
    const name = wine.name;

    // 1. Check manual mapping by ID
    if (id && manualWineImages[id]) {
        return manualWineImages[id];
    }

    // 2. Check manual mapping by Name (fallback)
    if (name && manualWineImages[name]) {
        return manualWineImages[name];
    }

    // 3. Return API image
    return wine.imageUrl || null;
};
