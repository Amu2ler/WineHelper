import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// 🔥 Route test API externe
app.get("/api/wines/search", async (req, res) => {
	res.json({ message: "Backend OK - API en place." });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
