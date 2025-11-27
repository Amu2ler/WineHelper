"use client";

import { useState, useEffect } from "react";
import { WineResult } from "../types"; // Adjust path if necessary

export function useFavorites() {
	const [favorites, setFavorites] = useState<WineResult[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("winehelper_favorites");
		if (stored) {
			try {
				setFavorites(JSON.parse(stored));
			} catch (e) {
				console.error("Failed to parse favorites", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveFavorites = (newFavorites: WineResult[]) => {
		setFavorites(newFavorites);
		localStorage.setItem("winehelper_favorites", JSON.stringify(newFavorites));
	};

	const addFavorite = (wine: WineResult) => {
		if (!favorites.some((f) => f.id === wine.id)) {
			saveFavorites([...favorites, wine]);
		}
	};

	const removeFavorite = (wineId: string | number) => {
		saveFavorites(favorites.filter((f) => f.id !== wineId));
	};

	const isFavorite = (wineId: string | number) => {
		return favorites.some((f) => f.id === wineId);
	};

	const toggleFavorite = (wine: WineResult) => {
		if (isFavorite(wine.id!)) {
			removeFavorite(wine.id!);
		} else {
			addFavorite(wine);
		}
	};

	return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, isLoaded };
}
