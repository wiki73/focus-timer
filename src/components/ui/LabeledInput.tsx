import { ChangeEvent } from "react";

interface LabeledInputProps {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent) => void;
  type?: "text" | "number";
  placeholder?: string;
  min?: string;
}

export function LabeledInput({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder,
  min
}: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
      <label className="text-xs font-semibold text-slate-400">
        {label}
      </label>
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-sky-500 transition placeholder-slate-600"
      />
    </div>
  );
}