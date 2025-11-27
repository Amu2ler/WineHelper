"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();
	const isHome = pathname === "/";

	// On home page, we might want a different style or no navbar if it's built-in
	// But for now, let's make it consistent.
	// If the user wants the specific home header, we can hide this one on home.
	// Given the design in page.tsx, it has its own header.
	if (isHome) return null;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-white/80 px-6 py-4 backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Link href="/" className="flex items-center gap-3 group">
					<div className="h-8 w-8 rounded-full bg-wine-800 shadow-lg shadow-wine-100 transition-transform group-hover:scale-110" />
					<span className="font-serif text-xl font-bold tracking-wide text-wine-900">WineHelper</span>
				</Link>

				<nav className="flex gap-6 text-sm font-medium tracking-widest uppercase text-zinc-500">
					<Link
						href="/search"
						className={`transition-colors hover:text-wine-800 ${pathname === "/search" ? "text-wine-900 font-bold" : ""}`}
					>
						Collection
					</Link>
					<Link
						href="/favorites"
						className={`transition-colors hover:text-wine-800 ${pathname === "/favorites" ? "text-wine-900 font-bold" : ""}`}
					>
						Favoris
					</Link>
				</nav>
			</div>
		</header>
	);
}
