import { Label, Value } from "./Typography";

export default function Property({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode | string | null | undefined;
}) {
  const shouldDisplayPlaceholder =
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "");

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {shouldDisplayPlaceholder ? <span>-</span> : <Value>{value}</Value>}
    </div>
  );
}
