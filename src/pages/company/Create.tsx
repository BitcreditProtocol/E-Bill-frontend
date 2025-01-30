import { useState, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage, useIntl } from "react-intl";
import {
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Description, Title } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="company.create.requiredInformation.title"
            defaultMessage="Company identity"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="company.create.requiredInformation.description"
            defaultMessage="Please enter the required data to create a new company identity"
            description="Description for the required information step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <Input
          {...register("name")}
          label={f(messages["company.name"])}
          icon={<UserIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
        <Input
          {...register("email")}
          label={f(messages["company.email"])}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
        <FormattedMessage
          id="company.create.continue"
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
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="company.create.postalAddress.title"
            defaultMessage="Company postal address"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="company.create.postalAddress.description"
            defaultMessage="These fields are needed for bills in your company’s name"
            description="Description for the postal address step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <CountrySelector
          label={f(messages["company.country"])}
          callback={(country) => {
            setValue("country", country);
          }}
        />

        <Input
          {...register("city")}
          label={f(messages["company.city"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("zip")}
          label={f(messages["company.zip"])}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
        />

        <Input
          {...register("address")}
          label={f(messages["company.address"])}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
        <FormattedMessage
          id="company.create.continue"
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
    "country_of_registration",
    "city_of_registration",
    "registration_number",
  ]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger([
        "country_of_registration",
        "city_of_registration",
        "registration_number",
      ]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredFields, trigger]);

  const skipInformation = () => {
    [
      "country_of_registration",
      "city_of_registration",
      "registration_number",
    ].forEach((field) => {
      setValue(field, "");
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="company.create.optionalInformation.title"
            defaultMessage="Optional: other information"
            description="Title for the optional information step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="company.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it for your company's credit score"
            description="Description for the optional information step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3">
        <CountrySelector
          label={f(messages["company.country_of_registration"])}
          callback={(country) => {
            setValue("country_of_registration", country);
          }}
        />

        <Input
          {...register("city_of_registration")}
          label={f(messages["company.city_of_registration"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("registration_number")}
          label={f(messages["company.registration_number"])}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
          <FormattedMessage
            id="company.create.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button for optional information"
          />
        </Button>

        <Button variant="outline" size="md" onClick={skipInformation}>
          <FormattedMessage
            id="company.create.optionalInformation.skip"
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

  const values = getValues();
  const address = `${values.address as string}${
    (values.zip as string) && ","
  } ${values.zip as string}, ${values.city as string}, ${
    values.country as string
  }`;

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="company.preview.title"
            defaultMessage="Preview company"
            description="Title for the company preview step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="company.preview.description"
            defaultMessage="Please check your company data before signing"
            description="Description for the company preview step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={f(messages["company.email"])}
          value={values.email as string}
        />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["company.address"])} value={address} />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.registration_date"])}
          value="12-Nov-1980"
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.country_of_registration"])}
          value={values.country_of_registration as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.city_of_registration"])}
          value={values.city_of_registration as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.registration_number"])}
          value={values.registration_number as string}
        />
        <Separator className="bg-divider-75" />
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
  registration_date: z.string().min(1).optional(),
  country_of_registration: z.string().min(2).optional(),
  city_of_registration: z.string().min(1).optional(),
  registration_number: z.string().min(1).optional(),
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
      registration_date: "",
      country_of_registration: "",
      city_of_registration: "",
      registration_number: "",
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
