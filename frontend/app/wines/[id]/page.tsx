"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatBottleSize, formatLocation, formatPrice, formatRating, formatVintage } from "../../../utils";
import { useFavorites } from "../../../hooks/useFavorites";

// Define strict types for the wine details
interface WineDetails {
	id: string;
	name: string;
	description?: string;
	tastingNotes?: string;
	imageUrl?: string;
	gallery?: string[];
	price?: {
		amount?: number;
		currency?: string;
		display?: string;
	};
	vintage?: string;
	releaseDate?: string;
	grapes?: string[];
	alcohol?: string | number;
	foodPairings?: string[];
	rating?: number;
	ratingCount?: number;
	classification?: string;
	country?: string;
	region?: string;
	subregion?: string;
	appellation?: string;
}

export default function WineDetailsPage() {
	const params = useParams();
	const id = params?.id as string;

	const [wine, setWine] = useState<WineDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { toggleFavorite, isFavorite } = useFavorites();

	useEffect(() => {
		if (!id) return;

		const fetchDetails = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
				const res = await fetch(`${apiUrl}/api/wines/details/${id}`);
				
				if (!res.ok) {
					throw new Error(`Erreur ${res.status}`);
				}

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
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-wine-100 border-t-wine-800" />
					<p className="font-serif text-wine-900 animate-pulse">Chargement du millésime...</p>
				</div>
			</div>
		);
	}

	if (error || !wine) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
				<h1 className="font-serif text-3xl text-wine-900">Oups, une erreur est survenue.</h1>
				<p className="text-zinc-600">{error || "Vin introuvable."}</p>
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

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Navigation */}
			<nav className="border-b border-zinc-100 bg-white/80 px-6 py-4 backdrop-blur-md sticky top-0 z-50">
				<div className="mx-auto flex max-w-7xl items-center justify-between">
					<Link href="/search" className="flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-wine-900">
						← Retour
					</Link>
					<Link href="/" className="font-serif text-xl font-bold text-wine-900">
						WineHelper
					</Link>
					<div className="w-16" /> {/* Spacer for centering */}
				</div>
			</nav>

			<main className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
				<div className="grid gap-12 lg:grid-cols-[1fr,1.2fr]">
					{/* Image Section */}
					<div className="relative aspect-3/4 overflow-hidden rounded-sm bg-zinc-50 shadow-xl shadow-zinc-200 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
						{wine.imageUrl ? (
							<Image
								src={wine.imageUrl}
								alt={wine.name}
								fill
								className="object-contain p-8 transition duration-700 hover:scale-105"
								priority
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-zinc-400">
								Image indisponible
							</div>
						)}
						{ratingDisplay && (
							<div className="absolute right-6 top-6 bg-white/90 px-4 py-2 font-serif text-lg font-bold text-wine-900 shadow-sm backdrop-blur">
								{ratingDisplay}
							</div>
						)}
					</div>

					{/* Content Section */}
					<div className="flex flex-col gap-10 py-4">
						{/* Header Info */}
						<div className="space-y-4 border-b border-zinc-100 pb-8">
							{location && (
								<p className="text-sm font-bold tracking-widest uppercase text-gold-500">
									{location}
								</p>
							)}
							<div className="flex items-start justify-between gap-4">
								<h1 className="font-serif text-4xl font-medium leading-tight text-wine-900 sm:text-5xl">
									{wine.name}
								</h1>
								<button
									onClick={() => toggleFavorite(wine as any)} // Cast needed because WineDetails vs WineResult types might differ slightly, but id/name match
									className="rounded-full bg-zinc-50 p-3 text-wine-900 transition-colors hover:bg-wine-100"
									title={isFavorite(wine.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill={isFavorite(wine.id) ? "currentColor" : "none"}
										stroke="currentColor"
										strokeWidth="1.5"
										className={`w-6 h-6 ${isFavorite(wine.id) ? "text-red-600" : "text-zinc-400"}`}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
										/>
									</svg>
								</button>
							</div>
							<div className="flex flex-wrap items-center gap-4 text-zinc-600">
								{vintageLabel && (
									<span className="rounded-full border border-zinc-200 px-4 py-1 text-sm">
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
								<div className="pt-2 text-3xl font-serif text-wine-900">
									{priceDisplay}
								</div>
							)}
						</div>

						{/* Description */}
						{(wine.description || wine.tastingNotes) && (
							<section className="space-y-4">
								<h2 className="font-serif text-2xl text-wine-900">Notes de dégustation</h2>
								<p className="text-lg font-light leading-relaxed text-zinc-700">
									{wine.description || wine.tastingNotes}
								</p>
							</section>
						)}

						{/* Grapes */}
						{wine.grapes && wine.grapes.length > 0 && (
							<section className="space-y-4">
								<h2 className="font-serif text-2xl text-wine-900">Cépages</h2>
								<div className="flex flex-wrap gap-3">
									{wine.grapes.map((grape) => (
										<span
											key={grape}
											className="bg-wine-100/50 px-4 py-2 text-sm text-wine-900 transition hover:bg-wine-100"
										>
											{grape}
										</span>
									))}
								</div>
							</section>
						)}

						{/* Food Pairings */}
						{wine.foodPairings && wine.foodPairings.length > 0 && (
							<section className="space-y-4 rounded-xl border border-gold-500/20 bg-gold-100/30 p-8">
								<h2 className="font-serif text-2xl text-wine-900">Accords Mets & Vins</h2>
								<ul className="grid gap-3 sm:grid-cols-2">
									{wine.foodPairings.map((pairing) => (
										<li key={pairing} className="flex items-start gap-3 text-zinc-700">
											<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-500" />
											{pairing}
										</li>
									))}
								</ul>
							</section>
						)}

						{/* Technical Specs */}
						<section className="space-y-6 border-t border-zinc-100 pt-8">
							<h2 className="font-serif text-2xl text-wine-900">Fiche Technique</h2>
							<dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 text-sm">
								{wine.classification && (
									<div className="flex justify-between border-b border-zinc-100 pb-2">
										<dt className="text-zinc-500">Classification</dt>
										<dd className="font-medium text-zinc-900">{wine.classification}</dd>
									</div>
								)}
								{wine.appellation && (
									<div className="flex justify-between border-b border-zinc-100 pb-2">
										<dt className="text-zinc-500">Appellation</dt>
										<dd className="font-medium text-zinc-900">{wine.appellation}</dd>
									</div>
								)}
								{wine.region && (
									<div className="flex justify-between border-b border-zinc-100 pb-2">
										<dt className="text-zinc-500">Région</dt>
										<dd className="font-medium text-zinc-900">{wine.region}</dd>
									</div>
								)}
								{wine.country && (
									<div className="flex justify-between border-b border-zinc-100 pb-2">
										<dt className="text-zinc-500">Pays</dt>
										<dd className="font-medium text-zinc-900">{wine.country}</dd>
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
