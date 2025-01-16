import { ChevronRightIcon } from "lucide-react";

type MenuOptionProps = {
  icon: React.ReactNode;
  label: string;
  defaultValue?: string;
};

export default function MenuOption({
  icon,
  label,
  defaultValue,
}: MenuOptionProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-text-300 text-base font-medium leading-6">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {defaultValue && (
          <span className="text-text-300 text-sm font-normal leading-5">
            {defaultValue}
          </span>
        )}
        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>
    </div>
  );
}
