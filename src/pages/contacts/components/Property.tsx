import { Label, Value } from "./Typography";

export default function Property({
  label,
  value,
}: {
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Value>{value.length === 0 ? "-" : value}</Value>
    </div>
  );
}
