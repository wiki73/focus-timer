interface TimerDisplayProps {
  secondsLeft: number;
}

export function TimerDisplay({ secondsLeft }: TimerDisplayProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="text-6xl font-mono font-bold tracking-wider text-sky-400 select-none">
      {formattedTime}
    </div>
  );
}