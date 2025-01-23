import { CopyIcon } from "lucide-react";
import IdentityAvatar from "@/components/IdentityAvatar";
import { truncateString } from "@/utils/strings";
import type { Contact } from "@/types/contact";

type DetailsProps = {
  type: "personal" | "company";
  name: Contact["name"];
  nodeId: Contact["node_id"];
  avatar?: Contact["avatar"];
};

export default function Details({ type, name, nodeId, avatar }: DetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        name={name}
        picture={avatar || ""}
        identityType={type}
        size="lg"
      />

      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-[30px]">
          {name}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {truncateString(nodeId, 12)}
          </span>

          <button className="flex items-center justify-center">
            <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
