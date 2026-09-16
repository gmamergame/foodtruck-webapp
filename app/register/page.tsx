"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

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
		passwordMismatch: "De wachtwoorden komen niet overeen.",
		networkError: "Kan geen verbinding maken met de server.",
		registrationFailed: "Registreren mislukt.",
		creating: "Account aanmaken...",
		success: "Account succesvol aangemaakt!",
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
		passwordMismatch: "The passwords do not match.",
		networkError: "Could not connect to the server.",
		registrationFailed: "Registration failed.",
		creating: "Creating account...",
		success: "Account created successfully!",
	},
};

export default function RegisterPage() {
	const [language, setLanguage] = useState<"nl" | "en">("nl");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const t = content[language];

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");
		setSuccess("");

		if (password !== confirmPassword) {
			setError(t.passwordMismatch);
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(
				"http://localhost:4000/api/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || t.registrationFailed);
				return;
			}

			setSuccess(t.success);

			setTimeout(() => {
				window.location.href = "/login";
			}, 1000);
		} catch {
			setError(t.networkError);
		} finally {
			setLoading(false);
		}
	}

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

					<p className="mt-3 text-zinc-400">
						{t.description}
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-5 rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8"
				>
					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-sm font-bold"
						>
							{t.name}
						</label>

						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							required
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.namePlaceholder}
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="mb-2 block text-sm font-bold"
						>
							{t.email}
						</label>

						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.emailPlaceholder}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-2 block text-sm font-bold"
						>
							{t.password}
						</label>

						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
							value={password}
							onChange={(event) => setPassword(event.target.value)}
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
							value={confirmPassword}
							onChange={(event) =>
								setConfirmPassword(event.target.value)
							}
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

					{error && (
						<p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
							{error}
						</p>
					)}

					{success && (
						<p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
							{success}
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-xl bg-orange-400 px-5 py-3.5 font-bold text-black transition hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? t.creating : t.createAccount}
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