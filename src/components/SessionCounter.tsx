interface SessionCounterProps {
  count: number;
}

export function SessionCounter({ count }: SessionCounterProps) {
  return (
    <div className="text-xs text-slate-500 border-t border-slate-800 pt-4 w-full text-center">
      Закрыто 5-минуток фокуса:{" "}
      <strong className="text-white font-mono text-sm">{count}</strong>
    </div>
  );
}
