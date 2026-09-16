import { FormEvent, useState } from "react";
import { LabeledInput } from "./ui/LabeledInput";

interface TimerSettingsProps {
  // timeinterval: number;
  onAdd: (time: number) => void;
}

export function TimerSettings({ onAdd }: TimerSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAdd(time);
    setTime(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-8  gap-3.5 text-white border-2 border-slate-600 rounded-2xl"
    >
      <header>
        <h2 className="font-bold text-2xl">Учись эффективно</h2>
        <p className="text-slate-600 text-sm">
          Заполни форму и приступай к работе
        </p>
      </header>
      <div className="p-2 border-2 flex flex-row gap-1.5 rounded-2xl">
        <label className="p-2 font-bold">Таймре</label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.valueAsNumber)}
          className="border-1 rounded-2xl p-2"
          type="number"
          placeholder="минут..."
        />
      </div>
    

      <button type="submit" disabled={isLoading}>
        Начать
      </button>
    </form>
  );
}
