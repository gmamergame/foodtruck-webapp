"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  points: number;
  created_at: string;
};

const content = {
  nl: {
    brand: "FOODTRUCK",
    tagline: "Jouw account.",
    title: "Account",
    welcome: "Welkom terug",
    points: "Punten",
    email: "E-mailadres",
    memberSince: "Lid sinds",

    menu: "Menu",
    drops: "Drops",
    transactions: "Transacties",
    account: "Account",

    navigation: "Navigatie",

    logout: "Uitloggen",
    loggingOut: "Uitloggen...",
    back: "Terug",

    login: "Inloggen",
    notLoggedIn: "Je bent niet ingelogd.",
    loadError: "Je account kon niet worden geladen.",
  },

  en: {
    brand: "FOODTRUCK",
    tagline: "Your account.",
    title: "Account",
    welcome: "Welcome back",
    points: "Points",
    email: "Email address",
    memberSince: "Member since",

    menu: "Menu",
    drops: "Drops",
    transactions: "Transactions",
    account: "Account",

    navigation: "Navigation",

    logout: "Log out",
    loggingOut: "Logging out...",
    back: "Back",

    login: "Log in",
    notLoggedIn: "You are not logged in.",
    loadError: "Your account could not be loaded.",
  },
};

export default function AccountPage() {
  const [language, setLanguage] = useState<"nl" | "en">("nl");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const t = content[language];

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            response.status === 401
              ? t.notLoggedIn
              : t.loadError
          );

          return;
        }

        setUser(data.user);
      } catch {
        setError(t.loadError);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [t.notLoggedIn, t.loadError]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        window.location.href = "/login";
      }
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        {/* Brand */}
        <Link
          href="/account"
          className="text-xl font-black tracking-tight"
        >
          {t.brand}
          <span className="text-orange-400">.</span>
        </Link>

        {/* Navigation */}
        <div
          ref={menuRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-bold text-zinc-200 ring-1 ring-white/10 transition hover:bg-zinc-800"
          >
            <span>☰</span>
            <span>{t.navigation}</span>

            <span
              className={`transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl bg-zinc-900 p-2 shadow-2xl ring-1 ring-white/10">
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-orange-400 px-4 py-3 text-sm font-bold text-black"
              >
                <span>👤</span>
                <span>{t.account}</span>
              </Link>

              <Link
                href="/menu"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <span>👕</span>
                <span>{t.menu}</span>
              </Link>

              <Link
                href="/drops"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <span>📦</span>
                <span>{t.drops}</span>
              </Link>

              <Link
                href="/points"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <span>⭐</span>
                <span>{t.points}</span>
              </Link>

              <Link
                href="/transactions"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <span>🧾</span>
                <span>{t.transactions}</span>
              </Link>

              <div className="my-2 border-t border-white/10" />

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>🚪</span>
                <span>
                  {loggingOut
                    ? t.loggingOut
                    : t.logout}
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="mx-auto mt-16 w-full max-w-5xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
            {t.tagline}
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            {t.title}
          </h1>
        </div>

        {loading && (
          <div className="rounded-3xl bg-zinc-900 p-8 text-zinc-400 ring-1 ring-white/10">
            Loading...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl bg-zinc-900 p-8 ring-1 ring-white/10">
            <p className="text-red-400">
              {error}
            </p>

            {error === t.notLoggedIn && (
              <Link
                href="/login"
                className="mt-5 inline-block rounded-xl bg-orange-400 px-5 py-3 font-bold text-black transition hover:bg-orange-300"
              >
                {t.login}
              </Link>
            )}
          </div>
        )}

        {user && !loading && !error && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-zinc-900 p-7 ring-1 ring-white/10 md:col-span-2">
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                {t.welcome}
              </p>

              <h2 className="mt-2 text-4xl font-black">
                {user.name}
              </h2>

              <div className="mt-8">
                <p className="text-sm font-bold text-zinc-500">
                  {t.email}
                </p>

                <p className="mt-1 text-lg text-zinc-200">
                  {user.email}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-bold text-zinc-500">
                  {t.memberSince}
                </p>

                <p className="mt-1 text-zinc-200">
                  {new Date(
                    user.created_at
                  ).toLocaleDateString(
                    language === "nl"
                      ? "nl-NL"
                      : "en-US"
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-orange-400 p-7 text-black">
              <p className="text-sm font-black uppercase tracking-widest opacity-70">
                {t.points}
              </p>

              <p className="mt-4 text-6xl font-black">
                {user.points}
              </p>

              <p className="mt-2 font-bold opacity-70">
                {t.points}
              </p>
            </div>
          </div>
        )}
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