import { useIntl } from "react-intl";
import { CopyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import IdentityAvatar from "@/components/IdentityAvatar";
import { copyToClipboard } from "@/utils";
import { truncateString } from "@/utils/strings";
import Property from "./Property";
import { messages } from "./messages";

export function Loader() {
  return (
    <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl"></div>
  );
}

type SummaryProps = {
  node_id: string;
  name: string;
};

function Summary({ node_id, name }: SummaryProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        name={name}
        picture=""
        size="lg"
        identityType="personal"
      />

      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-normal">
          {name}
        </span>

        <button className="flex items-center justify-center gap-1 w-full bg-transparent">
          <span className="text-text-200 text-xs leading-[18px]">
            {truncateString(node_id, 14)}
          </span>
          <CopyIcon
            className="w-4 h-4 text-text-200"
            onClick={() => {
              void copyToClipboard(node_id);
            }}
          />
        </button>
      </div>
    </div>
  );
}

type IdentityInformationProps = {
  node_id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  date_of_birth: string;
  country_of_birth: string;
  city_of_birth: string;
  identification_number: string;
};

export default function Information({
  node_id,
  name,
  email,
  country,
  city,
  zip,
  address,
  date_of_birth,
  country_of_birth,
  city_of_birth,
  identification_number,
}: IdentityInformationProps) {
  const { formatMessage: f } = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <Summary node_id={node_id} name={name} />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property label={f(messages["identity.name"])} value={name} />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["identity.email"])} value={email} />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.address"])}
          value={`${address}, ${zip}, ${city}, ${country}`}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.date_of_birth"])}
          value={date_of_birth}
        />

        <Property
          label={f(messages["identity.country_of_birth"])}
          value={country_of_birth}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.city_of_birth"])}
          value={city_of_birth}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.identification_number"])}
          value={identification_number}
        />
      </div>
    </div>
  );
}
