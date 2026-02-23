"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatLocation, formatPrice, formatRating, formatVintage } from "../../../utils";
import { useFavorites } from "../../../hooks/useFavorites";
import { getWineImage } from "../../../utils/wineImages";

interface WineDetails {
	id: string;
	name: string;
	description?: string;
	tastingNotes?: string;
	imageUrl?: string | null;
	gallery?: string[];
	price?: { amount?: number; currency?: string; display?: string };
	vintage?: string | number;
	releaseDate?: string;
	grapes?: string[];
	alcohol?: string | number;
	foodPairings?: string[];
	rating?: number | string | null;
	ratingCount?: number;
	classification?: string;
	country?: string;
	region?: string;
	subregion?: string;
	appellation?: string;
	winery?: string;
	source?: string;
}

export default function WineDetailsPage() {
	const params = useParams();
	const id = params?.id as string;

	const [wine, setWine] = useState<WineDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites();

	useEffect(() => {
		if (!id) return;

		const fetchDetails = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
				const res = await fetch(`${apiUrl}/api/wines/details/${id}`);
				if (!res.ok) throw new Error(`Erreur ${res.status}`);
				const data = await res.json();
				setWine(data);
			} catch (err) {
				console.error("Erreur chargement vin:", err);
				setError("Impossible de charger les détails de ce vin.");
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [id]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background">
				<div className="flex flex-col items-center gap-4">
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-wine-900" />
					<p className="font-serif text-foreground animate-pulse">Chargement du millésime...</p>
				</div>
			</div>
		);
	}

	if (error || !wine) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
				<h1 className="font-serif text-3xl text-foreground">Oups, une erreur est survenue.</h1>
				<p className="text-zinc-400">{error || "Vin introuvable."}</p>
				<Link href="/search" className="rounded-full bg-wine-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-wine-800">
					Retour à la recherche
				</Link>
			</div>
		);
	}

	const location = formatLocation(wine);
	const priceDisplay = formatPrice(wine.price);
	const ratingDisplay = formatRating(wine.rating, wine.ratingCount);
	const vintageLabel = formatVintage(wine);
	const wineImage = getWineImage(wine);
	const isCustom = wine.source === "custom";

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
				<div className="grid gap-12 lg:grid-cols-[1fr,1.2fr]">
					{/* Image Section */}
					<div className="relative aspect-3/4 overflow-hidden bg-zinc-900 border border-zinc-800 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
						{wineImage ? (
							<Image
								src={wineImage}
								alt={wine.name}
								fill
								className="object-contain p-8 transition duration-700 hover:scale-105"
								priority
							/>
						) : (
							<div className="flex h-full w-full flex-col items-center justify-center gap-4 text-zinc-600">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="w-20 h-20 opacity-30">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
								</svg>
								<span className="text-sm uppercase tracking-widest">Aucune image</span>
							</div>
						)}
						{ratingDisplay && (
							<div className="absolute right-4 top-4 bg-zinc-900/95 px-4 py-2 font-serif text-lg font-bold text-gold-500 shadow-sm backdrop-blur border border-zinc-800">
								{ratingDisplay}
							</div>
						)}
					</div>

					{/* Content Section */}
					<div className="flex flex-col gap-10 py-4">
						{/* Header */}
						<div className="space-y-4 border-b border-zinc-800 pb-8">
							<div className="flex items-center gap-3">
								{location && <p className="text-sm font-bold tracking-widest uppercase text-gold-500">{location}</p>}
								{isCustom && <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-zinc-900">Perso</span>}
							</div>
							<div className="flex items-start justify-between gap-4">
								<h1 className="font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
									{wine.name}
								</h1>
								<button
									onClick={() => toggleFavorite(wine)}
									className="rounded-full bg-zinc-800 p-3 text-foreground transition-colors hover:bg-zinc-700"
									title={favoritesLoaded && isFavorite(wine.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill={favoritesLoaded && isFavorite(wine.id) ? "currentColor" : "none"}
										stroke="currentColor"
										strokeWidth="1.5"
										className={`w-6 h-6 ${favoritesLoaded && isFavorite(wine.id) ? "text-red-500" : "text-zinc-500"}`}
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
									</svg>
								</button>
							</div>
							<div className="flex flex-wrap items-center gap-4 text-zinc-400">
								{wine.winery && <span className="text-sm text-zinc-500">{wine.winery}</span>}
								{vintageLabel && (
									<span className="rounded-full border border-zinc-700 px-4 py-1 text-sm">
										{vintageLabel}
									</span>
								)}
								{wine.alcohol && (
									<span className="text-sm">
										{typeof wine.alcohol === "number" ? `${wine.alcohol}%` : wine.alcohol} alc.
									</span>
								)}
							</div>
							{priceDisplay && (
								<div className="pt-2 text-3xl font-serif text-foreground">
									{priceDisplay}
								</div>
							)}
						</div>

						{/* Description */}
						{(wine.description || wine.tastingNotes) && (
							<section className="space-y-4">
								<h2 className="font-serif text-2xl text-foreground">Notes de dégustation</h2>
								<p className="text-lg font-light leading-relaxed text-zinc-400">
									{wine.description || wine.tastingNotes}
								</p>
							</section>
						)}

						{/* Grapes */}
						{wine.grapes && wine.grapes.length > 0 && (
							<section className="space-y-4">
								<h2 className="font-serif text-2xl text-foreground">Cépages</h2>
								<div className="flex flex-wrap gap-3">
									{wine.grapes.map((grape) => (
										<span key={grape} className="bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-foreground transition hover:bg-zinc-700">
											{grape}
										</span>
									))}
								</div>
							</section>
						)}

						{/* Food Pairings */}
						{wine.foodPairings && wine.foodPairings.length > 0 && (
							<section className="space-y-4 border border-gold-500/20 bg-gold-100/10 p-8">
								<h2 className="font-serif text-2xl text-foreground">Accords Mets & Vins</h2>
								<ul className="grid gap-3 sm:grid-cols-2">
									{wine.foodPairings.map((pairing) => (
										<li key={pairing} className="flex items-start gap-3 text-zinc-400">
											<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
											{pairing}
										</li>
									))}
								</ul>
							</section>
						)}

						{/* Technical Specs */}
						<section className="space-y-6 border-t border-zinc-800 pt-8">
							<h2 className="font-serif text-2xl text-foreground">Fiche Technique</h2>
							<dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 text-sm">
								{wine.classification && (
									<div className="flex justify-between border-b border-zinc-800 pb-2">
										<dt className="text-zinc-500">Classification</dt>
										<dd className="font-medium text-foreground">{wine.classification}</dd>
									</div>
								)}
								{wine.appellation && (
									<div className="flex justify-between border-b border-zinc-800 pb-2">
										<dt className="text-zinc-500">Appellation</dt>
										<dd className="font-medium text-foreground">{wine.appellation}</dd>
									</div>
								)}
								{wine.region && (
									<div className="flex justify-between border-b border-zinc-800 pb-2">
										<dt className="text-zinc-500">Région</dt>
										<dd className="font-medium text-foreground">{wine.region}</dd>
									</div>
								)}
								{wine.country && (
									<div className="flex justify-between border-b border-zinc-800 pb-2">
										<dt className="text-zinc-500">Pays</dt>
										<dd className="font-medium text-foreground">{wine.country}</dd>
									</div>
								)}
							</dl>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}
