import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const playfair = Playfair_Display({
	variable: "--font-serif",
	subsets: ["latin"],
	display: "swap",
});

const lato = Lato({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "WineHelper · L'Excellence du Vin",
	description: "Découvrez, comparez et notez des vins en quelques secondes grâce à WineHelper, l'assistant pensé pour les cavistes et les épicuriens.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={`${playfair.variable} ${lato.variable}`}>
			<body className="antialiased">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
