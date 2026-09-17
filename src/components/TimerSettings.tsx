import { useState, type FormEvent } from "react";
import { LabeledInput } from "./ui/LabeledInput";

interface TimerSettingsProps {
  onAdd: (time: number, sound: string) => void;
}

const SOUND_OPTIONS = [
  { label: "Звук 1", value: "/notification.mp3" },
  { label: "Звук 2", value: "/notification2.mp3" },
  { label: "Звук 3", value: "/notification3.mp3" },
  { label: "Звук 4", value: "/notification4.mp3" },
  { label: "Звук 5", value: "/notification5.mp3" },
  { label: "Звук 6", value: "/notification6.mp3" },
];

export function TimerSettings({ onAdd }: TimerSettingsProps) {
  const [time, setTime] = useState(5);

  const [selectedSound, setSelectedSound] = useState(SOUND_OPTIONS[0].value);
  const handlePreview = () => {
    try {
      const audio = new Audio(selectedSound);
      audio.volume = 0.3; // Комфортная громкость
      audio.play().catch(() => {});
    } catch (err) {
      console.error("Ошибка воспроизведения:", err);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (time > 0) {
      onAdd(time, selectedSound);
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
        onChange={(e) =>
          setTime((e.target as HTMLInputElement).valueAsNumber || 0)
        }
        min="1"
      />
      <div>
        <label className="text-xs text-slate-400 font-medium">
          Звук уведомления
        </label>
        <div className="flex gap-2 items-center">
          <select
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-500 transition"
            value={selectedSound}
            onChange={(e) => setSelectedSound(e.target.value)}
          >
            {SOUND_OPTIONS.map((sound) => (
              <option key={sound.value} value={sound.value}>
                {sound.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handlePreview}
            className="bg-slate-800 hover:bg-slate-700 text-sky-400 px-4 py-2 rounded-xl transition active:scale-95"
            title="Послушать звук"
          >
            ▶
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition active:scale-95 mt-2"
      >
        Начать
      </button>
    </form>
  );
}
