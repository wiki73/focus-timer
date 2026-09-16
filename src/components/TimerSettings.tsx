import { LabeledInput } from "./ui/LabeledInput";

interface TimerSettingsProps {
  timeinterval: number;
}

export function TimerSettings({ timeinterval }: TimerSettingsProps) {
  return (
    <form className="flex flex-row p-4  gap-1.5 text-white border-2 border-slate-600 rounded-2xl">
      <div className="p-2 border-2 flex flex-row gap-1.5 rounded-2xl">
        <label>Таймре</label>
        <input
          className="border-1 rounded-2xl p-2"
          type="number"
          placeholder="минут..."
        />
      </div>
    </form>
  );
}
