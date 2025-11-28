// frontend/app/page.tsx

import Link from "next/link";

const features = [
	{
		title: "Accords mets & vins instantanés",
		description: "Saisissez un plat ou une envie : WineHelper suggère des bouteilles équilibrées selon la région, le cépage et le profil aromatique.",
	},
	{
		title: "Notes et commentaires partagés",
		description: "Centralisez vos coups de cœur, comparez les avis de votre équipe et construisez votre cave idéale au fil des dégustations.",
	},
	{
		title: "Fiches techniques enrichies",
		description: "Accédez en un clin d’œil aux millésimes, domaines et accords recommandés pour guider vos clients avec précision.",
	},
];

const steps = [
	{
		title: "Cherchez",
		description: "Entrez un nom, un cépage ou une appellation et explorez des centaines de références triées par pertinence.",
	},
	{
		title: "Comparez",
		description: "Analysez les fiches détaillées, consultez les notes des sommeliers et repérez les accords parfaits.",
	},
	{
		title: "Servez",
		description: "Partagez une sélection personnalisée avec vos clients ou votre entourage en quelques clics.",
	},
];

const testimonials = [
	{
		quote: "WineHelper a transformé notre manière de conseiller les clients : les fiches sont claires, rapides à trouver et nos ventes ont gagné en cohérence.",
		author: "Claire, sommelière chez Le Cep Délicat",
	},
];

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground selection:bg-wine-100 selection:text-wine-900">
			<main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-12">
				{/* Header */}
				<header className="flex flex-col items-center justify-between gap-8 sm:flex-row">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-wine-800 shadow-lg shadow-wine-100" />
						<span className="font-serif text-2xl font-bold tracking-wide text-wine-900">WineHelper</span>
					</div>
					<nav className="flex gap-8 text-sm font-medium tracking-widest uppercase text-zinc-500">
						<Link href="/search" className="transition-colors hover:text-wine-800">
							Collection
						</Link>
						<a href="#philosophie" className="transition-colors hover:text-wine-800">
							Philosophie
						</a>
						<a href="#temoignages" className="transition-colors hover:text-wine-800">
							Avis
						</a>
					</nav>
				</header>

				{/* Hero Section */}
				<section className="mt-20 flex flex-col items-center text-center lg:mt-32">
					<span className="mb-6 rounded-full border border-gold-500/30 bg-gold-100/50 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-wine-900">
						L'Excellence à portée de main
					</span>
					<h1 className="max-w-4xl font-serif text-5xl font-medium leading-tight text-wine-900 sm:text-7xl">
						L'art de choisir <br />
						<span className="italic text-wine-800">le vin parfait.</span>
					</h1>
					<p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-zinc-600">
						Explorez les plus grands vignobles, découvrez des millésimes d'exception et trouvez l'accord mets-vins idéal grâce à votre sommelier personnel intelligent.
					</p>
					
					<div className="mt-12 flex flex-col gap-4 sm:flex-row">
						<Link
							href="/search"
							className="group relative overflow-hidden rounded-full bg-wine-900 px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-wine-900/20 transition-all hover:bg-wine-800 hover:shadow-wine-900/30"
						>
							<span className="relative z-10 tracking-widest uppercase">Commencer l'expérience</span>
						</Link>
					</div>
				</section>

				{/* Features / Philosophy */}
				<section id="philosophie" className="mt-32 grid gap-12 border-t border-zinc-200 py-24 lg:grid-cols-3">
					<div className="space-y-4">
						<span className="font-serif text-4xl text-gold-500">01</span>
						<h3 className="font-serif text-xl font-bold text-wine-900">Expertise</h3>
						<p className="text-zinc-600 leading-relaxed">
							Accédez à une base de données mondiale, enrichie par des critiques reconnus et des analyses de millésimes précises.
						</p>
					</div>
					<div className="space-y-4">
						<span className="font-serif text-4xl text-gold-500">02</span>
						<h3 className="font-serif text-xl font-bold text-wine-900">Simplicité</h3>
						<p className="text-zinc-600 leading-relaxed">
							Une interface épurée conçue pour vous guider vers l'essentiel : le plaisir de la dégustation.
						</p>
					</div>
					<div className="space-y-4">
						<span className="font-serif text-4xl text-gold-500">03</span>
						<h3 className="font-serif text-xl font-bold text-wine-900">Harmonie</h3>
						<p className="text-zinc-600 leading-relaxed">
							Des suggestions d'accords mets-vins sur mesure pour sublimer chaque repas et chaque occasion.
						</p>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-auto flex flex-col items-center justify-between gap-6 border-t border-zinc-200 py-12 text-sm text-zinc-400 sm:flex-row">
					<p>© {new Date().getFullYear()} WineHelper. L'abus d'alcool est dangereux pour la santé.</p>
					<div className="flex gap-6">
						<a href="#" className="hover:text-wine-800">Mentions Légales</a>
						<a href="#" className="hover:text-wine-800">Contact</a>
					</div>
				</footer>
			</main>
		</div>
	);
}
