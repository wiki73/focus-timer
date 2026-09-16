import { useState, type FormEvent } from "react";
import { LabeledInput } from "./ui/LabeledInput";

interface TimerSettingsProps {
  onAdd: (time: number) => void;
}

export function TimerSettings({ onAdd }: TimerSettingsProps) {
  const [time, setTime] = useState(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (time > 0) {
      onAdd(time);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-8 gap-5 text-white border border-slate-700 bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl"
    >
      <header className="text-center">
        <h2 className="font-bold text-2xl">Учись эффективно</h2>
        <p className="text-slate-400 text-sm mt-1">Задай время и приступай</p>
      </header>

      <LabeledInput
        label="Длительность фокуса (минут)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.valueAsNumber || 0)}
        min="1"
      />

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition active:scale-95 mt-2"
      >
        Начать
      </button>
    </form>
  );
}
