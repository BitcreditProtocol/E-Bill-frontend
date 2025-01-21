import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { format } from "date-fns";
import { MapIcon, ShieldCheckIcon } from "lucide-react";

import { Title, Description } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import CountrySelector from "@/components/CountrySelector";

export default function OptionalInformation({
  continueToNextStep,
}: {
  continueToNextStep: () => void;
}) {
  const [currentDate, setCurrentDate] = useState();

  const { register, setValue } = useFormContext();

  const intl = useIntl();
  const birthDateLabel = intl.formatMessage({
    id: "identity.create.optionalInformation.form.birthDate",
    defaultMessage: "Birth date",
    description: "Birth date label",
  });
  const countryOfBirthLabel = intl.formatMessage({
    id: "identity.create.optionalInformation.form.countryOfBirth",
    defaultMessage: "Country of birth",
    description: "Country of birth label",
  });
  const cityOfBirthLabel = intl.formatMessage({
    id: "identity.create.optionalInformation.form.cityOfBirth",
    defaultMessage: "City of birth",
    description: "City of birth label",
  });
  const identificationNumberLabel = intl.formatMessage({
    id: "identity.create.optionalInformation.form.identificationNumber",
    defaultMessage: "Identification number",
    description: "Identification number label",
  });

  return (
    <div className="flex-1 flex flex-col gap-11 mt-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Title>
          <FormattedMessage
            id="identity.create.optionalInformation.title"
            defaultMessage="Optional: other information"
            description="Section title for optional information"
          />
        </Title>
        <Description className="mx-12">
          <FormattedMessage
            id="identity.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it to grow your credit score"
            description="Section description for optional information"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3">
        <DatePicker
          label={birthDateLabel}
          mode="single"
          value={{ from: currentDate }}
          onChange={({ from }) => {
            // @ts-expect-error - TS doesn't know about the date object
            setCurrentDate(from);

            // @ts-expect-error - TS doesn't know about the date object
            setValue("date_of_birth", format(from, "dd-MMM-yyyy"));
          }}
        />
        <CountrySelector
          label={countryOfBirthLabel}
          callback={(e) => {
            setValue("country_of_birth", e);
          }}
        />

        <Input
          {...register("city_of_birth")}
          label={cityOfBirthLabel}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("identification_number")}
          label={identificationNumberLabel}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button size="md" onClick={continueToNextStep}>
          <FormattedMessage
            id="identity.create.continue"
            defaultMessage="Continue"
            description="Continue button"
          />
        </Button>

        <Button size="md" variant="outline" onClick={continueToNextStep}>
          <FormattedMessage
            id="identity.create.skip"
            defaultMessage="Skip"
            description="Skip button"
          />
        </Button>
      </div>
    </div>
  );
}
