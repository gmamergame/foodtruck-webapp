"use client";

import { useState } from "react";

const content = {
  nl: {
    login: "Inloggen",
    tagline: "Verse drops. Vers eten.",
    title: "Elke keer ergens anders.",
    description:
      "Ontdek onze nieuwste foodtruck-drops, unieke menu's en verdien punten elke keer dat je eet.",
    createAccount: "Account aanmaken →",
    lastDrop: "Laatste drop",
    completed: "Voltooid",
    menu: "Menu",
    footer: "Jouw foodtruck · Vers eten, verse drops.",
  },
  en: {
    login: "Log in",
    tagline: "Fresh drops. Fresh food.",
    title: "Every time somewhere else.",
    description:
      "Discover our latest foodtruck drops, unique menus, and earn points every time you eat.",
    createAccount: "Create an account →",
    lastDrop: "Last drop",
    completed: "Completed",
    menu: "Menu",
    footer: "Your foodtruck · Fresh food, fresh drops.",
  },
};

const lastDrop = {
  location: "Rotterdam",
  date: {
    nl: "Laatste drop",
    en: "Last drop",
  },
  menu: [
    { name: "Classic Burger", price: 8.00 },
    { name: "Loaded Fries", price: 6.00 },
    { name: "Cola", price: 2.00 },
  ],
};

export default function Home() {
  const [language, setLanguage] = useState<"nl" | "en">("nl");
  const t = content[language];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="text-xl font-black tracking-tight">
          FOODTRUCK<span className="text-orange-400">.</span>
        </div>

        <a
          href="/login"
          className="rounded-full bg-orange-400 px-5 py-2.5 text-sm font-bold text-black"
        >
          {t.login}
        </a>
      </nav>

      <section className="mx-auto max-w-5xl px-5 pb-12 pt-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">
          {t.tagline}
        </p>

        <h1 className="max-w-xl text-5xl font-black tracking-tight sm:text-7xl">
          {t.title}
        </h1>

        <p className="mt-5 max-w-md text-lg text-zinc-400">
          {t.description}
        </p>

        <a
          href="/register"
          className="mt-8 inline-block rounded-full bg-orange-400 px-7 py-4 font-bold text-black"
        >
          {t.createAccount}
        </a>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-400">
                {lastDrop.date[language]}
              </p>

              <h2 className="mt-1 text-2xl font-black">
                {t.lastDrop}
              </h2>
            </div>

            <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-400">
              {t.completed}
            </span>
          </div>

          <div className="mb-6 flex items-center gap-2 text-zinc-300">
            <span>📍</span>
            <span>{lastDrop.location}</span>
          </div>

          <h3 className="mb-4 text-lg font-bold">
            {t.menu}
          </h3>

          <div className="space-y-3">
            {lastDrop.menu.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
              >
                <span className="font-medium">{item.name}</span>

                <span className="font-bold text-orange-400">
                  €{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-zinc-500">
        {t.footer}
      </footer>

      {/* Language switcher */}
      <div className="fixed bottom-5 right-5 flex items-center gap-1 rounded-full bg-zinc-900 p-1 shadow-lg ring-1 ring-white/10">
        <button
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
