import { ChevronDownIcon } from "lucide-react";

type CurrencySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <button
      className="flex items-center text-text-300"
      onChange={() => {
        onChange(value);
      }}
    >
      <span className="text-xs font-medium leading-[18px]">{value}</span>
      <ChevronDownIcon className="h-4 w-4" strokeWidth={1} />
    </button>
  );
}
