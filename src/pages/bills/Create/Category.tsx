import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon, PencilIcon, RefreshCwIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Picture from "@/components/Picture";
import { useIdentity } from "@/context/identity/IdentityContext";
import { useActiveIdentity } from "@/hooks/use-active-identity";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import routes from "@/constants/routes";
import ThreePartiesIcon from "@/assets/icons/three-parties.svg";
import SelfDraftedIcon from "@/assets/icons/self-drafted.svg";
import PromissoryNoteIcon from "@/assets/icons/promissory-note.svg";
import { BILL_TYPE } from "@/types/bill";
import { useEffect } from "react";

function Option({
  icon,
  label,
  description,
  onClick,
  enabled,
}: {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
  enabled: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-2 py-4 px-5 bg-elevation-200 border border-divider-50 rounded-xl cursor-pointer",
          {
            "cursor-not-allowed": !enabled,
          }
        )}
        onClick={() => {
          if (enabled) {
            onClick();
          }
        }}
      >
        <div className="flex items-center justify-center p-1.5 h-9 w-9 bg-elevation-50 border border-divider-50 rounded-full">
          <img src={icon} />
        </div>
        <div className="flex flex-col gap-0.5 mr-auto">
          <span className="text-text-300 text-base font-medium leading-6">
            {label}
          </span>
          <span className="text-text-200 text-sm font-normal leading-normal">
            {description}
          </span>
        </div>
        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>

      {!enabled && (
        <div className="absolute inset-0 bg-elevation-200 opacity-50 rounded-xl pointer-events-none cursor-not-allowed"></div>
      )}
    </div>
  );
}

export default function Category() {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { setValue } = useFormContext();
  const { identityDetails, isLoading } = useActiveIdentity();
  const { activeIdentity } = useIdentity();
  const { toast } = useToast();

  const hasCompleteAddress = identityDetails
    ? [
        identityDetails.city,
        identityDetails.country,
        identityDetails.address,
      ].every(Boolean)
    : false;

  useEffect(() => {
    if (!isLoading && !hasCompleteAddress) {
      toast({
        title: f({
          id: "bill.create.address.incomplete",
          defaultMessage: "Drawer needs a postal address",
          description: "Incomplete address toast title",
        }),
        description: f({
          id: "bill.create.address.incomplete.description",
          defaultMessage: "Switch identity or add postal address",
          description: "Incomplete address toast description",
        }),
        position: "bottom-center",
      });
    }
  }, [isLoading, hasCompleteAddress, toast, f]);

  const address = identityDetails
    ? [identityDetails.address, identityDetails.city, identityDetails.country]
        .filter(Boolean)
        .join(", ")
    : "-";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bill.create.issuer"
              defaultMessage="Issuer"
              description="Issuer label"
            />
          </span>

          <button
            className="flex items-center gap-1 text-brand-200 text-xs font-medium"
            onClick={() => {
              navigate(routes.IDENTITY_LIST);
            }}
          >
            <FormattedMessage
              id="bill.create.identity.switch"
              defaultMessage="Switch identity"
              description="Switch identity button"
            />
            <RefreshCwIcon className="text-brand-200 h-3 w-3 stroke-1" />
          </button>
        </div>
        {isLoading ? (
          <Skeleton className="h-16 w-full bg-elevation-200" />
        ) : (
          <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
            <Picture
              name={activeIdentity.name}
              image={activeIdentity.avatar}
              type={activeIdentity.type === "personal" ? 0 : 1}
              size="sm"
            />
            <div className="flex flex-col mr-auto">
              <span className="text-text-300 text-base font-medium leading-6">
                {identityDetails?.name}
              </span>
              <span className="text-text-200 text-xs font-normal leading-normal">
                {hasCompleteAddress ? (
                  address
                ) : (
                  <span className="text-signal-error">
                    <FormattedMessage
                      id="bill.create.address.missing"
                      defaultMessage="Missing address"
                      description="Incomplete address label"
                    />
                  </span>
                )}
              </span>
            </div>
            <button
              className="p-0"
              onClick={() => {
                if (activeIdentity.type === "personal") {
                  navigate(routes.EDIT_IDENTITY);
                } else {
                  navigate(routes.EDIT_COMPANY);
                }
              }}
            >
              <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-text-300 text-sm font-normal leading-5">
          <FormattedMessage
            id="bill.create.type"
            defaultMessage="Type of bill"
            description="Type of bill label"
          />
        </span>

        <Option
          icon={ThreePartiesIcon}
          label={f({
            id: "bill.create.type.draft",
            defaultMessage: "Draft (three parties)",
            description: "Draft type label",
          })}
          description={f({
            id: "bill.create.type.draft.description",
            defaultMessage: "Drawee pays to payee",
            description: "Draft type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.DRAFT);
          }}
          enabled={!isLoading && hasCompleteAddress}
        />

        <Option
          icon={SelfDraftedIcon}
          label={f({
            id: "bill.create.type.selfDrafted",
            defaultMessage: "Self drafted",
            description: "Self drafted type label",
          })}
          description={f({
            id: "bill.create.type.selfDrafted.description",
            defaultMessage: "Drawee pays to me",
            description: "Self drafted type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.SELF_DRAFTED);
          }}
          enabled={!isLoading && hasCompleteAddress}
        />

        <Option
          icon={PromissoryNoteIcon}
          label={f({
            id: "bill.create.type.promissoryNote",
            defaultMessage: "Promissory note",
            description: "Promissory note type label",
          })}
          description={f({
            id: "bill.create.type.promissoryNote.description",
            defaultMessage: "I pay to payee",
            description: "Promissory note type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.PROMISSORY_NOTE);
          }}
          enabled={!isLoading && hasCompleteAddress}
        />
      </div>
    </div>
  );
}
