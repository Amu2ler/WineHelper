"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddWinePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [name, setName] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [vintage, setVintage] = useState("");
	const [appellation, setAppellation] = useState("");
	const [region, setRegion] = useState("");
	const [country, setCountry] = useState("");
	const [notes, setNotes] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
			const res = await fetch(`${apiUrl}/api/wines/custom`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, imageUrl, vintage, appellation, region, country, notes }),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || `Erreur ${res.status}`);
			}

			router.push("/search");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Une erreur est survenue.");
		} finally {
			setLoading(false);
		}
	};

	const inputClass = "w-full rounded-none border-b border-zinc-700 bg-transparent px-0 py-3 text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-gold-500";
	const labelClass = "block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1";

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="mx-auto max-w-2xl px-6 py-12 lg:px-12">
				<div className="border-b border-zinc-800 pb-8 mb-10">
					<h1 className="font-serif text-4xl font-medium text-foreground">Ajouter un vin</h1>
					<p className="mt-3 text-zinc-400 font-light">
						Enregistrez un vin avec une image. Il apparaîtra dans vos recherches.
					</p>
				</div>

				{error && (
					<div className="mb-8 border-l-4 border-wine-900 bg-wine-100/20 px-4 py-3 text-sm text-foreground">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Required fields */}
					<fieldset className="space-y-6">
						<legend className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-4">Informations requises</legend>

						<div>
							<label htmlFor="name" className={labelClass}>Nom du vin *</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Ex: Château Pétrus 2010"
								required
								className={inputClass}
							/>
						</div>

						<div>
							<label htmlFor="imageUrl" className={labelClass}>URL de l'image *</label>
							<input
								id="imageUrl"
								type="url"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder="https://example.com/wine-bottle.jpg"
								required
								className={inputClass}
							/>
							{imageUrl && (
								<p className="mt-2 text-xs text-zinc-600 truncate">Aperçu : {imageUrl}</p>
							)}
						</div>
					</fieldset>

					{/* Optional fields */}
					<fieldset className="space-y-6">
						<legend className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">Informations optionnelles</legend>

						<div className="grid gap-6 sm:grid-cols-2">
							<div>
								<label htmlFor="vintage" className={labelClass}>Millésime</label>
								<input
									id="vintage"
									type="text"
									value={vintage}
									onChange={(e) => setVintage(e.target.value)}
									placeholder="Ex: 2019"
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="country" className={labelClass}>Pays</label>
								<input
									id="country"
									type="text"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									placeholder="Ex: France"
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="region" className={labelClass}>Région</label>
								<input
									id="region"
									type="text"
									value={region}
									onChange={(e) => setRegion(e.target.value)}
									placeholder="Ex: Bordeaux"
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="appellation" className={labelClass}>Appellation</label>
								<input
									id="appellation"
									type="text"
									value={appellation}
									onChange={(e) => setAppellation(e.target.value)}
									placeholder="Ex: Pomerol"
									className={inputClass}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="notes" className={labelClass}>Notes / Description</label>
							<textarea
								id="notes"
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								placeholder="Notes de dégustation, description..."
								rows={3}
								className="w-full rounded-none border-b border-zinc-700 bg-transparent px-0 py-3 text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-gold-500 resize-none"
							/>
						</div>
					</fieldset>

					<div className="flex flex-col gap-4 pt-4 sm:flex-row">
						<button
							type="submit"
							disabled={loading}
							className="flex-1 bg-wine-900 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors hover:bg-wine-800 disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{loading ? "Enregistrement..." : "Enregistrer le vin"}
						</button>
						<Link
							href="/search"
							className="flex items-center justify-center border border-zinc-700 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-zinc-400 transition-colors hover:border-zinc-500 hover:text-foreground"
						>
							Annuler
						</Link>
					</div>
				</form>
			</main>
		</div>
	);
}
