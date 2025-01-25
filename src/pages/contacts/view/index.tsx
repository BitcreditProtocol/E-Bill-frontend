import { useNavigate } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import { PencilIcon, CopyIcon, CircleCheckIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Separator } from "@/components/ui/separator";
import IdentityAvatar from "@/components/IdentityAvatar";
import routes from "@/constants/routes";
import { truncateString } from "@/utils/strings";
import type { Contact } from "@/types/contact";
import { Label, Value } from "../components/Typography";
import Delete from "../components/Delete";

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
      {typeof value === "string" ? <Value>{value}</Value> : value}
    </div>
  );
}

type DetailsProps = {
  type: "personal" | "company";
  name: Contact["name"];
  nodeId: Contact["node_id"];
  avatar?: Contact["avatar"];
};

function Details({ type, name, nodeId, avatar }: DetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        name={name}
        picture={avatar || ""}
        identityType={type}
        size="lg"
      />

      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-[30px]">
          {name}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {truncateString(nodeId, 12)}
          </span>

          <button className="flex items-center justify-center">
            <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

type ViewContactProps = {
  contactType: "person" | "company" | "mint";
  nodeId: string;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  street: string;
  dateOfRegistration: string;
  countryOfRegistration: string;
  cityOfRegistration: string;
  registrationNumber: string;
};

export default function View({
  contactType,
  nodeId,
  name,
  email,
  country,
  city,
  zip,
  street,
  dateOfRegistration,
  countryOfRegistration,
  cityOfRegistration,
  registrationNumber,
}: ViewContactProps) {
  const navigate = useNavigate();
  const intl = useIntl();

  const companyNameLabel = intl.formatMessage({
    id: "contacts.view.company.name",
    defaultMessage: "Company name",
    description: "Label for company name",
  });
  const companyEmailLabel = intl.formatMessage({
    id: "contacts.view.company.email",
    defaultMessage: "Company email",
    description: "Label for company email address",
  });
  const companyAddressLabel = intl.formatMessage({
    id: "contacts.view.company.address",
    defaultMessage: "Company address",
    description: "Label for company address",
  });
  const companyRegistrationDateLabel = intl.formatMessage({
    id: "contacts.view.company.registrationDate",
    defaultMessage: "Registration date",
    description: "Label for company registration date",
  });
  const companyCountryOfRegistrationLabel = intl.formatMessage({
    id: "contacts.view.company.countryOfRegistration",
    defaultMessage: "Country of registration",
    description: "Label for company country of registration",
  });
  const companyCityOfRegistrationLabel = intl.formatMessage({
    id: "contacts.view.company.cityOfRegistration",
    defaultMessage: "City of registration",
    description: "Label for company city of registration",
  });
  const companyRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.view.company.registrationNumber",
    defaultMessage: "Registration number",
    description: "Label for company registration number",
  });
  const companyRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.view.company.registrationDocument",
    defaultMessage: "Registration document",
    description: "Label for company registration document",
  });

  const personNameLabel = intl.formatMessage({
    id: "contacts.view.person.name",
    defaultMessage: "Legal full name",
    description: "Label for person name",
  });
  const personEmailLabel = intl.formatMessage({
    id: "contacts.view.person.email",
    defaultMessage: "Email address",
    description: "Label for email address",
  });
  const personAddressLabel = intl.formatMessage({
    id: "contacts.view.person.address",
    defaultMessage: "Postal address",
    description: "Label for address",
  });
  const personBirthDateLabel = intl.formatMessage({
    id: "contacts.view.person.dateOfBirth",
    defaultMessage: "Date of birth",
    description: "Label for date of birth",
  });
  const personCountryOfBirthLabel = intl.formatMessage({
    id: "contacts.view.person.countryOfBirth",
    defaultMessage: "Country of birth",
    description: "Label for country of birth",
  });
  const personCityOfBirthLabel = intl.formatMessage({
    id: "contacts.view.person.cityOfBirth",
    defaultMessage: "City of birth",
    description: "Label for city of birth",
  });
  const personRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.view.person.socialSecurityNumber",
    defaultMessage: "Social security number",
    description: "Label for social security number",
  });
  const personRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.view.person.registrationDocument",
    defaultMessage: "Registration document",
    description: "Label for registration document",
  });

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="contacts.view.title"
              defaultMessage="View contact"
              description="Title for view contact page"
            />
          </PageTitle>
        }
        trail={
          <button
            className="flex items-center justify-center p-1.5 h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md"
            onClick={() => {
              navigate(
                "/contacts/" + routes.EDIT_CONTACT.replace(":node_id", "1")
              );
            }}
          >
            <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        }
      />

      <Details
        type={contactType === "person" ? "personal" : "company"}
        name={"John Doe"}
        nodeId={nodeId || "bitcrFF09210aabb111a"}
      />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={contactType === "person" ? personNameLabel : companyNameLabel}
          value={name || "John Doe"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person" ? personEmailLabel : companyEmailLabel
          }
          value={email || "john@doe.com"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person" ? personAddressLabel : companyAddressLabel
          }
          value={`${street || "Street 1"}, ${zip || "09181"} ${
            city || "Vienna"
          }, ${country || "AT"}`}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personBirthDateLabel
              : companyRegistrationDateLabel
          }
          value={dateOfRegistration || "16-Jan-2025"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personCountryOfBirthLabel
              : companyCountryOfRegistrationLabel
          }
          value={countryOfRegistration || "AT"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personCityOfBirthLabel
              : companyCityOfRegistrationLabel
          }
          value={cityOfRegistration || "Vienna"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personRegistrationNumberLabel
              : companyRegistrationNumberLabel
          }
          value={registrationNumber || "FN 123456"}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            contactType === "person"
              ? personRegistrationDocumentLabel
              : companyRegistrationDocumentLabel
          }
          value={<UploadedFile name="registration.pdf" size="165" />}
        />
      </div>

      <Delete />
    </Page>
  );
}
