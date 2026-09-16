"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

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
		loggingIn: "Inloggen...",
		noAccount: "Nog geen account?",
		register: "Account aanmaken",
		back: "Terug",
		loginFailed: "Inloggen mislukt.",
		networkError: "Kan geen verbinding maken met de server.",
		success: "Succesvol ingelogd!",
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
		loggingIn: "Logging in...",
		noAccount: "Don't have an account yet?",
		register: "Create an account",
		back: "Back",
		loginFailed: "Login failed.",
		networkError: "Could not connect to the server.",
		success: "Successfully logged in!",
	},
};

export default function LoginPage() {
	const [language, setLanguage] = useState<"nl" | "en">("nl");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const t = content[language];

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");
		setSuccess("");
		setLoading(true);

		try {
			const response = await fetch(
				"http://localhost:4000/api/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || t.loginFailed);
				return;
			}

			setSuccess(t.success);

			setTimeout(() => {
				window.location.href = "/account";
			}, 500);
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

					<p className="mt-3 text-zinc-400">{t.description}</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-5 rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8"
				>
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
						<div className="mb-2 flex items-center justify-between gap-3">
							<label
								htmlFor="password"
								className="block text-sm font-bold"
							>
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
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
							placeholder={t.passwordPlaceholder}
						/>
					</div>

					<label className="flex items-center gap-3 text-sm text-zinc-400">
						<input
							name="remember"
							type="checkbox"
							checked={remember}
							onChange={(event) =>
								setRemember(event.target.checked)
							}
							className="size-4 accent-orange-400"
						/>

						<span>{t.remember}</span>
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
						{loading ? t.loggingIn : t.login}
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
