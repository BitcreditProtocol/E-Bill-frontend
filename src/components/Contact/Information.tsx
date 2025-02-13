import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Summary from "@/components/Summary";
import { Button } from "@/components/ui/button";
import { getContactDetails } from "@/services/contact_v2";
import { COUNTRIES } from "@/constants/countries";
import type { Contact } from "@/types/contact";
import { ScrollArea } from "../ui/scroll-area";
import Property from "./Property";
import { messages } from "./messages";

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-16 w-16 bg-elevation-200 rounded-full" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
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

function Information({
  contactId,
  onSelect,
}: {
  contactId: string;
  onSelect: (contact: Contact) => void;
}) {
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryKey: ["contacts", "details", contactId],
    queryFn: () => getContactDetails(contactId),
  });

  const {
    type,
    node_id,
    name,
    email,
    address,
    zip,
    city,
    country,
    date_of_birth_or_registration,
    country_of_birth_or_registration,
    city_of_birth_or_registration,
    identification_number,
  } = data;

  const selectContact = () => {
    onSelect({ ...data });
  };

  return (
    <ScrollArea>
      <div className="flex flex-col gap-4">
        <Summary identityType={type} name={name} nodeId={node_id} picture="" />

        <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
          <Property
            label={
              type === 0
                ? f(messages["contacts.person.name"])
                : f(messages["contacts.company.name"])
            }
            value={name}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={
              type === 0
                ? f(messages["contacts.person.email"])
                : f(messages["contacts.company.email"])
            }
            value={email}
          />
          <Separator className="bg-divider-75" />

          <Property label={f(messages["contacts.address"])} value={address} />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["contacts.country"])}
            value={COUNTRIES[country as keyof typeof COUNTRIES]}
          />
          <Separator className="bg-divider-75" />

          <Property label={f(messages["contacts.city"])} value={city} />
          <Separator className="bg-divider-75" />

          <Property label={f(messages["contacts.zipCode"])} value={zip} />
          <Separator className="bg-divider-75" />

          <Property
            label={
              type === 0
                ? f(messages["contacts.person.dateOfBirth"])
                : f(messages["contacts.company.dateOfRegistration"])
            }
            value={date_of_birth_or_registration}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={
              type === 0
                ? f(messages["contacts.person.countryOfBirth"])
                : f(messages["contacts.company.countryOfRegistration"])
            }
            value={
              COUNTRIES[
                country_of_birth_or_registration as keyof typeof COUNTRIES
              ]
            }
          />
          <Separator className="bg-divider-75" />

          <Property
            label={
              type === 0
                ? f(messages["contacts.person.cityOfBirth"])
                : f(messages["contacts.company.cityOfRegistration"])
            }
            value={city_of_birth_or_registration}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={
              type === 0
                ? f(messages["contacts.person.identityNumber"])
                : f(messages["contacts.company.registrationNumber"])
            }
            value={identification_number}
          />
          <Separator className="bg-divider-75" />
        </div>

        <Button size="md" onClick={selectContact}>
          <FormattedMessage
            id="contacts.select.details.select"
            defaultMessage="Select"
            description="Select contact"
          />
        </Button>
      </div>
    </ScrollArea>
  );
}

export default function ContactInformation({
  nodeId,
  onSelect,
}: {
  nodeId: string;
  onSelect: (contact: Contact) => void;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Information contactId={nodeId} onSelect={onSelect} />
    </Suspense>
  );
}
