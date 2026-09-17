"use client";

import { useState, useEffect, useRef } from "react";
import { TimerDisplay } from "../components/TimerDisplay";
import { TimerControls } from "../components/TimerControls";
import { FocusAlert } from "../components/FocusAlert";
import { QuoteCard } from "../components/QuoteCard";
import { SessionCounter } from "../components/SessionCounter";
import { TimerSettings } from "@/components/TimerSettings";
import Link from "next/link";

const DEFAULT_QUOTES = [
  "Держи фокус. Большие цели строятся из 5-минутных отрезков.",
  "Внимание — это твоя главная валюта прямо сейчас.",
  "Не отвлекайся. Ты уже делаешь прогресс.",
  "Сконцентрируйся на одном действии.",
];

export default function Home() {
  const [showsSetting, setShowsSetting] = useState(false);
  const [formtime, setFormTime] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const [activeSound, setActiveSound] = useState("/notification.mp3");

  const [quotes, setQuotes] = useState<string[]>(DEFAULT_QUOTES);
  const [quote, setQuote] = useState(DEFAULT_QUOTES[0]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedCount = localStorage.getItem("focus_intervals");
    if (savedCount) setSessionCount(Number(savedCount));

    const savedQuotes = localStorage.getItem("user_quotes");
    if (savedQuotes) {
      try {
        const parsed = JSON.parse(savedQuotes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuotes(parsed);
          setQuote(parsed[Math.floor(Math.random() * parsed.length)]);
        }
      } catch (err) {
        console.error("Ошибка парсинга цитат:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleIntervalComplete();
            return formtime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, formtime, quotes]);

  const handleIntervalComplete = () => {
    setShowAlert(true);
    try {
      const audio = new Audio(activeSound);
      audio.volume = 0.3; // Уровень громкости: 30% от максимума (попробуй от 0.1 до 0.4)
      audio.play().catch(() => {});
    } catch {}

    setSessionCount((prev) => {
      const updated = prev + 1;
      localStorage.setItem("focus_intervals", String(updated));
      return updated;
    });
  };

  const handleToggle = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(formtime);
    setShowAlert(false);
  };

  const handleFormData = (time: number, sound: string) => {
    // const timeInSeconds = 20;
    const timeInSeconds = time * 60;
    setActiveSound(sound);
    setFormTime(timeInSeconds);
    setSecondsLeft(timeInSeconds);
    setShowsSetting(false);
  };

  const handleToForm = () => {
    setIsRunning(false);
    setShowAlert(false);
    setShowsSetting((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {showsSetting ? (
        <TimerSettings onAdd={handleFormData} />
      ) : (
        <div className="flex flex-col relative items-center gap-8 w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <button
            type="button"
            onClick={handleToForm}
            className="absolute left-4 top-4 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            ← Настройки
          </button>

          <Link
            href="/quotes"
            className="absolute right-4 top-4 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Перейти в цитаты →
          </Link>

          <header className="text-center mt-2">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Focus Timer
            </h1>
            <p className="text-slate-400 text-sm mt-1">В фокусе</p>
          </header>

          {/* <FocusAlert
            isOpen={showAlert}
            onConfirm={() => setShowAlert(false)}
          /> */}
          <QuoteCard quote={quote} />
          <TimerDisplay secondsLeft={secondsLeft} />
          <TimerControls
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
          />
          {/* <SessionCounter count={sessionCount} /> */}
        </div>
      )}
    </main>
  );
}
