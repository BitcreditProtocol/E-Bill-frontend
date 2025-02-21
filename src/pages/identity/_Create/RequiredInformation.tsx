import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useIntl, FormattedMessage } from "react-intl";
import { MailIcon, UserIcon } from "lucide-react";
import { Description, Title } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { messages } from "../components/messages";

export default function RequiredInformation({
  moveToNextStep,
}: {
  moveToNextStep: () => void;
}) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger } = useFormContext();
  const [isDataValid, setIsDataValid] = useState(false);

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
        <Title>
          <FormattedMessage
            id="identity.create.requiredInformation.title"
            defaultMessage="Personal identity"
            description="Title for the required information step"
          />
        </Title>
        <Description className="text-center mx-14">
          <FormattedMessage
            id="identity.create.requiredInformation.description"
            defaultMessage="Please enter this required data to join the Bitcredit network"
            description="Description for the required information step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <Input
          {...register("name")}
          label={f(messages["identity.name"])}
          icon={<UserIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("email")}
          label={f(messages["identity.email"])}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
        <FormattedMessage
          id="identity.create.continue"
          defaultMessage="Continue"
          description="Label for the continue to next step button"
        />
      </Button>
    </div>
  );
}
