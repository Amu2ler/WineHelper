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
		<div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 text-zinc-900">
			<main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 lg:px-12">
				<header className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<div className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.3em] text-rose-600">
						<span className="h-2 w-2 rounded-full bg-rose-600" aria-hidden />
						WineHelper
					</div>
					<nav className="flex gap-4 text-sm font-medium text-zinc-600">
						<Link href="/search" className="rounded-full border border-rose-200 px-4 py-2 transition-colors hover:border-rose-400 hover:text-rose-600">
							Recherche
						</Link>
						<a href="#fonctionnalites" className="rounded-full border border-transparent px-4 py-2 transition-colors hover:text-rose-600">
							{" "}
							Fonctionnalités
						</a>
						<a href="#temoignages" className="rounded-full border border-transparent px-4 py-2 transition-colors hover:text-rose-600">
							Témoignages
						</a>
					</nav>
				</header>

				<section className="relative mt-16 overflow-hidden rounded-3xl bg-white/70 px-8 py-14 shadow-xl ring-1 ring-rose-100 backdrop-blur-lg sm:px-12">
					<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.25),transparent_55%)]" />
					<div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
						<div className="space-y-8">
							<p className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
								Votre sommelier numérique
							</p>
							<h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
								Simplifiez vos recommandations et révélez des vins inoubliables
							</h1>
							<p className="max-w-xl text-lg leading-relaxed text-zinc-600">
								Centralisez vos découvertes, profitez d’une recherche ultra rapide et offrez des accords sur mesure. WineHelper vous accompagne de la cave à la
								table.
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
								<Link
									href="/search"
									className="flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-0.5 hover:bg-rose-700"
								>
									Explorer les vins
								</Link>
								<a
									href="#etapes"
									className="flex items-center justify-center rounded-full border border-rose-200 px-8 py-3 text-sm font-semibold text-rose-600 transition-colors hover:border-rose-400"
								>
									Voir comment ça marche
								</a>
							</div>
						</div>
						<div className="relative mx-auto grid max-w-sm gap-6">
							<div className="rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-lg shadow-rose-100">
								<h2 className="text-base font-semibold text-rose-700">En un coup d’œil</h2>
								<dl className="mt-6 space-y-4 text-sm text-zinc-600">
									<div className="flex justify-between">
										<dt>Références analysées</dt>
										<dd className="font-semibold text-zinc-900">5 200+</dd>
									</div>
									<div className="flex justify-between">
										<dt>Profils aromatiques suivis</dt>
										<dd className="font-semibold text-zinc-900">32</dd>
									</div>
									<div className="flex justify-between">
										<dt>Sommeliers actifs</dt>
										<dd className="font-semibold text-zinc-900">280</dd>
									</div>
								</dl>
							</div>
							<div className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50 via-white to-rose-50 p-6 text-sm leading-relaxed text-amber-900 shadow-md">
								« Trouver l’accord parfait n’a jamais été aussi rapide. WineHelper rassemble toutes les informations essentielles dans une interface claire et
								inspirante. »
							</div>
						</div>
					</div>
				</section>

				<section id="fonctionnalites" className="mt-24">
					<h2 className="text-3xl font-semibold text-zinc-900">Fonctionnalités clés</h2>
					<p className="mt-4 max-w-2xl text-base text-zinc-600">
						Des outils pensés pour les professionnels comme pour les passionnés afin d’explorer les vins en toute confiance.
					</p>
					<div className="mt-10 grid gap-6 lg:grid-cols-3">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="group flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
							>
								<div className="h-10 w-10 rounded-full bg-rose-100 text-center text-2xl leading-10 text-rose-600">•</div>
								<h3 className="text-xl font-semibold text-zinc-900">{feature.title}</h3>
								<p className="text-sm leading-relaxed text-zinc-600">{feature.description}</p>
							</div>
						))}
					</div>
				</section>

				<section id="etapes" className="mt-24 rounded-3xl bg-white/70 px-8 py-12 shadow-inner shadow-rose-100 ring-1 ring-rose-100">
					<h2 className="text-3xl font-semibold text-zinc-900">Comment ça fonctionne ?</h2>
					<div className="mt-10 grid gap-8 md:grid-cols-3">
						{steps.map((step, index) => (
							<div key={step.title} className="relative pl-6">
								<span className="absolute left-0 top-0 text-3xl font-semibold text-rose-200">{String(index + 1).padStart(2, "0")}</span>
								<h3 className="text-xl font-semibold text-zinc-900">{step.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>
							</div>
						))}
					</div>
				</section>

				<section id="temoignages" className="mt-24">
					<h2 className="text-3xl font-semibold text-zinc-900">Ils en parlent</h2>
					<div className="mt-10 grid gap-6 md:grid-cols-2">
						{testimonials.map((testimonial) => (
							<figure key={testimonial.author} className="flex flex-col gap-6 rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-lg">
								<blockquote className="text-lg leading-relaxed text-zinc-700">{testimonial.quote}</blockquote>
								<figcaption className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">{testimonial.author}</figcaption>
							</figure>
						))}
						<div className="flex flex-col justify-between gap-6 rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50 via-white to-rose-50 p-8 text-zinc-700 shadow-inner">
							<h3 className="text-xl font-semibold text-zinc-900">Prêts à enrichir votre cave ?</h3>
							<p className="text-sm leading-relaxed">
								Créez un espace partagé avec votre équipe, sauvegardez vos fiches de dégustation et suivez vos trouvailles au fil des saisons.
							</p>
							<Link
								href="/search"
								className="inline-flex w-max items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-rose-700"
							>
								Démarrer une recherche
							</Link>
						</div>
					</div>
				</section>

				<footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-rose-100 py-8 text-sm text-zinc-500 sm:flex-row">
					<p>© {new Date().getFullYear()} WineHelper. Tous droits réservés.</p>
					<div className="flex gap-4">
						<a href="#fonctionnalites" className="transition-colors hover:text-rose-600">
							Fonctionnalités
						</a>
						<a href="#etapes" className="transition-colors hover:text-rose-600">
							Méthode
						</a>
						<Link href="/search" className="transition-colors hover:text-rose-600">
							Recherche
						</Link>
					</div>
				</footer>
			</main>
		</div>
	);
}
