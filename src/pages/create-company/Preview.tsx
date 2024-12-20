import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import { Separator } from "@/components/ui/separator";
import avatar from "@/assets/avatar.png";

function Property({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-text-200 text-xs font-normal leading-[18px]">
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-text-300 text-sm font-medium leading-5">
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
}

export default function Preview() {
  const { getValues } = useFormContext();
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center flex-col gap-4">
          <img src={avatar} className="h-12 w-12" />
          <span className="w-[16.75rem] text-[#1b0f00] text-center font-['Geist'] text-xl font-medium leading-[1.875rem]">
            {getValues("name")}
          </span>
        </div>

        <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
          <Property
            label={intl.formatMessage({
              id: "Email address",
              defaultMessage: "Email address",
              description: "Label for email address",
            })}
            value={getValues("email") as string}
          />

          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Postal address",
              defaultMessage: "Postal address",
              description: "Label for Postal address",
            })}
            value={getValues("address") as string}
          />

          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Registration date",
              defaultMessage: "Registration date",
              description: "Label for Registration date",
            })}
            value={(getValues("registration_date") as string) || "-"}
          />

          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Country of registration",
              defaultMessage: "Country of registration",
              description: "Label for Country of registration",
            })}
            value={(getValues("country_of_registration") as string) || "-"}
          />

          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "City of registration",
              defaultMessage: "City of registration",
              description: "Label for City of registration",
            })}
            value={(getValues("city_of_registration") as string) || "-"}
          />

          <Separator className="bg-divider-75" />

          <Property
            label={intl.formatMessage({
              id: "Registration number",
              defaultMessage: "Registration number",
              description: "Label for Registration number",
            })}
            value={(getValues("registration_number") as string) || "-"}
          />

          <Separator className="bg-divider-75" />

          <Property label="Proof of registration" value="-" />
        </div>
      </div>
    </div>
  );
}
