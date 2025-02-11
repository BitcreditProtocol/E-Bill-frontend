import { RefreshCwIcon } from "lucide-react";
import {
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
  TooltipContent,
} from "./ui/tooltip";

type RefreshButtonProps = {
  label?: React.ReactNode;
  content: string;
  onClick: () => void;
};

export default function RefreshButton({
  label,
  content,
  onClick,
}: RefreshButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            className="flex items-center gap-1 p-0 text-brand-200 text-xs font-normal"
            onClick={onClick}
          >
            {label}
            <RefreshCwIcon className="h-4 w-4 stroke-2" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
