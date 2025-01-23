import { useIntl } from "react-intl";
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

export default function Preview({
  contactType,
}: {
  contactType: "person" | "company" | "mint";
}) {
  const intl = useIntl();

  const nodeIdLabel = intl.formatMessage({});
  const cityLabel = intl.formatMessage({});
  const zipLabel = intl.formatMessage({});
  const streetLabel = intl.formatMessage({});

  const personNameLabel = intl.formatMessage({});
  const personCityLabel = intl.formatMessage({});
  const personRegistrationNumberLabel = intl.formatMessage({});

  const companyNameLabel = intl.formatMessage({});
  const companyCityLabel = intl.formatMessage({});
  const companyRegistrationNumberLabel = intl.formatMessage({});

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property label={nodeIdLabel} value="123456" />
        <Separator className="bg-divider-75" />
      </div>
    </div>
  );
}
