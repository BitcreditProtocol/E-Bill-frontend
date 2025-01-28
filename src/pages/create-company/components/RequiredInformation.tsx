import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";
import { BuildingIcon, MailIcon, MapPinIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

type RequiredInformationProps = {
  validate: (isValid: boolean) => void;
};

export default function RequiredInformation({
  validate,
}: RequiredInformationProps) {
  const intl = useIntl();

  const { register, watch, trigger } = useFormContext();
  const watchRequiredValues = watch(["name", "email", "address"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["name", "email", "address"]);

      validate(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger, validate]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Input
          {...register("name")}
          id="name"
          label={intl.formatMessage({
            id: "Legal company name",
            defaultMessage: "Legal company name",
            description: "Label for Legal company name input",
          })}
          icon={
            <BuildingIcon className="text-text-300 w-5 h-5" strokeWidth={1} />
          }
          required
        />

        <Input
          {...register("email")}
          id="email"
          label={intl.formatMessage({
            id: "Email address",
            defaultMessage: "Email address",
            description: "Label for email address input",
          })}
          icon={<MailIcon className="text-text-300 w-5 h-5" strokeWidth={1} />}
          required
        />

        <Input
          {...register("address")}
          id="address"
          label={intl.formatMessage({
            id: "Postal address",
            defaultMessage: "Postal address",
            description: "Label for postal address input",
          })}
          icon={
            <MapPinIcon className="text-text-300 w-5 h-5" strokeWidth={1} />
          }
          required
        />
      </div>
    </div>
  );
}
