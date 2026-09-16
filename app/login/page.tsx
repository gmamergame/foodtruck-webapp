"use client";

import Link from "next/link";
import { useState } from "react";

const content = {
	nl: {
		tagline: "Vers eten, verse drops.",
		title: "Welkom terug",
		description: "Log in om je favoriete foodtruck-drops te bekijken.",
		email: "E-mailadres",
		emailPlaceholder: "jij@voorbeeld.nl",
		password: "Wachtwoord",
		passwordPlaceholder: "Je wachtwoord",
		remember: "Ingelogd blijven",
		forgotPassword: "Wachtwoord vergeten?",
		login: "Inloggen",
		noAccount: "Nog geen account?",
		register: "Account aanmaken",
        back: "Terug",
	},
	en: {
		tagline: "Fresh food, fresh drops.",
		title: "Welcome back",
		description: "Log in to see your favorite foodtruck drops.",
		email: "Email address",
		emailPlaceholder: "you@example.com",
		password: "Password",
		passwordPlaceholder: "Your password",
		remember: "Keep me logged in",
		forgotPassword: "Forgot password?",
		login: "Log in",
		noAccount: "Don't have an account yet?",
		register: "Create an account",
        back: "Back",
	},
};

export default function LoginPage() {
	const [language, setLanguage] = useState<"nl" | "en">("nl");
	const t = content[language];

	return (
		<main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 py-10 text-white">
			<section className="w-full max-w-md">
				<div className="mb-8 text-center">
                    <Link
	                    href="/"
	                    className="fixed left-5 top-5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-300 ring-1 ring-white/10 transition hover:bg-zinc-800 hover:text-white"
                    >
                    	{t.back}
                    </Link>
					<Link href="/" className="text-xl font-black tracking-tight">
						FOODTRUCK<span className="text-orange-400">.</span>
					</Link>

					<p className="mt-6 text-sm font-bold uppercase tracking-widest text-orange-400">
						{t.tagline}
					</p>

					<h1 className="mt-3 text-4xl font-black tracking-tight">
						{t.title}
					</h1>

					<p className="mt-3 text-zinc-400">{t.description}</p>
				</div>

				<form className="space-y-5 rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8">
					<div>
						<label htmlFor="email" className="mb-2 block text-sm font-bold">
							{t.email}
						</label>

						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.emailPlaceholder}
						/>
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between gap-3">
							<label htmlFor="password" className="block text-sm font-bold">
								{t.password}
							</label>

							<a
								href="#"
								className="text-xs font-bold text-orange-400 hover:text-orange-300"
							>
								{t.forgotPassword}
							</a>
						</div>

						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.passwordPlaceholder}
						/>
					</div>

					<label className="flex items-center gap-3 text-sm text-zinc-400">
						<input
							name="remember"
							type="checkbox"
							className="size-4 accent-orange-400"
						/>

						<span>{t.remember}</span>
					</label>

					<button
						type="submit"
						className="w-full rounded-xl bg-orange-400 px-5 py-3.5 font-bold text-black transition hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
					>
						{t.login}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-zinc-400">
					{t.noAccount}{" "}
					<Link
						href="/register"
						className="font-bold text-orange-400 hover:text-orange-300"
					>
						{t.register}
					</Link>
				</p>
			</section>

			{/* Language switcher */}
			<div className="fixed bottom-5 right-5 flex items-center gap-1 rounded-full bg-zinc-900 p-1 shadow-lg ring-1 ring-white/10">
				<button
					type="button"
					onClick={() => setLanguage("nl")}
					className={`rounded-full px-3 py-2 text-sm font-bold transition ${
						language === "nl"
							? "bg-orange-400 text-black"
							: "text-zinc-400 hover:text-white"
					}`}
				>
					🇳🇱 NL
				</button>

				<button
					type="button"
					onClick={() => setLanguage("en")}
					className={`rounded-full px-3 py-2 text-sm font-bold transition ${
						language === "en"
							? "bg-orange-400 text-black"
							: "text-zinc-400 hover:text-white"
					}`}
				>
					🇬🇧 EN
				</button>
			</div>
		</main>
	);
}
