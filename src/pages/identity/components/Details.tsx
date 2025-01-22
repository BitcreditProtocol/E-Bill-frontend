import { CopyIcon } from "lucide-react";
import { truncateString } from "@/utils/strings";
import type { Identity } from "@/types/identity";
import IdentityAvatar from "@/components/IdentityAvatar";

type DetailsProps = Pick<Identity, "type" | "name" | "bitcoin_public_key">;

export default function Details({
  type,
  name,
  bitcoin_public_key,
}: DetailsProps) {
  const truncatedBitcoinPublicKey = truncateString(bitcoin_public_key, 13);

  return (
    <div className="flex flex-col items-center gap-2">
      <IdentityAvatar name={name} picture="" identityType={type} size="lg" />

      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-center text-xl font-medium leading-[1.875rem]">
          {name}
        </span>

        <button className="flex items-center gap-1 text-text-200 text-xs leading-[1.125rem]">
          {truncatedBitcoinPublicKey}

          <CopyIcon className="h-4 w-4 stroke-1" />
        </button>
      </div>
    </div>
  );
}
