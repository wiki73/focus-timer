interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <p className="text-sm text-slate-400 text-center italic min-h-[40px] flex items-center justify-center">
      «{quote}»
    </p>
  );
}