import { RefreshCwIcon } from "lucide-react";
import {
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
  TooltipContent,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

type RefreshButtonProps = {
  label?: React.ReactNode;
  content: string;
  onClick: () => void;
  loading?: boolean
};

export default function RefreshButton({
  label,
  content,
  onClick,
  loading,
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
            <RefreshCwIcon className={cn("h-4 w-4 stroke-2", {
              "animate-spin": loading
            })} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
