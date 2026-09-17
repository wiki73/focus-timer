"use client"; // Обязательно, так как мы используем хуки

import { useState, useEffect } from "react";
import Link from "next/link";
import { LabeledInput } from "@/components/ui/LabeledInput";

// Наши базовые цитаты
const DEFAULT_QUOTES = [
  "Держи фокус. Большие цели строятся из 5-минутных отрезков.",
  "Внимание — это твоя главная валюта прямо сейчас.",
  "Не отвлекайся. Ты уже делаешь прогресс.",
  "Сконцентрируйся на одном действии.",
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isOpenForm, setOpenForm] = useState(false);
  const [textQuote, setTextQuote] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("user_quotes");

    if (saved) {
      setQuotes(JSON.parse(saved));
    } else {
      localStorage.setItem("user_quotes", JSON.stringify(DEFAULT_QUOTES));
      setQuotes(DEFAULT_QUOTES);
    }
  }, []);

  const handleDeleteQoutes = (indexRemove: number) => {
    setQuotes((prev) => {
      const updated = prev.filter((_, index) => index !== indexRemove);

      localStorage.setItem("user_quotes", JSON.stringify(updated));

      return updated;
    });
  };

  const handleAddQuote = () => {
    if (!textQuote.trim()) return;

    setQuotes((prev) => {
      const updated = [...quotes, textQuote];
      localStorage.setItem("user_quotes", JSON.stringify(updated));
      return updated;
    });
    setTextQuote("");
    setOpenForm(false);
  };
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4 text-white">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
        <header className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold">Мои цитаты</h1>

          <Link
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition"
          >
            ← Назад к таймеру
          </Link>
        </header>

        <ul className="flex flex-col gap-3">
          {quotes.length === 0 ? (
            <li className="text-center text-slate-500 py-4">Нет цитат</li>
          ) : (
            quotes.map((quote, index) => (
              <li
                key={index}
                className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl flex justify-between  text-slate-300 italic text-sm"
              >
                «{quote}»
                <button
                  type="button"
                  onClick={() => handleDeleteQoutes(index)}
                  className="text-red-400 hover:text-red-500 text-xl transform hover:scale-135"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
        <button
          type="button"
          onClick={() => setOpenForm((prev) => (prev = !prev))}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition active:scale-95 mt-2"
        >
          + добавить цитату
        </button>
        {isOpenForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-3xl text-white">
              <LabeledInput
                label="Цитата:"
                placeholder="введите текст"
                type="text"
                value={textQuote}
                onChange={(e) =>
                  setTextQuote((e.target as HTMLInputElement).value)
                }
                min="1"
              />
              <button
                type="button"
                onClick={handleAddQuote}
                className="bg-sky-600 hover:bg-sky-500 text-white w-full font-bold py-3 rounded-xl transition active:scale-95 mt-2"
              >
                Добавить
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
