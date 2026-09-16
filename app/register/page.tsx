"use client";

import Link from "next/link";
import { useState } from "react";

const content = {
	nl: {
		tagline: "Vers eten, verse drops.",
		title: "Account aanmaken",
		description: "Maak een account en mis geen enkele foodtruck-drop.",
		name: "Naam",
		namePlaceholder: "Je naam",
		email: "E-mailadres",
		emailPlaceholder: "jij@voorbeeld.nl",
		password: "Wachtwoord",
		passwordPlaceholder: "Minimaal 8 tekens",
		confirmPassword: "Wachtwoord bevestigen",
		confirmPasswordPlaceholder: "Herhaal je wachtwoord",
		terms: "Ik ga akkoord met de algemene voorwaarden en het privacybeleid.",
		createAccount: "Account aanmaken",
		alreadyAccount: "Heb je al een account?",
		login: "Inloggen",
        back: "Terug",
	},
	en: {
		tagline: "Fresh food, fresh drops.",
		title: "Create an account",
		description: "Create an account and never miss a foodtruck drop.",
		name: "Name",
		namePlaceholder: "Your name",
		email: "Email address",
		emailPlaceholder: "you@example.com",
		password: "Password",
		passwordPlaceholder: "At least 8 characters",
		confirmPassword: "Confirm password",
		confirmPasswordPlaceholder: "Repeat your password",
		terms: "I agree to the terms and conditions and privacy policy.",
		createAccount: "Create account",
		alreadyAccount: "Already have an account?",
		login: "Log in",
        back: "Back",
	},
};

export default function RegisterPage() {
	const [language, setLanguage] = useState<"nl" | "en">("nl");
	const t = content[language];

	return (
		<main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 py-10 text-white">
			<section className="w-full max-w-md">
				<div className="mb-8 text-center">
					<Link href="/" className="fixed left-5 top-5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-300 ring-1 ring-white/10 transition hover:bg-zinc-800 hover:text-white">
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

					<p className="mt-3 text-zinc-400">
						{t.description}
					</p>
				</div>

				<form className="space-y-5 rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8">
					<div>
						<label htmlFor="name" className="mb-2 block text-sm font-bold">
							{t.name}
						</label>

						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							required
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.namePlaceholder}
						/>
					</div>

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
						<label htmlFor="password" className="mb-2 block text-sm font-bold">
							{t.password}
						</label>

						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.passwordPlaceholder}
						/>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="mb-2 block text-sm font-bold"
						>
							{t.confirmPassword}
						</label>

						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.confirmPasswordPlaceholder}
						/>
					</div>

					<label className="flex items-start gap-3 text-sm text-zinc-400">
						<input
							name="terms"
							type="checkbox"
							required
							className="mt-0.5 size-4 accent-orange-400"
						/>

						<span>{t.terms}</span>
					</label>

					<button
						type="submit"
						className="w-full rounded-xl bg-orange-400 px-5 py-3.5 font-bold text-black transition hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
					>
						{t.createAccount}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-zinc-400">
					{t.alreadyAccount}{" "}
					<Link
						href="/login"
						className="font-bold text-orange-400 hover:text-orange-300"
					>
						{t.login}
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
