import { FormattedMessage } from "react-intl";
import { Label, Value } from "../components/Typography";
import { Separator } from "@/components/ui/separator";

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

export default function Personal() {
  return (
    <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
      <Property
        label={
          <FormattedMessage
            id="contact.personal.name"
            defaultMessage="Full name"
            description="Full name property"
          />
        }
        value="John Doe"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.email"
            defaultMessage="Email address"
            description="Email address property"
          />
        }
        value="john@doe.com"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.address"
            defaultMessage="Postal address"
            description="Postal address property"
          />
        }
        value="Langebroekdijk 12, 1920DP, Netherlands"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.birthDate"
            defaultMessage="Birth date"
            description="Birth date property"
          />
        }
        value="20-Nov-1980"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.countryOfBirth"
            defaultMessage="Country of birth"
            description="Country of birth property"
          />
        }
        value="Albania"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.cityOfBirth"
            defaultMessage="City of birth"
            description="City of birth property"
          />
        }
        value="Tiranë"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.personal.socialSecurityNumber"
            defaultMessage="Social security number"
            description="Social security number property"
          />
        }
        value="0123456789"
      />
      <Separator className="bg-divider-75" />
    </div>
  );
}
