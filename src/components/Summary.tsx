import { cn } from "@/lib/utils";
import { truncateAvatarName, truncateString } from "@/utils/strings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CopyToClipboardButton from "./CopyToClipboardButton";

type SummaryProps = {
  identityType: number;
  name: string;
  nodeId: string;
  picture: string;
};

export default function Summary({
  identityType,
  name,
  nodeId,
  picture,
}: SummaryProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar
        className={cn("items-center justify-center h-16 w-16 rounded-full", {
          "!rounded-lg": identityType !== 0,
        })}
      >
        <AvatarImage src={picture} alt={name} />
        <AvatarFallback
          className={cn(
            "flex flex-col items-center justify-center py-4 h-16 w-16 bg-brand-50 text-brand-200 text-2xl font-medium leading-8 rounded-full",
            {
              "rounded-lg": identityType !== 0,
            }
          )}
        >
          {truncateAvatarName(name)}
        </AvatarFallback>
      </Avatar>

      <span className="text-text-300 text-xl font-medium leading-[30px]">
        {name}
      </span>

      <div className="flex items-center gap-1">
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {truncateString(nodeId, 12)}
        </span>

        <CopyToClipboardButton value={nodeId} />
      </div>
    </div>
  );
}
