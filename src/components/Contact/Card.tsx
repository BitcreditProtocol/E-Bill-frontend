import { ChevronRightIcon } from "lucide-react";
import Picture from "@/components/Picture";
import type { Contact } from "@/types/contact";

type ContactCardProps = Pick<Contact, "type" | "name" | "address"> & {
  onClick: () => void;
};

export function Card({ type, name, address, onClick }: ContactCardProps) {
  return (
    // todo: fix endpoint
    <div
      className="flex items-center gap-3 py-4 px-3 w-full border-[1px] border-divider-75 rounded-xl cursor-pointer select-none"
      onClick={onClick}
    >
      <Picture type={type} name={name} image="" />

      <div className="flex items-center gap-3 mr-auto">
        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">{name}</span>
          <span className="text-text-200 text-xs">{address}</span>
        </div>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-brand-200" strokeWidth={1} />
    </div>
  );
}
