import { FormattedMessage, useIntl } from "react-intl";
import { UserPenIcon, BuildingIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";

type OptionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

function Option({ title, description, icon, onClick }: OptionProps) {
  return (
    <button
      className="flex items-center gap-2 py-4 px-5 bg-elevation-200 border-[1px] border-divider-50 rounded-xl"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-9 h-9 p-2 bg-elevation-50 border-[1px] border-divider-50 rounded-full">
        {icon}
      </div>

      <div className="flex flex-col items-start gap-0.5 ">
        <span className="text-text-300 text-base font-medium leading-6">
          {title}
        </span>
        <span className="text-text-200 text-sm leading-5">{description}</span>
      </div>
    </button>
  );
}

export default function Category() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-16 w-full min-h-fit h-screen py-6 px-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <h1 className="text-text-300 text-base font-medium leading-6">
            <FormattedMessage
              id="Create new identity"
              defaultMessage="Create new identity"
              description="Header copy for Choose a category page"
            />
          </h1>
        }
      />

      <div className="flex flex-col gap-3">
        <Option
          title={intl.formatMessage({
            id: "Authorised signer",
            defaultMessage: "Authorised signer",
            description: "Authorised signer category",
          })}
          description={intl.formatMessage({
            id: "Sign bills on behalf of a company",
            defaultMessage: "Sign bills on behalf of a company",
            description: "Authorised signer category description",
          })}
          icon={
            <UserPenIcon className="text-text-300 w-5 h-5" strokeWidth={1} />
          }
          onClick={() => {}}
        />
        <Option
          title={intl.formatMessage({
            id: "Bill issuer",
            defaultMessage: "Bill issuer",
            description: "Bill issuer category",
          })}
          description={intl.formatMessage({
            id: "Issue bills in your own name",
            defaultMessage: "Issue bills in your own name",
            description: "Bill issuer category description",
          })}
          icon={
            <BuildingIcon className="text-text-300 w-5 h-5" strokeWidth={1} />
          }
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
