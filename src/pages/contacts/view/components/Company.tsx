import { FormattedMessage } from "react-intl";
import { Label, Value } from "../../components/Typography";
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

export default function Company() {
  return (
    <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
      <Property
        label={
          <FormattedMessage
            id="contact.company.name"
            defaultMessage="Company name"
            description="Company name property"
          />
        }
        value="Acme Inc."
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.company.email"
            defaultMessage="Email"
            description="Email property"
          />
        }
        value="admin@acme.inc"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.company.registrationDate"
            defaultMessage="Registration date"
            description="Registration date property"
          />
        }
        value="admin@acme.inc"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.company.countryOfRegistration"
            defaultMessage="Country of registration"
            description="Country of registration property"
          />
        }
        value="Austria"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.company.cityOfRegistration"
            defaultMessage="City of registration"
            description="City of registration property"
          />
        }
        value="Vienna"
      />
      <Separator className="bg-divider-75" />

      <Property
        label={
          <FormattedMessage
            id="contact.company.registrationNumber"
            defaultMessage="Registration number"
            description="Registration number property"
          />
        }
        value="012345678"
      />
      <Separator className="bg-divider-75" />
    </div>
  );
}
