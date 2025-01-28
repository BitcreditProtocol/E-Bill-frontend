import { useIntl } from "react-intl";
import { CopyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import IdentityAvatar from "@/components/IdentityAvatar";
import { copyToClipboard } from "@/utils";
import { truncateString } from "@/utils/strings";
import { Contact, ContactTypes } from "@/types/contact";
import { Label, Value } from "./Typography";
import { messages } from "./messages";

type SummaryProps = Pick<Contact, "type" | "name" | "node_id">;

function Summary({ type, name, node_id }: SummaryProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        name={name}
        picture=""
        size="lg"
        identityType={type === ContactTypes.Person ? "personal" : "company"}
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

function Property({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Value>{value.length === 0 ? "-" : value}</Value>
    </div>
  );
}

export function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 bg-elevation-200" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
      </div>
    </div>
  );
}

type ContactInformationProps = Contact;

export default function Information({
  type,
  node_id,
  name,
  email,
  address,
  date_of_birth_or_registration,
  country_of_birth_or_registration,
  city_of_birth_or_registration,
  identification_number,
}: ContactInformationProps) {
  const { formatMessage: f } = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <Summary type={type} name={name} node_id={node_id} />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.name"])
              : f(messages["contacts.company.name"])
          }
          value={name}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.email"])
              : f(messages["contacts.company.email"])
          }
          value={email}
        />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["contacts.address"])} value={address} />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.dateOfBirth"])
              : f(messages["contacts.company.dateOfRegistration"])
          }
          value={date_of_birth_or_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.countryOfBirth"])
              : f(messages["contacts.company.countryOfRegistration"])
          }
          value={country_of_birth_or_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.cityOfBirth"])
              : f(messages["contacts.company.cityOfRegistration"])
          }
          value={city_of_birth_or_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === ContactTypes.Person
              ? f(messages["contacts.person.identityNumber"])
              : f(messages["contacts.company.registrationNumber"])
          }
          value={identification_number}
        />
      </div>
    </div>
  );
}
