interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  onToggle,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onToggle}
        className={`px-6 py-2 rounded-xl font-semibold text-sm transition active:scale-95 ${
          isRunning
            ? "bg-amber-600 hover:bg-amber-500 text-white"
            : "bg-sky-600 hover:bg-sky-500 text-white"
        }`}
      >
        {isRunning ? "Пауза" : "Фокус"}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm transition active:scale-95"
      >
        Сброс
      </button>
    </div>
  );
}