import { CalendarIcon } from "lucide-react";
import Label from "@/components/typography/Label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import IdentityAvatar from "@/components/IdentityAvatar";

type HolderProps = {
  name: string;
  terms: string;
  checked: boolean;
  onClick: () => void;
};

export default function Holder({ name, terms, checked, onClick }: HolderProps) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <IdentityAvatar name={name} picture="" identityType="company" />

        <div className="flex flex-col gap-1">
          <Label>{name}</Label>

          <div className="flex items-center gap-1">
            <CalendarIcon className="text-text-200 h-4 w-4 stroke-1" />

            <span className="text-text-200 text-xs font-normal leading-normal">
              {terms}
            </span>
          </div>
        </div>
      </div>

      <RadioGroupItem value={name} checked={checked} />
    </div>
  );
}
