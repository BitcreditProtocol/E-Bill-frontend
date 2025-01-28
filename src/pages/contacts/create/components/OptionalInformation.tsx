import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { MapIcon, ShieldCheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Description, Title } from "@/components/typography/Step";
import { Button } from "@/components/ui/button";

export default function OptionalInformation({
  contactType,
  switchContact,
  moveToNextStep,
}: {
  contactType: "person" | "company" | "mint";
  switchContact: React.ReactNode;
  moveToNextStep: () => void;
}) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger, setValue } = useFormContext();
  const watchRequiredValues = watch([
    "city_of_registration",
    "registration_number",
  ]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger([
        "city_of_registration",
        "registration_number",
      ]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  const skipInformation = () => {
    ["city_of_registration", "registration_number"].forEach((field) => {
      setValue(field, "");
    });
  };

  const companyCityLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.cityOfRegistration",
    defaultMessage: "City of registration",
    description: "Label for city of registration input",
  });
  const personCityLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.cityOfBirth",
    defaultMessage: "City of birth",
    description: "Label for city of birth input",
  });

  const companyRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.registrationNumber",
    defaultMessage: "Registration number",
    description: "Label for registration number input",
  });
  const personRegistrationNumberLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.socialSecurityNumber",
    defaultMessage: "Social security number",
    description: "Label for social security number input",
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Title>
          <FormattedMessage
            id="contacts.create.optionalInformation.title"
            defaultMessage="Optional"
            description="Title for optional information when creating a contact"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="contacts.create.optionalInformation.description"
            defaultMessage="This information is optional, just for your own records"
            description="Description for optional information when creating a contact"
          />
        </Description>
      </div>

      <div className="mx-auto">{switchContact}</div>

      <div className="flex flex-col gap-3">
        <Input
          {...register("city_of_registration")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={contactType === "person" ? personCityLabel : companyCityLabel}
        />
        <Input
          {...register("registration_number")}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? personRegistrationNumberLabel
              : companyRegistrationNumberLabel
          }
        />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
          <FormattedMessage
            id="contacts.create.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button for optional information"
          />
        </Button>

        <Button variant="outline" size="md" onClick={skipInformation}>
          <FormattedMessage
            id="contacts.create.optionalInformation.skip"
            defaultMessage="Skip"
            description="Skip button for optional information"
          />
        </Button>
      </div>
    </div>
  );
}
