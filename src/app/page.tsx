"use client";

import { useState, useEffect, useRef } from "react";
import { TimerDisplay } from "../components/TimerDisplay";
import { TimerControls } from "../components/TimerControls";
import { FocusAlert } from "../components/FocusAlert";
import { QuoteCard } from "../components/QuoteCard";
import { SessionCounter } from "../components/SessionCounter";
import { TimerSettings } from "@/components/TimerSettings";

const QUOTES = [
  "Держи фокус. Большие цели строятся из 5-минутных отрезков.",
  "Внимание — это твоя главная валюта прямо сейчас.",
  "Не отвлекайся. Ты уже делаешь прогресс.",
  "Сконцентрируйся на одном действии.",
];

export default function Home() {
  const [showsSetting, setShowsSetting] = useState(true);
  const [formtime, setFormTime] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(formtime);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [quote, setQuote] = useState(QUOTES[0]);

  const timerRef = useRef(null);

  useEffect(() => {
    const savedCount = localStorage.getItem("focus_intervals");
    if (savedCount) {
      setSessionCount(Number(savedCount));
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleIntervalComplete = () => {
    setShowAlert(true);

    try {
      new Audio("/notification.mp3").play().catch(() => {});
    } catch {}

    const nextQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(nextQuote);

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

  const handleFormData = (time: number) => {
    console.log("Родитель получил данные:", time);
    setFormTime(time * 60);
    setSecondsLeft(time * 60);
    setShowsSetting(false);
  };

  const handleToForm = () => {
    setIsRunning(false);
    setSecondsLeft(formtime);
    setShowAlert(false);
    setShowsSetting((p) => (p = !p));
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
            className="border-2 rounded-2xl border-slate-900 text-slate-300 hover:border-slate-700 bg-slate-800  m-0.5  absolute left-1 top-0.5 p-2 "
          >
            форма
          </button>

          <header className="text-center ">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Focus Timer
            </h1>
            <p className="text-slate-400 text-sm mt-1">Интервалы по 5 минут</p>
          </header>

          <FocusAlert
            isOpen={showAlert}
            onConfirm={() => setShowAlert(false)}
          />

          <QuoteCard quote={quote} />

          <TimerDisplay secondsLeft={secondsLeft} />

          <TimerControls
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
          />

          <SessionCounter count={sessionCount} />
        </div>
      )}
    </main>
  );
}
