import { truncateString } from "@/utils/strings";
import { LandmarkIcon } from "lucide-react";

export default function Mint({
  name,
  nodeId,
}: {
  name: string;
  nodeId: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-elevation-200 border border-divider-50 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-50 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">{name}</span>
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {truncateString(nodeId, 24)}
          </span>
        </div>
      </div>
    </div>
  );
}
