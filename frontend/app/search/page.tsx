// frontend/app/search/page.tsx␊

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { SearchResponse, WineResult } from "../../types";
import { formatBottleSize, formatLocation, formatPrice, formatRating, formatVintage } from "../../utils";
import { useFavorites } from "../../hooks/useFavorites";
import { getWineImage } from "../../utils/wineImages";

const featuredSuggestions = ["Bordeaux", "Pinot noir", "Champagne", "Chianti", "Riesling"];

const isWineResultArray = (value: unknown): value is WineResult[] =>
	Array.isArray(value) &&
	value.every((item) => {
		if (typeof item !== "object" || item === null) {
			return false;
		}

		const candidate = item as { id?: unknown; name?: unknown };
		const hasValidId = typeof candidate.id === "string" || typeof candidate.id === "number" || typeof candidate?.id === "undefined";

		return hasValidId && typeof candidate.name === "string";
	});

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<WineResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toggleFavorite, isFavorite } = useFavorites();

	const formattedResultCount = useMemo(() => {
		if (results.length === 0) return null;
		return new Intl.NumberFormat("fr-FR").format(results.length);
	}, [results.length]);

	const performSearch = async (rawTerm: string) => {
		const searchTerm = rawTerm.trim();
		if (!searchTerm) return;

		setLoading(true);
		setError(null);
		setResults([]);

		try {
			// Use env var or fallback
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
			const res = await fetch(`${apiUrl}/api/wines/search?q=${encodeURIComponent(searchTerm)}`);
			if (!res.ok) {
				throw new Error(`Statut ${res.status}`);
			}

			const data: SearchResponse = await res.json();
			const maybeWines = data?.wines;

			if (!isWineResultArray(maybeWines)) {
				setError("Les données reçues ne sont pas dans le format attendu.");
				setResults([]);
				return;
			}

			setResults(maybeWines);
		} catch (err) {
			console.error("Erreur recherche vin:", err);
			setError("Impossible de récupérer les vins. Réessayez dans un instant.");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void performSearch(query);
	};

	const handleSuggestionClick = (value: string) => {
		setQuery(value);
		void performSearch(value);
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12 lg:px-12">
				<section className="rounded-none border-b border-gold-500/20 bg-white/50 px-6 py-10 backdrop-blur-sm">
					<h1 className="font-serif text-4xl font-medium leading-tight text-wine-900 sm:text-5xl">
						La Cave
					</h1>
					<p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-zinc-600">
						Recherchez parmi notre sélection de grands crus et pépites méconnues.
					</p>

					<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
						<div className="relative flex-1">
							<input
								type="search"
								placeholder="Ex : Chablis Premier Cru, Syrah, Domaine Tempier..."
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								className="w-full rounded-none border-b-2 border-wine-100 bg-transparent px-2 py-4 text-xl text-wine-900 placeholder-zinc-400 outline-none transition-colors focus:border-wine-800"
								disabled={loading}
							/>
						</div>
						<button
							type="submit"
							className="flex items-center justify-center bg-wine-900 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors hover:bg-wine-800 disabled:cursor-not-allowed disabled:opacity-70"
							disabled={loading}
						>
							{loading ? "Recherche..." : "Rechercher"}
						</button>
					</form>

					<div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium tracking-wide uppercase text-wine-800">
						<span className="text-zinc-400">Suggestions :</span>
						{featuredSuggestions.map((suggestion) => (
							<button
								key={suggestion}
								type="button"
								onClick={() => handleSuggestionClick(suggestion)}
								className="border-b border-transparent transition-colors hover:border-wine-800 hover:text-wine-900"
							>
								{suggestion}
							</button>
						))}
					</div>
				</section>

				<section className="mt-12 flex-1">
					{error && <div className="mb-6 border-l-4 border-wine-800 bg-wine-100/50 px-6 py-4 text-sm text-wine-900">{error}</div>}

					{loading && (
						<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={index} className="h-96 animate-pulse bg-zinc-100" />
							))}
						</div>
					)}

					{!loading && results.length > 0 && (
						<div className="space-y-8">
							<div className="flex items-baseline justify-between border-b border-zinc-200 pb-4">
								<h2 className="font-serif text-2xl text-wine-900">Résultats</h2>
								<p className="text-sm text-zinc-500">
									{formattedResultCount} vin{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
								</p>
							</div>

							<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
								{results.map((wine) => {
									const location = formatLocation(wine);
									const ratingDisplay = formatRating(wine.rating, wine.ratingCount ?? undefined);
									const priceDisplay = formatPrice(wine.price);
									const bottleSize = formatBottleSize(wine.price);
									const description = wine.description || wine.tastingNotes;
									const vintageLabel = formatVintage(wine);

									return (
										<article
											key={wine.id ?? wine.name}
											className="group flex h-full flex-col bg-white shadow-sm transition-shadow hover:shadow-xl relative"
										>
											<button
												onClick={() => toggleFavorite(wine)}
												className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 text-wine-900 shadow-sm hover:bg-white transition-colors"
												title={isFavorite(wine.id!) ? "Retirer des favoris" : "Ajouter aux favoris"}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill={isFavorite(wine.id!) ? "currentColor" : "none"}
													stroke="currentColor"
													strokeWidth="1.5"
													className={`w-5 h-5 ${isFavorite(wine.id!) ? "text-red-600" : "text-zinc-400"}`}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
													/>
												</svg>
											</button>
											<div className="relative aspect-3/4 overflow-hidden bg-zinc-100">
												{getWineImage(wine) ? (
													<Image
														src={getWineImage(wine)!}
														alt={wine.name}
														fill
														sizes="(max-width: 1024px) 100vw, 33vw"
														className="object-cover transition duration-700 group-hover:scale-105"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center bg-zinc-50 text-sm font-medium text-zinc-400">
														Image indisponible
													</div>
												)}

												{ratingDisplay && (
													<div className="absolute right-0 top-4 bg-white px-3 py-1 text-xs font-bold text-wine-900 shadow-sm">
														{ratingDisplay}
													</div>
												)}
											</div>

											<div className="flex flex-1 flex-col gap-4 p-6">
												<div className="space-y-1">
													{location && <p className="text-xs font-bold tracking-widest uppercase text-gold-500">{location}</p>}
													<h3 className="font-serif text-xl font-medium text-wine-900 group-hover:text-wine-800">{wine.name}</h3>
													<div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
														{vintageLabel && <span>{vintageLabel}</span>}
														{bottleSize && <span className="text-zinc-300">•</span>}
														{bottleSize && <span>{bottleSize}</span>}
													</div>
												</div>

												{description && <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">{description}</p>}

												<div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4">
													<div className="text-lg font-serif text-wine-900">
														{priceDisplay || "Prix sur demande"}
													</div>
													<Link
														href={`/wines/${wine.id}`}
														className="text-xs font-bold tracking-widest uppercase text-wine-800 transition-colors hover:text-wine-900"
													>
														Voir la fiche
													</Link>
												</div>
											</div>
										</article>
									);
								})}
							</div>
						</div>
					)}

					{!loading && !error && results.length === 0 && (
						<div className="mt-16 text-center text-zinc-400">
							<p className="font-serif text-xl italic">"Le vin est la partie intellectuelle d'un repas."</p>
							<p className="mt-2 text-sm uppercase tracking-widest">- Alexandre Dumas</p>
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
