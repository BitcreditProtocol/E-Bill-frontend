import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { MapIcon, MapPinIcon, MapPinnedIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Description, Title } from "@/components/typography/Step";
import { Button } from "@/components/ui/button";

export default function PostalAddress({
  switchContact,
  moveToNextStep,
}: {
  switchContact: React.ReactNode;
  moveToNextStep: () => void;
}) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger } = useFormContext();
  const watchRequiredValues = watch(["city", "zip", "street"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["city", "zip", "street"]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Title>
          <FormattedMessage
            id="contacts.create.postalAddress.title"
            defaultMessage="Required"
            description="Title for contact creation postal address step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="contacts.create.postalAddress.description"
            defaultMessage="Postal address of the bill counterparty"
            description="Description for contact creation postal address step"
          />
        </Description>
      </div>

      <div className="mx-auto">{switchContact}</div>

      <div className="flex flex-col gap-3">
        <Input
          {...register("city")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={intl.formatMessage({
            id: "contacts.create.postalAddress.city",
            defaultMessage: "City",
            description: "Label for city input",
          })}
          required
        />
        <Input
          {...register("zip")}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={intl.formatMessage({
            id: "contacts.create.postalAddress.zipCode",
            defaultMessage: "Zip code",
            description: "Label for zip code input",
          })}
          required
        />
        <Input
          {...register("street")}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={intl.formatMessage({
            id: "contacts.create.postalAddress.streetAddress",
            defaultMessage: "Street address",
            description: "Label for street address input",
          })}
          required
        />
      </div>

      <Button
        className="mt-auto"
        size="md"
        onClick={moveToNextStep}
        disabled={!isDataValid}
      >
        <FormattedMessage
          id="contacts.create.postalAddress.next"
          defaultMessage="Continue"
          description="Button text for next step in contact creation"
        />
      </Button>
    </div>
  );
}
