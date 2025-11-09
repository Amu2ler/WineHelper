// frontend/app/search/page.tsx

"use client";

import { useState } from "react";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	async function handleSearch() {
		if (!query.trim()) return;

		setLoading(true);
		setResults([]);

		try {
			const res = await fetch(`http://localhost:4000/api/wines/search?q=${query}`);
			const data = await res.json();

			setResults(data?.wines || []);
		} catch (err) {
			console.error("Erreur recherche vin:", err);
		}

		setLoading(false);
	}

	return (
		<div style={{ padding: "2rem" }}>
			<h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}> Recherche de vin</h1>

			<div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
				<input
					placeholder="Ex: merlot, chardonnay..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					style={{
						padding: "0.5rem",
						border: "1px solid #ccc",
						borderRadius: "6px",
						flex: 1,
					}}
				/>
				<button
					onClick={handleSearch}
					style={{
						padding: "0.5rem 1rem",
						background: "#7b1f11",
						color: "white",
						borderRadius: "6px",
					}}
				>
					Rechercher
				</button>
			</div>

			{loading && <p> Recherche en cours...</p>}

			{results.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Résultats : {results.length} vins trouvés</h2>

					<ul style={{ listStyle: "none", padding: 0 }}>
						{results.map((wine: any) => (
							<li
								key={wine.id}
								style={{
									padding: "0.8rem",
									marginBottom: "0.7rem",
									border: "1px solid #ddd",
									borderRadius: "8px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									background: "#fafafa",
								}}
							>
								<span style={{ fontSize: "1rem", fontWeight: "500" }}>{wine.name}</span>

								<button
									onClick={() => alert(`ID du vin : ${wine.id}`)}
									style={{
										padding: "0.4rem 0.8rem",
										background: "#7b1f11",
										color: "white",
										borderRadius: "6px",
										fontSize: "0.9rem",
									}}
								>
									Voir détails
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
