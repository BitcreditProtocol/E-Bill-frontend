import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { MailIcon, UserIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Title, Description } from "@/components/typography/Step";
import { Button } from "@/components/ui/button";

export default function RequiredInformation({
  continueToNextStep,
}: {
  continueToNextStep: () => void;
}) {
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

  const intl = useIntl();
  const fullNameLabel = intl.formatMessage({
    id: "identity.create.requiredData.form.fullName",
    defaultMessage: "Full name",
    description: "Full name label",
  });
  const emailAddressLabel = intl.formatMessage({
    id: "identity.create.requiredData.form.emailAddress",
    defaultMessage: "Email address",
    description: "Email address label",
  });

  return (
    <div className="flex-1 flex flex-col gap-11 mt-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Title>
          <FormattedMessage
            id="identity.create.requiredInformation.title"
            defaultMessage="Personal identity"
            description="Section title for required data"
          />
        </Title>

        <Description className="mx-8">
          <FormattedMessage
            id="identity.create.requiredInformation.description"
            defaultMessage="Please enter this required data to join the Bitcredit network"
            description="Section description for required data"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          {...register("name")}
          label={fullNameLabel}
          icon={<UserIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
        <Input
          {...register("email")}
          label={emailAddressLabel}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <Button
        className="mt-auto"
        size="md"
        disabled={!isDataValid}
        onClick={continueToNextStep}
      >
        <FormattedMessage
          id="identity.create.continue"
          defaultMessage="Continue"
          description="Continue button"
        />
      </Button>
    </div>
  );
}
