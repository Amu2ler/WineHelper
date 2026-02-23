"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();
	const isHome = pathname === "/";

	if (isHome) return null;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-zinc-950/90 px-6 py-4 backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Link href="/" className="flex items-center gap-3 group">
					<div className="h-7 w-7 rounded-full bg-wine-900 shadow-lg shadow-wine-900/30 transition-transform group-hover:scale-110" />
					<span className="font-serif text-xl font-bold tracking-wide text-foreground">WineHelper</span>
				</Link>

				<nav className="flex gap-6 text-xs font-medium tracking-widest uppercase text-zinc-500">
					<Link
						href="/search"
						className={`transition-colors hover:text-gold-500 ${pathname === "/search" ? "text-gold-500 font-bold" : ""}`}
					>
						Collection
					</Link>
					<Link
						href="/favorites"
						className={`transition-colors hover:text-gold-500 ${pathname === "/favorites" ? "text-gold-500 font-bold" : ""}`}
					>
						Favoris
					</Link>
					<Link
						href="/wines/add"
						className={`transition-colors hover:text-gold-500 ${pathname === "/wines/add" ? "text-gold-500 font-bold" : ""}`}
					>
						+ Ajouter
					</Link>
				</nav>
			</div>
		</header>
	);
}
