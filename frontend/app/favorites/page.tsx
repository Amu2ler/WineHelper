"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../../hooks/useFavorites";
import { formatBottleSize, formatLocation, formatPrice, formatRating, formatVintage } from "../../utils";
import { getWineImage } from "../../utils/wineImages";

export default function FavoritesPage() {
	const { favorites, removeFavorite, isLoaded } = useFavorites();

	if (!isLoaded) {
		return null; // or a loading spinner
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12 lg:px-12">
				<section className="rounded-none border-b border-gold-500/20 bg-white/50 px-6 py-10 backdrop-blur-sm">
					<h1 className="font-serif text-4xl font-medium leading-tight text-wine-900 sm:text-5xl">
						Mes Favoris
					</h1>
					<p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-zinc-600">
						Retrouvez ici votre sélection personnelle de vins d'exception.
					</p>
				</section>

				<section className="mt-12 flex-1">
					{favorites.length === 0 ? (
						<div className="mt-16 text-center text-zinc-400">
							<p className="font-serif text-xl italic">"Votre cave est vide pour le moment."</p>
							<Link href="/search" className="mt-4 inline-block text-sm font-bold uppercase tracking-widest text-wine-800 hover:text-wine-900">
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
										className="group flex h-full flex-col bg-white shadow-sm transition-shadow hover:shadow-xl relative"
									>
										<button
											onClick={() => removeFavorite(wine.id!)}
											className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 text-wine-900 shadow-sm hover:bg-white hover:text-red-600 transition-colors"
											title="Retirer des favoris"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
												<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
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
					)}
				</section>
			</main>
		</div>
	);
}
