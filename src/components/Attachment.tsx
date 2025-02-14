import { Link } from "react-router-dom";
import { CircleCheckIcon } from "lucide-react";
import { truncateFileName } from "@/utils";

export function Attachment({
  name,
  url,
  size,
}: {
  name: string;
  url: string;
  size?: number;
}) {
  return (
    <Link to={url} target="_blank" download>
      <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
        <div className="flex gap-1 items-center">
          <span className="max-w-32 text-text-300 text-sm font-medium leading-5 truncate">
            {truncateFileName(name)}
          </span>
          {size && (
            <span className="text-text-200 text-xs font-normal leading-normal">
              {size} KB
            </span>
          )}
          <CircleCheckIcon className="text-signal-success h-4 w-4 stroke-1" />
        </div>
      </div>
    </Link>
  );
}
