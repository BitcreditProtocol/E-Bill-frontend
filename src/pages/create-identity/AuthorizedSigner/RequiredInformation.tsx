import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { UserIcon, MailIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RequiredInformationProps = {
  continueToNextStep: () => void;
};

export default function RequiredInformation({
  continueToNextStep,
}: RequiredInformationProps) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger } = useFormContext();
  const watchRequiredValues = watch(["name", "email"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["name", "email"]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  return (
    <div className="flex-1 flex flex-col gap-11">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-text-300 text-2xl font-medium leading-8">
          <FormattedMessage
            id="Personal identity"
            defaultMessage="Personal identity"
            description="Header copy for Create new bill issuer identity page"
          />
        </h1>

        <span className="text-text-200 text-base font-normal text-center leading-6 mx-3">
          <FormattedMessage
            id="Please fill in your personal details, all details are handled confidentially"
            defaultMessage="Please fill in your personal details, all details are handled confidentially"
            description="Subheader copy for Create new bill issuer identity page"
          />
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Input
          {...register("name")}
          id="name"
          label={intl.formatMessage({
            id: "Full name",
            defaultMessage: "Full name",
            description: "Label for full name input",
          })}
          icon={<UserIcon className="text-text-300 w-5 h-5" strokeWidth={1} />}
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
      </div>

      <Button
        size="md"
        className="w-full"
        onClick={continueToNextStep}
        disabled={!isDataValid}
      >
        <FormattedMessage
          id="Continue"
          defaultMessage="Continue"
          description="Continue button copy"
        />
      </Button>
    </div>
  );
}
