"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../../hooks/useFavorites";
import { formatBottleSize, formatLocation, formatPrice, formatRating, formatVintage } from "../../utils";
import { getWineImage } from "../../utils/wineImages";

export default function FavoritesPage() {
	const { favorites, removeFavorite, isLoaded } = useFavorites();

	if (!isLoaded) return null;

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12 lg:px-12">
				<section className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-10 backdrop-blur-sm">
					<h1 className="font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
						Mes Favoris
					</h1>
					<p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-zinc-400">
						Retrouvez ici votre sélection personnelle de vins d'exception.
					</p>
				</section>

				<section className="mt-12 flex-1">
					{favorites.length === 0 ? (
						<div className="mt-16 text-center text-zinc-600">
							<p className="font-serif text-xl italic">"Votre cave est vide pour le moment."</p>
							<Link href="/search" className="mt-4 inline-block text-sm font-bold uppercase tracking-widest text-wine-800 hover:text-gold-500 transition-colors">
								Explorer la collection
							</Link>
						</div>
					) : (
						<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
							{favorites.map((wine) => {
								const location = formatLocation(wine);
								const ratingDisplay = formatRating(wine.rating, wine.ratingCount ?? undefined);
								const priceDisplay = formatPrice(wine.price);
								const bottleSize = formatBottleSize(wine.price);
								const description = wine.description || wine.tastingNotes;
								const vintageLabel = formatVintage(wine);

								return (
									<article
										key={wine.id ?? wine.name}
										className="group flex h-full flex-col bg-zinc-900 border border-zinc-800 shadow-sm transition-all hover:shadow-xl hover:border-zinc-700 relative"
									>
										<button
											onClick={() => wine.id != null && removeFavorite(wine.id)}
											className="absolute right-2 top-2 z-10 rounded-full bg-zinc-800/80 p-2 text-red-500 shadow-sm hover:bg-zinc-700 transition-colors"
											title="Retirer des favoris"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
												<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
											</svg>
										</button>

										<div className="relative aspect-3/4 overflow-hidden bg-zinc-800">
											{getWineImage(wine) ? (
												<Image
													src={getWineImage(wine)!}
													alt={wine.name}
													fill
													sizes="(max-width: 1024px) 100vw, 33vw"
													className="object-cover transition duration-700 group-hover:scale-105"
												/>
											) : (
												<div className="flex h-full w-full flex-col items-center justify-center gap-3 text-zinc-600">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 opacity-40">
														<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
													</svg>
													<span className="text-xs uppercase tracking-widest">Aucune image</span>
												</div>
											)}

											{ratingDisplay && (
												<div className="absolute right-0 top-4 bg-zinc-900/95 px-3 py-1 text-xs font-bold text-gold-500 shadow-sm">
													{ratingDisplay}
												</div>
											)}
										</div>

										<div className="flex flex-1 flex-col gap-4 p-6">
											<div className="space-y-1">
												{location && <p className="text-xs font-bold tracking-widest uppercase text-gold-500">{location}</p>}
												<h3 className="font-serif text-xl font-medium text-foreground group-hover:text-wine-800">{wine.name}</h3>
												<div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
													{vintageLabel && <span>{vintageLabel}</span>}
													{bottleSize && <span className="text-zinc-700">•</span>}
													{bottleSize && <span>{bottleSize}</span>}
												</div>
											</div>

											{description && <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">{description}</p>}

											<div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-4">
												<div className="text-lg font-serif text-foreground">
													{priceDisplay || "Prix sur demande"}
												</div>
												<Link
													href={`/wines/${wine.id}`}
													className="text-xs font-bold tracking-widest uppercase text-wine-800 transition-colors hover:text-gold-500"
												>
													Voir la fiche
												</Link>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
