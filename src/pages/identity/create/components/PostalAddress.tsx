import { FormattedMessage, useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";
import { MapIcon, MapPinIcon, MapPinnedIcon } from "lucide-react";

import { Title, Description } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CountrySelector from "@/components/CountrySelector";

export default function PostalAddress({
  continueToNextStep,
}: {
  continueToNextStep: () => void;
}) {
  const { register, setValue } = useFormContext();

  const intl = useIntl();
  const countryLabel = intl.formatMessage({
    id: "identity.create.postalAddress.form.country",
    defaultMessage: "Country",
    description: "Country label",
  });
  const cityLabel = intl.formatMessage({
    id: "identity.create.postalAddress.form.city",
    defaultMessage: "City",
    description: "City label",
  });
  const zipLabel = intl.formatMessage({
    id: "identity.create.postalAddress.form.zip",
    defaultMessage: "Zip code",
    description: "Zip code label",
  });
  const streetLabel = intl.formatMessage({
    id: "identity.create.postalAddress.form.street",
    defaultMessage: "Street",
    description: "Street label",
  });

  return (
    <div className="flex-1 flex flex-col gap-11 mt-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Title>
          <FormattedMessage
            id="identity.create.postalAddress.title"
            defaultMessage="Optional: postal address"
            description="Section title for postal address"
          />
        </Title>
        <Description className="mx-8">
          <FormattedMessage
            id="identity.create.postalAddress.description"
            defaultMessage="These fields are only needed if you want to issue bills in your own name"
            description="Section description for postal address"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3">
        <CountrySelector
          label={countryLabel}
          callback={(e) => {
            setValue("postal_address.country", e);
          }}
        />

        <Input
          {...register("postal_address.city")}
          label={cityLabel}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("postal_address.zip")}
          label={zipLabel}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("postal_address.street")}
          label={streetLabel}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
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