import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage, useIntl } from "react-intl";
import { format, parseISO } from "date-fns";
import {
  CalendarIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  PencilIcon,
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
import { DatePicker } from "@/components/DatePicker/datePicker";
import StepIndicator from "@/components/StepIndicator";
import Picture from "@/components/Picture";
import { COUNTRIES } from "@/constants/countries";
import routes from "@/constants/routes";
import { createCompany, uploadFile } from "@/services/company";
import { useToast } from "@/hooks/use-toast";
import SuccessIllustration from "@/assets/images/success-illustration.svg";
import { messages } from "./components/messages";

function LogoUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const { watch, setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("logo_file_upload_id", data.file_upload_id);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const logoImageObjectUrl = URL.createObjectURL(file);
      setPreview(logoImageObjectUrl);
      mutate(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative mx-auto cursor-pointer"
      onClick={triggerFileSelect}
    >
      <Picture
        size="lg"
        name={watch("name") as string}
        image={preview || ""}
        type={1}
      />
      <button className="relative bottom-6 left-12 flex items-center justify-center p-1.5 h-6 w-6 bg-brand-200 rounded-full">
        <PencilIcon className="text-white h-3 w-3 stroke-1" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

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
        <LogoUpload />

        <DatePicker
          mode="single"
          customComponent={
            <button className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {(watch("registration_date") &&
                format(
                  parseISO(watch("registration_date") as string),
                  "dd-MMM-yyyy"
                )) ||
                f(messages["company.registration_date"])}
            </button>
          }
          onChange={(date) => {
            setValue(
              "registration_date",
              format(date.from as unknown as string, "yyyy-MM-dd")
            );
          }}
        />

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

function Preview({ callback }: { callback: () => void }) {
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext();
  const { toast } = useToast();

  const values = getValues();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createCompany({
        name: values.name as string,
        email: values.email as string,
        country: values.country as string,
        city: values.city as string,
        zip: values.zip as string,
        address: values.address as string,
        registration_date: values.registration_date as string,
        country_of_registration: values.country_of_registration as string,
        city_of_registration: values.city_of_registration as string,
        registration_number: values.registration_number as string,
        logo_file_upload_id: values.logo_file_upload_id as string,
      });
    },
    onSuccess: () => {
      callback();
    },
    onError: () => {
      toast({
        title: f({ id: "company.create.error", defaultMessage: "Error!" }),
        description: f({
          id: "company.create.error",
          defaultMessage: "Error while creating company. Please try again.",
        }),
        position: "bottom-center",
      });
    },
  });

  const address = `${values.address as string}${
    (values.zip as string) && ","
  } ${values.zip as string}, ${values.city as string}, ${
    values.country as string
  }`;
  const countryOfRegistration = values.country_of_registration
    ? COUNTRIES[values.country_of_registration as keyof typeof COUNTRIES]
    : "";

  return (
    <div className="flex-1 flex flex-col justify-between gap-6">
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

      <div className="flex flex-col items-center gap-4">
        <Picture
          size="lg"
          name={getValues("name") as string}
          image={""}
          type={1}
        />
        <span className="text-text-300 text-xl font-medium leading-normal">
          {values.name}
        </span>
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
          value={values.registration_date as string}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.country_of_registration"])}
          value={countryOfRegistration}
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

      <Button
        size="md"
        onClick={() => {
          mutate();
        }}
        disabled={isPending}
      >
        <FormattedMessage
          id="company.create.sign"
          defaultMessage="Sign"
          description="Label for the sign button"
        />
      </Button>
    </div>
  );
}

function Success() {
  return (
    <div className="flex-1 flex flex-col items-center justify-between pt-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-text-300 text-2xl font-medium leading-8">
          <FormattedMessage
            id="company.create.success.title"
            defaultMessage="Success"
            description="Title for the company created step"
          />
        </h1>
        <span className="text-text-200 text-base font-normal leading-6 mx-6">
          <FormattedMessage
            id="company.create.success.description"
            defaultMessage="We have successfully created your company and can add other signers"
            description="Description for the company created step"
          />
        </span>
      </div>

      <img
        className="aspect-square max-w-52 pointer-events-none"
        src={SuccessIllustration}
        alt="Success illustration"
      />

      <Link className="w-full" to={routes.IDENTITY_LIST}>
        <Button className="w-full" size="md">
          <FormattedMessage
            id="company.create.success.finish"
            defaultMessage="Finish"
            description="Label for the finish button"
          />
        </Button>
      </Link>
    </div>
  );
}

const CreationFormSteps = {
  REQUIRED_INFORMATION: "REQUIRED_INFORMATION",
  POSTAL_ADDRESS: "POSTAL_ADDRESS",
  OPTIONAL_INFORMATION: "OPTIONAL_INFORMATION",
  PREVIEW: "PREVIEW",
  SUCCESS: "SUCCESS",
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
  logo_file_upload_id: z.string().optional(),
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
      logo_file_upload_id: "",
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
    [CreationFormSteps.PREVIEW]: (
      <Preview
        callback={() => {
          setCurrentStep(CreationFormSteps.SUCCESS);
        }}
      />
    ),
    [CreationFormSteps.SUCCESS]: <Success />,
  };

  const isSuccess = currentStep === CreationFormSteps.SUCCESS;

  return (
    <Page className="gap-5" displayBackgroundEllipse={isSuccess}>
      {!isSuccess && (
        <Topbar
          lead={<NavigateBack />}
          middle={
            <StepIndicator
              totalSteps={Object.keys(steps).length - 1}
              currentStep={Object.keys(CreationFormSteps).indexOf(currentStep)}
            />
          }
        />
      )}

      <FormProvider {...methods}>{steps[currentStep]}</FormProvider>
    </Page>
  );
}
