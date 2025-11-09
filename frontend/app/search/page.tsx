// frontend/app/search/page.tsx␊

"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import type { SearchResponse, WineResult } from "../../types";
import { formatBottleSize, formatLocation, formatPrice, formatRating, formatVintage } from "../../utils";

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
			const res = await fetch(`http://localhost:4000/api/wines/search?q=${encodeURIComponent(searchTerm)}`);
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
		<div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 text-zinc-900">
			<main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 lg:px-12">
				<section className="rounded-3xl bg-white/80 px-6 py-10 shadow-xl shadow-rose-100 ring-1 ring-rose-100 backdrop-blur">
					<h1 className="text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
						Recherchez un vin et obtenez une fiche complète en quelques secondes
					</h1>
					<p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
						Entrez un domaine, un cépage ou une appellation pour découvrir les prix, millésimes, accords mets-vins et notes de dégustation.
					</p>

					<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
						<div className="relative flex-1">
							<input
								type="search"
								placeholder="Ex : Chablis Premier Cru, Syrah, Domaine Tempier..."
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								className="w-full rounded-full border border-rose-100 bg-white px-6 py-4 text-sm text-zinc-700 shadow-inner shadow-rose-50 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
								disabled={loading}
							/>
							<span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-rose-300">Entrée ↵</span>
						</div>
						<button
							type="submit"
							className="flex items-center justify-center rounded-full bg-rose-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
							disabled={loading}
						>
							{loading ? "Recherche..." : "Lancer la recherche"}
						</button>
					</form>

					<div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-rose-600">
						<span className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">Suggestions</span>
						{featuredSuggestions.map((suggestion) => (
							<button
								key={suggestion}
								type="button"
								onClick={() => handleSuggestionClick(suggestion)}
								className="rounded-full border border-rose-200 bg-white px-3 py-1 text-rose-500 transition hover:border-rose-400 hover:text-rose-700"
							>
								{suggestion}
							</button>
						))}
					</div>
				</section>

				<section className="mt-12 flex-1">
					{error && <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/70 px-6 py-4 text-sm text-rose-700">{error}</div>}

					{loading && (
						<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={index} className="h-64 animate-pulse rounded-3xl border border-rose-100 bg-white/80">
									<div className="h-full rounded-3xl bg-linear-to-br from-rose-50 via-white to-amber-50" />
								</div>
							))}
						</div>
					)}

					{!loading && results.length > 0 && (
						<div className="space-y-6">
							<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
								<div>
									<h2 className="text-2xl font-semibold text-zinc-900">Résultats</h2>
									<p className="text-sm text-zinc-600">
										{formattedResultCount} vin{results.length > 1 ? "s" : ""} correspondent à votre recherche.
									</p>
								</div>
								<div className="flex flex-wrap gap-2 text-xs text-zinc-500">
									<span className="rounded-full border border-rose-100 px-3 py-1">Triés par pertinence</span>
									<span className="rounded-full border border-rose-100 px-3 py-1">Données enrichies en direct</span>
								</div>
							</div>

							<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{results.map((wine) => {
									const location = formatLocation(wine);
									const ratingDisplay = formatRating(wine.rating, wine.ratingCount ?? undefined);
									const priceDisplay = formatPrice(wine.price);
									const bottleSize = formatBottleSize(wine.price);
									const description = wine.description || wine.tastingNotes;
									const vintageLabel = formatVintage(wine);
									const releaseLabel = wine.releaseDate
										? (() => {
												const date = new Date(wine.releaseDate);
												return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
										  })()
										: null;

									return (
										<article
											key={wine.id ?? wine.name}
											className="group flex h-full flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
										>
											<div className="relative aspect-4/3 overflow-hidden bg-rose-50">
												{wine.imageUrl ? (
													<Image
														src={wine.imageUrl}
														alt={wine.name}
														fill
														sizes="(max-width: 1024px) 100vw, 33vw"
														className="object-cover transition duration-500 group-hover:scale-105"
														unoptimized
														priority={false}
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-rose-50 via-white to-amber-50 text-sm font-medium text-rose-300">
														Image indisponible
													</div>
												)}

												{ratingDisplay && (
													<span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-600 shadow">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
															<path d="M10 1.5 12.472 7l5.528.438-4.152 3.67 1.284 5.892L10 14.9l-5.132 2.1 1.284-5.892L2 7.438 7.528 7 10 1.5Z" />
														</svg>
														{ratingDisplay}
													</span>
												)}
											</div>

											<div className="flex flex-1 flex-col gap-4 p-6">
												<div className="space-y-2">
													<h3 className="text-lg font-semibold text-zinc-900">{wine.name}</h3>
													{location && <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400">{location}</p>}
													<div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
														{vintageLabel && <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-600">{vintageLabel}</span>}
														{bottleSize && <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{bottleSize}</span>}
														{wine.alcohol && (
															<span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600">
																{typeof wine.alcohol === "number" ? `${wine.alcohol}%` : wine.alcohol}
															</span>
														)}
													</div>
												</div>

												{description && <p className="text-sm leading-relaxed text-zinc-600">{description}</p>}

												{wine.grapes && wine.grapes.length > 0 && (
													<div className="flex flex-wrap gap-2 text-xs text-rose-600">
														{wine.grapes.slice(0, 4).map((grape) => (
															<span key={grape} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1">
																{grape}
															</span>
														))}
														{wine.grapes.length > 4 && (
															<span className="rounded-full border border-rose-100 px-3 py-1 text-rose-400">+{wine.grapes.length - 4} cépages</span>
														)}
													</div>
												)}

												{wine.foodPairings && wine.foodPairings.length > 0 && (
													<div className="rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3 text-xs text-rose-700">
														Accord idéal : {wine.foodPairings[0]}
														{wine.foodPairings.length > 1 && ` + ${wine.foodPairings.length - 1} suggestions`}
													</div>
												)}

												<div className="mt-auto flex items-center justify-between">
													<div className="text-sm text-zinc-500">
														{priceDisplay ? (
															<span className="text-lg font-semibold text-rose-600">{priceDisplay}</span>
														) : (
															<span className="text-sm text-zinc-500">Prix non communiqué</span>
														)}
														{releaseLabel && <p className="text-xs text-zinc-400">Sortie : {releaseLabel}</p>}
													</div>
													<button
														type="button"
														onClick={() => window.open(`http://localhost:4000/api/wines/details/${wine.id}`, "_blank")}
														className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-400 hover:bg-rose-50"
													>
														Voir la fiche JSON
													</button>
												</div>
											</div>
										</article>
									);
								})}
							</div>
						</div>
					)}

					{!loading && !error && results.length === 0 && (
						<div className="mt-16 rounded-3xl border border-dashed border-rose-200 bg-white/60 px-10 py-12 text-center text-sm text-zinc-500">
							<p>Commencez par une recherche ou explorez les suggestions ci-dessus pour obtenir des fiches détaillées.</p>
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
