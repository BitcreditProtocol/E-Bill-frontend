import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { CircleCheckIcon, CopyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { COUNTRIES } from "@/constants/countries";
import { truncateString } from "@/utils/strings";
import { copyToClipboard } from "@/utils";
import { Label, Value } from "./components/Typography";
import IdentityAvatar from "@/components/IdentityAvatar";
import { Button } from "@/components/ui/button";

function UploadedFile({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex gap-1 items-center">
        <span className="text-text-300 text-sm font-medium leading-5">
          {name}
        </span>
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {size} KB
        </span>
        <CircleCheckIcon
          className="h-4 w-4 text-signal-success"
          strokeWidth={1}
        />
      </div>
    </div>
  );
}

function Details({
  contactType,
  name,
  nodeId,
  profilePicturePreview,
}: {
  contactType: "person" | "company" | "mint";
  avatar: string;
  name: string;
  nodeId: string;
  profilePicturePreview: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        picture={profilePicturePreview}
        name={name}
        size="lg"
        identityType={contactType === "person" ? "personal" : "company"}
      />

      <div className="flex flex-col gap-2">
        <span className="text-text-300 text-xl font-medium leading-normal">
          {name}
        </span>

        <div className="flex items-center justify-center gap-1">
          <span className="text-text-200 text-xs font-normal leading-normal">
            {truncateString(nodeId, 10)}
          </span>
          <button
            className="p-0"
            onClick={() => {
              void copyToClipboard(nodeId);
            }}
          >
            <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Property({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode | string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {typeof value === "string" ? (
        value === "" ? (
          "-"
        ) : (
          <Value>{value}</Value>
        )
      ) : (
        value
      )}
    </div>
  );
}

export default function Preview({
  contactType,
  profilePicturePreview,
}: {
  contactType: "person" | "company" | "mint";
  profilePicturePreview: string;
}) {
  const intl = useIntl();
  const { getValues } = useFormContext();

  const personEmailAddressLabel = intl.formatMessage({
    id: "contacts.create.preview.email",
    defaultMessage: "Email address",
    description: "Label for email",
  });
  const personPostalAddressLabel = intl.formatMessage({
    id: "contacts.create.preview.postalAddress",
    defaultMessage: "Postal address",
    description: "Label for postal address",
  });
  const personBirthDateLabel = intl.formatMessage({
    id: "contacts.create.preview.dateOfBirth",
    defaultMessage: "Date of birth",
    description: "Label for date of birth",
  });
  const personCountryLabel = intl.formatMessage({
    id: "contacts.create.preview.countryOfBirth",
    defaultMessage: "Country of birth",
    description: "Label for country of birth",
  });
  const personCityLabel = intl.formatMessage({
    id: "contacts.create.preview.cityOfBirth",
    defaultMessage: "City of birth",
    description: "Label for city of birth",
  });
  const personRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.create.preview.socialSecurityNumber",
    defaultMessage: "Social security number",
    description: "Label for social security number",
  });
  const personRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.create.preview.registrationDocument",
    defaultMessage: "Identity document",
    description: "Label for registration document",
  });

  const companyEmailAddressLabel = intl.formatMessage({
    id: "contacts.create.preview.companyEmail",
    defaultMessage: "Company email",
    description: "Label for company email",
  });
  const companyPostalAddressLabel = intl.formatMessage({
    id: "contacts.create.preview.companyAddress",
    defaultMessage: "Postal address",
    description: "Label for postal address",
  });
  const companyRegistrationDateLabel = intl.formatMessage({
    id: "contacts.create.preview.dateOfRegistration",
    defaultMessage: "Date of registration",
    description: "Label for date of registration",
  });
  const companyCountryLabel = intl.formatMessage({
    id: "contacts.create.preview.countryOfRegistration",
    defaultMessage: "Country of registration",
    description: "Label for country of registration",
  });
  const companyCityLabel = intl.formatMessage({
    id: "contacts.create.preview.cityOfRegistration",
    defaultMessage: "City of registration",
    description: "Label for city of registration",
  });
  const companyRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.create.preview.registrationNumber",
    defaultMessage: "Registration number",
    description: "Label for registration number",
  });
  const companyRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.create.preview.registrationDocument",
    defaultMessage: "Registration document",
    description: "Label for registration document",
  });

  const address = `${getValues("street") as string},
  ${getValues("zip") as string}, ${getValues("city") as string}`;
  const countryKey = getValues("country") as keyof typeof COUNTRIES;
  const country = COUNTRIES[countryKey];

  return (
    <div className="flex flex-col gap-6">
      <Details
        contactType={contactType}
        avatar=""
        name={getValues("name") as string}
        nodeId={getValues("node_id") as string}
        profilePicturePreview={profilePicturePreview}
      />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={
            contactType === "person"
              ? personEmailAddressLabel
              : companyEmailAddressLabel
          }
          value={getValues("email") as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personPostalAddressLabel
              : companyPostalAddressLabel
          }
          value={address}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personBirthDateLabel
              : companyRegistrationDateLabel
          }
          value={getValues("date_of_registration") as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person" ? personCountryLabel : companyCountryLabel
          }
          value={country}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={contactType === "person" ? personCityLabel : companyCityLabel}
          value={getValues("city_of_registration") as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personRegistrationNumberLabel
              : companyRegistrationNumberLabel
          }
          value={getValues("registration_number") as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personRegistrationDocumentLabel
              : companyRegistrationDocumentLabel
          }
          value={
            <UploadedFile
              name={getValues("document_name") as string}
              size={getValues("document_size") as string}
            />
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button size="md">
          <FormattedMessage
            id="contacts.create.preview.save"
            defaultMessage="Save"
            description="Save contact button"
          />
        </Button>

        <Button size="md" variant="outline">
          <FormattedMessage
            id="contacts.create.preview.cancel"
            defaultMessage="Cancel"
            description="Cancel contact creation button"
          />
        </Button>
      </div>
    </div>
  );
}
