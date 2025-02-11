import { Label, Value } from "./Typography";

export default function Property({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Value>
        {typeof value === "string" ? (value.length > 0 ? value : "-") : value}
      </Value>
    </div>
  );
}
