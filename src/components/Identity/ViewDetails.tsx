import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon, CopyIcon } from "lucide-react";

import IdentityAvatar from "@/components/IdentityAvatar";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/utils";
import { truncateString } from "@/utils/strings";
import type { Identity } from "@/types/identity";
import { Link } from "react-router-dom";
import routes from "@/constants/routes";
import { cn } from "@/lib/utils";

type DetailsProps = {
  type: "personal" | "company" | null;
  showLink?: boolean;
  avatar?: string;
} & Pick<Identity, "name" | "bitcoin_public_key">;

export default function ViewDetails({
  type,
  name,
  bitcoin_public_key,
  showLink = true,
  avatar,
}: DetailsProps) {
  const { formatMessage: f } = useIntl();
  const { toast } = useToast();
  const truncatedBitcoinPublicKey = truncateString(bitcoin_public_key, 13);
  const viewIdentityRoute =
    type === "company" ? routes.VIEW_COMPANY : routes.VIEW_IDENTITY;

  return (
    <div className="flex items-center gap-3">
      <IdentityAvatar
        name={name}
        picture={avatar || ""}
        identityType={type}
        size="lg"
      />

      <div className="flex flex-col items-start gap-1.5">
        <span className="text-text-300 text-center text-base font-medium leading-6">
          {name}
        </span>

        <button
          className="flex items-center gap-1 text-text-200 text-xs leading-3"
          onClick={() => {
            void copyToClipboard(bitcoin_public_key, () => {
              toast({
                title: f({
                  id: "identity.details.copied",
                  defaultMessage: "Copied!",
                }),
                description: f({
                  id: "identity.details.copied.description",
                  defaultMessage: "Node ID copied to clipboard",
                }),
                position: "bottom-center",
                duration: 750,
              });
            });
          }}
        >
          {truncatedBitcoinPublicKey}

          <CopyIcon className="h-4 w-4 stroke-1" />
        </button>
      </div>

      <Link
        to={viewIdentityRoute}
        className={cn("ml-auto", {
          hidden: !showLink,
        })}
      >
        <button className="flex items-center gap-2">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage id="identity.view" defaultMessage="View" />
          </span>

          <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
        </button>
      </Link>
    </div>
  );
}
