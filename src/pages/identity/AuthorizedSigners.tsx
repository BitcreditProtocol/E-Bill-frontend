import { FormattedMessage } from "react-intl";
import { TrashIcon, UserIcon, ChevronRightIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import IdentityAvatar from "@/components/IdentityAvatar";
import { useIdentity } from "@/context/identity/IdentityContext";
import type { Identity } from "@/types/identity";

import Details from "./components/Details";

function AuthorizedSigner({
  type,
  name,
  postal_address,
}: Pick<Identity, "type" | "name" | "postal_address">) {
  return (
    <div className="flex items-center justify-between h-[74px] py-4 px-3 border border-dashed border-divider-75 rounded-lg">
      <div className="flex gap-3">
        <IdentityAvatar name={name} picture="" identityType={type} size="md" />

        <div className="flex flex-col">
          <span className="text-base font-medium text-text-300 leading-6">
            {name}
          </span>
          <span className="text-xs text-text-200 leading-[18px]">
            {postal_address}
          </span>
        </div>
      </div>

      <button className="flex items-center justify-center">
        <TrashIcon className="h-5 w-5 text-text-300 stroke-1" />
      </button>
    </div>
  );
}

function List() {
  const signers = [
    {
      type: "personal" as "personal" | "company",
      name: "Steven Flow",
      postal_address: "1234 Main St, San Francisco, CA 94123",
    },
    {
      type: "personal" as "personal" | "company",
      name: "Axel Violet",
      postal_address: "1234 Main St, San Francisco, CA 94123",
    },
    {
      type: "personal" as "personal" | "company",
      name: "Chris Von Cornell",
      postal_address: "1234 Main St, San Francisco, CA 94123",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {signers.map((signer) => (
        <AuthorizedSigner
          type={signer.type}
          name={signer.name}
          postal_address={signer.postal_address}
        />
      ))}
    </div>
  );
}

function AddAuthorizedSigner() {
  return (
    <button className="flex items-center justify-between gap-6 w-full py-6 px-3 bg-elevation-200 border border-divider-75 rounded-xl">
      <div className="flex items-center gap-2">
        <UserIcon className="h-6 w-6 text-text-300 stroke-1" />

        <span className="text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="viewIdentity.addAuthorizedSigner"
            defaultMessage="Add authorized signer"
          />
        </span>
      </div>

      <ChevronRightIcon className="h-4 w-4 text-text-300 stroke-1" />
    </button>
  );
}

export default function AuthorizedSigners() {
  const {
    identity: { type, name, bitcoin_public_key },
  } = useIdentity();

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <span className="text-text-300 font-medium leading-6">
            <FormattedMessage
              id="authorizedSigners.title"
              defaultMessage="Authorized Signers"
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
        <List />
        <AddAuthorizedSigner />
      </div>
    </div>
  );
}
