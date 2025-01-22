import { FormattedMessage } from "react-intl";
import { BuildingIcon, ChevronRightIcon, LogOutIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { useIdentity } from "@/context/identity/IdentityContext";
import type { Identity } from "@/types/identity";

import Details from "./components/Details";
import IdentityOption from "./components/IdentityOption";

function CompanyIdentitiesList({
  companyIdentities,
}: {
  companyIdentities: Identity[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-200 text-sm font-medium">
        <FormattedMessage
          id="identity.companyIdentities.title"
          defaultMessage="Company identities"
        />
      </span>

      <div className="flex flex-col gap-3">
        {companyIdentities.map((identity) => (
          <IdentityOption
            type={identity.type}
            key={identity.node_id}
            name={identity.name}
            postal_address={identity.postal_address}
            node_id={identity.node_id}
          />
        ))}
      </div>
    </div>
  );
}

function CreateNewCompanyIdentity() {
  return (
    <button className="flex items-center justify-between gap-6 w-full py-6 px-3 bg-elevation-200 border border-divider-75 rounded-xl">
      <div className="flex items-center gap-2">
        <BuildingIcon className="h-6 w-6 text-text-300 stroke-1" />

        <span className="text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="identity.createNewCompanyIdentity"
            defaultMessage="Create new company"
          />
        </span>
      </div>

      <ChevronRightIcon className="h-4 w-4 text-text-300 stroke-1" />
    </button>
  );
}

function Logout() {
  return (
    <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
      <FormattedMessage
        id="identity.logout"
        defaultMessage="Remove identity from device"
      />

      <LogOutIcon className="h-3 w-3 stroke-1" />
    </button>
  );
}

export default function Identity() {
  const {
    identity: { type, name, bitcoin_public_key },
    personalIdentity,
    companyIdentities,
  } = useIdentity();

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <span className="text-text-300 font-medium leading-6">
            <FormattedMessage
              id="identity.title"
              defaultMessage="Switch identity"
            />
          </span>
        }
        trail={<></>}
      />

      <Details
        type={type}
        name={name}
        bitcoin_public_key={bitcoin_public_key}
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <span className="text-text-200 text-sm font-medium">
              <FormattedMessage
                id="identity.personalIdentity.title"
                defaultMessage="Personal identity"
              />
            </span>

            <IdentityOption
              type={personalIdentity.type}
              name={personalIdentity.name}
              postal_address={personalIdentity.postal_address}
              node_id={personalIdentity.node_id}
            />
          </div>

          <CompanyIdentitiesList companyIdentities={companyIdentities} />
        </div>

        <div className="flex flex-col items-center gap-6">
          <CreateNewCompanyIdentity />
          <Logout />
        </div>
      </div>
    </div>
  );
}
