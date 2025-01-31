import { useState, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIntl, FormattedMessage } from "react-intl";
import {
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  UserIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Description, Title } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import SectionTitle from "@/components/typography/SectionTitle";
import CountrySelector from "@/components/CountrySelector";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Property from "./components/Property";
import { messages } from "./components/messages";

function RequiredInformation({
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

function PostalAddress({ moveToNextStep }: { moveToNextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue } = useFormContext();
  const [isDataValid, setIsDataValid] = useState(false);

  const watchRequiredFields = watch(["country", "city", "address"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger(["country", "city", "address"]);

      setIsDataValid(isValid);
    };

    void validate();
  }, [watchRequiredFields, trigger]);

  return (
    <div className="flex-1 flex flex-col gap-11">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="identity.create.postalAddress.title"
            defaultMessage="Optional: postal address"
            description="Title for the postal address step"
          />
        </Title>
        <Description>
          <FormattedMessage
            id="identity.create.postalAddress.description"
            defaultMessage="These fields are only needed if you want to issue bills in your own name"
            description="Description for the postal address step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <CountrySelector
          label={f(messages["identity.country"])}
          callback={(country) => {
            setValue("country", country);
          }}
        />

        <Input
          {...register("city")}
          label={f(messages["identity.city"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("zip")}
          label={f(messages["identity.zip"])}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
        />

        <Input
          {...register("address")}
          label={f(messages["identity.address"])}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
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

function OptionalInformation({
  moveToNextStep,
}: {
  moveToNextStep: () => void;
}) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue } = useFormContext();
  const [isDataValid, setIsDataValid] = useState(false);

  const watchRequiredFields = watch([
    "country_of_birth",
    "city_of_birth",
    "identification_number",
  ]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger([
        "country_of_birth",
        "city_of_birth",
        "identification_number",
      ]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredFields, trigger]);

  const skipInformation = () => {
    ["country_of_birth", "city_of_birth", "identification_number"].forEach(
      (field) => {
        setValue(field, "");
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col gap-11">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="identity.create.optionalInformation.title"
            defaultMessage="Optional: other information"
            description="Title for the optional information step"
          />
        </Title>
        <Description>
          <FormattedMessage
            id="identity.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it to grow your credit score"
            description="Description for the optional information step"
          />
        </Description>
      </div>
      <div className="flex flex-col gap-3">
        <CountrySelector
          label={f(messages["identity.country_of_birth"])}
          callback={(country) => {
            setValue("country_of_birth", country);
          }}
        />

        <Input
          {...register("city_of_birth")}
          label={f(messages["identity.city_of_birth"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("identification_number")}
          label={f(messages["identity.identification_number"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
          <FormattedMessage
            id="identity.create.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button for optional information"
          />
        </Button>

        <Button variant="outline" size="md" onClick={skipInformation}>
          <FormattedMessage
            id="identity.create.optionalInformation.skip"
            defaultMessage="Skip"
            description="Skip button for optional information"
          />
        </Button>
      </div>
    </div>
  );
}

function Preview() {
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext();
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  const values = getValues();
  const address = `${values.address as string}${
    (values.zip as string) && ","
  } ${values.zip as string}, ${values.city as string}, ${
    values.country as string
  }`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="identity.create.preview.title"
            defaultMessage="Preview identity"
            description="Title for the identity preview step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="identity.create.preview.description"
            defaultMessage="Please check your personal data before signing"
            description="Description for the identity preview step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <SectionTitle>
          <FormattedMessage
            id="identity.create.preview.mainInformation"
            defaultMessage="Main information"
            description="Title for the main information section"
          />
        </SectionTitle>
        <div className="flex flex-col gap-3">
          <Property
            label={f(messages["identity.name"])}
            value={values.name as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.email"])}
            value={values.email as string}
          />
          <Separator className="bg-divider-75" />

          <Property label={f(messages["identity.address"])} value={address} />
        </div>
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <SectionTitle>
          <FormattedMessage
            id="identity.create.preview.optionalInformation"
            defaultMessage="Optional information"
            description="Title for the optional information section"
          />
        </SectionTitle>
        <div className="flex flex-col gap-3">
          <Property
            label={f(messages["identity.date_of_birth"])}
            value="12-Nov-1980"
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.country_of_birth"])}
            value={values.country_of_birth as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.city_of_birth"])}
            value={values.city_of_birth as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.identification_number"])}
            value={values.identification_number as string}
          />
          <Separator className="bg-divider-75" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-2 text-text-300 text-base font-medium -tracking-[0.32px]"
          onClick={() => {
            setHasAgreedToTerms(!hasAgreedToTerms);
          }}
        >
          <Checkbox size="md" checked={hasAgreedToTerms} />

          <span>
            <FormattedMessage
              id="identity.create.termsAndConditions"
              defaultMessage="I agree to the <span>Terms and conditions</span>"
              description="Terms and conditions agreement"
              values={{
                span: (text) => <span className="text-brand-200">{text}</span>,
              }}
            />
          </span>
        </div>

        <Button size="md" disabled={!hasAgreedToTerms}>
          <FormattedMessage
            id="identity.create.sign"
            defaultMessage="Sign"
            description="Label for the sign button"
          />
        </Button>
      </div>
    </div>
  );
}

const CreationFormSteps = {
  REQUIRED_INFORMATION: "REQUIRED_INFORMATION",
  POSTAL_ADDRESS: "POSTAL_ADDRESS",
  OPTIONAL_INFORMATION: "OPTIONAL_INFORMATION",
  PREVIEW: "PREVIEW",
} as const;

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().optional(),
  address: z.string().min(1),
  date_of_birth: z.string().min(1).optional(),
  country_of_birth: z.string().min(2).optional(),
  city_of_birth: z.string().min(1).optional(),
  identification_number: z.string().min(1).optional(),
});

export default function Create() {
  const [currentStep, setCurrentStep] = useState<
    keyof typeof CreationFormSteps
  >(CreationFormSteps.REQUIRED_INFORMATION);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      city: "",
      zip: "",
      address: "",
      date_of_birth: "",
      country_of_birth: "",
      city_of_birth: "",
      identification_number: "",
    },
  });

  const steps = {
    [CreationFormSteps.REQUIRED_INFORMATION]: (
      <RequiredInformation
        moveToNextStep={() => {
          setCurrentStep(CreationFormSteps.POSTAL_ADDRESS);
        }}
      />
    ),
    [CreationFormSteps.POSTAL_ADDRESS]: (
      <PostalAddress
        moveToNextStep={() => {
          setCurrentStep(CreationFormSteps.OPTIONAL_INFORMATION);
        }}
      />
    ),
    [CreationFormSteps.OPTIONAL_INFORMATION]: (
      <OptionalInformation
        moveToNextStep={() => {
          setCurrentStep(CreationFormSteps.PREVIEW);
        }}
      />
    ),
    [CreationFormSteps.PREVIEW]: <Preview />,
  };

  return (
    <Page>
      <Topbar lead={<NavigateBack />} />

      <FormProvider {...methods}>{steps[currentStep]}</FormProvider>
    </Page>
  );
}
