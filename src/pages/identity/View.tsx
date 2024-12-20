import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { PencilIcon, CircleCheckIcon, UserIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Separator } from "@/components/ui/separator";
import { useIdentity } from "@/context/identity/IdentityContext";

import Details from "./components/Details";

function Property({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-text-200 text-xs leading-[18px]">{label}</span>
      <span className="text-text-300 text-sm font-medium leading-5">
        {value}
      </span>
    </div>
  );
}

function ProofOfRegistration({ file, size }: { file: string; size: string }) {
  return (
    <div className="flex items-center gap-1 bg-elevation-200 p-4 border border-divider-50 rounded-lg">
      <span className="text-text-300 text-sm font-medium">{file}</span>

      <span className="text-text-200 text-xs leading-[18px]">{size}</span>

      <CircleCheckIcon
        className="w-4 h-4 text-signal-success"
        strokeWidth={1}
      />
    </div>
  );
}

function EditIdentity() {
  return (
    <button className="flex items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
      <PencilIcon className="h-5 w-5 text-text-300 stroke-1" />
    </button>
  );
}

function EditAuthorizedSigners() {
  return (
    <Link to="/authorized-signers">
      <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
        <FormattedMessage
          id="viewIdentity.editAuthorizedSigners"
          defaultMessage="Edit authorized signers"
        />

        <UserIcon className="h-3 w-3 stroke-1" />
      </button>
    </Link>
  );
}

export default function View() {
  const {
    identity: {
      type,
      name,
      email,
      postal_address,
      country_of_birth,
      city_of_birth,
      date_of_birth,
      registration_number,
      proof_of_registration,
      bitcoin_public_key,
    },
  } = useIdentity();
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <span className="text-text-300 font-medium leading-6">
            {type === "personal" ? (
              <FormattedMessage
                id="viewIdentity.titleForPersonalIdentity"
                defaultMessage="Personal identity"
              />
            ) : (
              <FormattedMessage
                id="viewIdentity.titleForCompanyIdentity"
                defaultMessage="Company information"
              />
            )}
          </span>
        }
        trail={<EditIdentity />}
      />

      <Details
        type={type}
        name={name}
        bitcoin_public_key={bitcoin_public_key}
      />

      <div className="flex flex-col items-center gap-6 mb-16">
        <div className="flex flex-col gap-3 w-full py-6 px-5 border-[1px] border-divider-75 rounded-xl">
          <Property
            label={intl.formatMessage({
              id: "Contact email",
              defaultMessage: "Email address",
            })}
            value={email}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact postal address",
              defaultMessage: "Postal address",
            })}
            value={postal_address}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact registration date",
              defaultMessage: "Registration date",
            })}
            value={date_of_birth}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact country of registration",
              defaultMessage: "Country of regitration",
            })}
            value={country_of_birth}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact city of registration",
              defaultMessage: "City of registration",
            })}
            value={city_of_birth}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact registration number",
              defaultMessage: "Registration number",
            })}
            value={registration_number}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Contact proof of registration",
              defaultMessage: "Proof of registration",
            })}
            value={
              <ProofOfRegistration file={proof_of_registration} size="120 KB" />
            }
          />
        </div>

        {type === "company" && <EditAuthorizedSigners />}
      </div>
    </div>
  );
}
