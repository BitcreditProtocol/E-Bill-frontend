import { useIntl } from "react-intl";
import { CopyIcon, CircleCheckIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Icon from "./Icon";
import type { Contact } from "@/types/contact";
import { copyToClipboard } from "@/utils";

type BasicDetailsProps = Pick<Contact, 'type' | 'name' | 'public_key'>;

function BasicDetails({ type, name, public_key }: BasicDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <Icon type={type} name={name} />

        <span className="text-text-300 text-base font-medium leading-6">
          {name}
        </span>

        <button className="flex items-center justify-center gap-1 w-full bg-transparent">
          <span className="text-text-200 text-xs leading-[18px]">
            {public_key}
          </span>
          <CopyIcon
            className="w-4 h-4 text-text-200"
            onClick={() => {
              void copyToClipboard(public_key);
            }}
          />
        </button>
      </div>
    </div>
  );
}

type ProofOfRegistrationProps = {
  file: string;
  size: string;
};

function ProofOfRegistration({ file, size }: ProofOfRegistrationProps) {
  return (
    <div className="flex items-center gap-1 bg-elevation-200 p-4 border-[1px] border-divider-50 rounded-[6px]">
      <span className="text-text-300 text-sm font-medium">{file}</span>

      <span className="text-text-200 text-xs leading-[18px]">{size}</span>

      <CircleCheckIcon
        className="w-4 h-4 text-signal-success"
        strokeWidth={1}
      />
    </div>
  );
}

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

type InformationProps = Omit<Contact, "type" | "name" | "public_key">;

function Information({
  email,
  postal_address,
  date_of_birth_or_registration,
  country,
  city,
  identification_number,
}: InformationProps) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-3 w-full py-6 px-5 border-[1px] border-divider-75 rounded-xl">
      <Property
        label={intl.formatMessage({
          id: "Contact email",
          defaultMessage: "Email address",
          description: "Label for email address",
        })}
        value={email}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact postal address",
          defaultMessage: "Postal address",
          description: "Label for postal address",
        })}
        value={postal_address}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact registration date",
          defaultMessage: "Registration date",
          description: "Label for registration date",
        })}
        value={date_of_birth_or_registration}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact country of registration",
          defaultMessage: "Country of regitration",
          description: "Label for country of registration",
        })}
        value={country}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact city of registration",
          defaultMessage: "City of registration",
          description: "Label for city of registration",
        })}
        value={city}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact registration number",
          defaultMessage: "Registration number",
          description: "Label for registration number",
        })}
        value={identification_number}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={intl.formatMessage({
          id: "Contact proof of registration",
          defaultMessage: "Proof of registration",
          description: "Label for proof of registration",
        })}
        value={<ProofOfRegistration file="registration.pdf" size="120 KB" />}
      />
    </div>
  );
}

type ContactDetailsProps = Contact;

export default function Details({
  type,
  name,
  email,
  postal_address,
  public_key,
  date_of_birth_or_registration,
  country,
  city,
  identification_number,
}: ContactDetailsProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <BasicDetails type={type} name={name} public_key={public_key} />

      <Information
        email={email}
        postal_address={postal_address}
        date_of_birth_or_registration={date_of_birth_or_registration}
        country={country}
        city={city}
        identification_number={identification_number}
      />
    </div>
  );
}
