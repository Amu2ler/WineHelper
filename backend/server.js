// src/backend/server.js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// Route test API externe
app.get("/api/wines/search", async (req, res) => {
	const query = req.query.q || "syrah";

	try {
		const response = await axios.get("https://wine-explorer-api-ratings-insights-and-search.p.rapidapi.com/search", {
			params: {
				wine_name: query,
			},
			headers: {
				"x-rapidapi-key": process.env.WINE_API_KEY,
				"x-rapidapi-host": "wine-explorer-api-ratings-insights-and-search.p.rapidapi.com",
			},
		});

		const items = response.data.items || [];

		// Reformater proprement
		const wines = items.map((item) => {
			const name = Object.keys(item)[0];
			const id = item[name];
			return { name, id };
		});

		res.json({ wines });
	} catch (error) {
		console.error("Erreur API vin:", error.response?.data || error.message);
		res.status(500).json({ error: "Erreur lors de la recherche" });
	}
});

app.get("/api/wines/details/:id", async (req, res) => {
	const wineId = req.params.id;

	try {
		const response = await axios.get("https://wine-explorer-api-ratings-insights-and-search.p.rapidapi.com/wine", {
			params: { wine_id: wineId },
			headers: {
				"x-rapidapi-key": process.env.WINE_API_KEY,
				"x-rapidapi-host": "wine-explorer-api-ratings-insights-and-search.p.rapidapi.com",
			},
		});

		res.json(response.data);
	} catch (error) {
		console.error("Erreur API Wine Info:", error.response?.data || error.message);
		res.status(500).json({ error: "Impossible de récupérer les infos du vin" });
	}
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
