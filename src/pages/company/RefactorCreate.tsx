import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
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
import { DatePicker } from "@/components/DatePicker/datePicker";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import Picture from "@/components/Picture";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/constants/api";
import { GET_TEMP_FILE } from "@/constants/endpoints";
import routes from "@/constants/routes";
import { COUNTRIES } from "@/constants/countries";
import { createCompany, uploadFile } from "@/services/company";
import SuccessIllustration from "@/assets/images/success-illustration.svg";
import { messages } from "./components/messages";
import Property from "./components/Property";

function LogoPictureUpload() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      const previewUrl = `${API_URL}/${GET_TEMP_FILE.replace(
        ":file_id",
        data.file_upload_id
      )}`;

      setValue("logo.has_selected", true);
      setValue("logo.file_upload_id", data.file_upload_id);
      setValue("logo.preview_url", previewUrl);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
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
        name={watch("name")}
        image={watch("logo.preview_url") || ""}
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

function DocumentFileUpload() {
  const { formatMessage: f } = useIntl();
  const { setValue } = useFormContext<FormSchema>();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("proof_of_registration.has_selected", true);
      setValue("proof_of_registration.file_upload_id", data.file_upload_id);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f({
          id: "company.create.upload",
          defaultMessage: "Upload registration document",
          description: "Proof of registration upload label",
        })}
        description={f({
          id: "company.create.upload.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 5mb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);

          setValue("proof_of_registration.name", file.name);
          setValue("proof_of_registration.size", file.size);
        }}
        onRemoveFile={() => {
          setValue("proof_of_registration.has_selected", false);
          setValue("proof_of_registration.file_upload_id", null);
          setValue("proof_of_registration.name", null);
          setValue("proof_of_registration.size", null);
        }}
      />
    </div>
  );
}

const requiredInformationFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
});

type RequiredInformationFormSchema = z.infer<
  typeof requiredInformationFormSchema
>;

function RequiredInformation({ nextStep }: { nextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger } =
    useFormContext<RequiredInformationFormSchema>();

  const [canContinue, setCanContinue] = useState(false);
  const watchValues = watch(["name", "email"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger(["name", "email"]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

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

      <Button size="md" disabled={!canContinue} onClick={nextStep}>
        <FormattedMessage
          id="company.create.continue"
          defaultMessage="Continue"
          description="Label for the continue to next step button"
        />
      </Button>
    </div>
  );
}

const postalAddressFormSchema = z.object({
  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().nullable(),
  address: z.string().min(1),
});

type PostalAddressFormSchema = z.infer<typeof postalAddressFormSchema>;

function PostalAddress({ nextStep }: { nextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue } =
    useFormContext<PostalAddressFormSchema>();
  const [canContinue, setCanContinue] = useState(false);

  const watchValues = watch(["country", "city", "address"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger(["country", "city", "address"]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

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
          value={watch("country") || undefined}
          required
        />

        <Input
          {...register("city")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["company.city"])}
          required
        />
        <Input
          {...register("zip")}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["company.zip"])}
        />
        <Input
          {...register("address")}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["company.address"])}
          required
        />
      </div>

      <Button size="md" disabled={!canContinue} onClick={nextStep}>
        <FormattedMessage
          id="company.create.continue"
          defaultMessage="Continue"
          description="Label for the continue to next step button"
        />
      </Button>
    </div>
  );
}

const optionalInformationFormSchema = z.object({
  registration_date: z.string().optional().nullable(),
  country_of_registration: z.string().optional().nullable(),
  city_of_registration: z.string().optional().nullable(),
  registration_number: z.string().optional().nullable(),
  logo: z.object({
    has_selected: z.boolean(),
    preview_url: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
  proof_of_registration: z.object({
    has_selected: z.boolean(),
    name: z.string().optional().nullable(),
    size: z.number().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
});

type OptionalInformationFormSchema = z.infer<
  typeof optionalInformationFormSchema
>;

function OptionalInformation({ nextStep }: { nextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue, reset } =
    useFormContext<OptionalInformationFormSchema>();
  const [canContinue, setCanContinue] = useState(false);

  const watchValues = watch([
    "registration_date",
    "country_of_registration",
    "city_of_registration",
    "registration_number",
  ]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger([
        "registration_date",
        "country_of_registration",
        "city_of_registration",
        "registration_number",
      ]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

  const skip = () => {
    reset((prev) => ({
      ...prev,
      registration_date: null,
      country_of_registration: null,
      city_of_registration: null,
      registration_number: null,
      logo: {
        has_selected: false,
        preview_url: null,
        file_upload_id: null,
      },
      proof_of_registration: {
        has_selected: false,
        name: null,
        size: null,
        file_upload_id: null,
      },
    }));

    nextStep();
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
        <Description className="text-center mx-8">
          <FormattedMessage
            id="company.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it for your company's credit score"
            description="Description for the optional information step"
          />
        </Description>
      </div>

      <LogoPictureUpload />

      <div className="flex flex-col gap-3 mb-auto">
        <DatePicker
          mode="single"
          customComponent={
            <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg cursor-pointer">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {watch("registration_date") ||
                f(messages["company.registration_date"])}
            </div>
          }
          onChange={({ from }) => {
            setValue(
              "registration_date",
              // @ts-expect-error - TS doesn't know about the date object
              format(from, "yyyy-MM-dd")
            );
          }}
        />
        <CountrySelector
          label={f(messages["company.country_of_registration"])}
          callback={(country) => {
            setValue("country_of_registration", country);
          }}
          value={watch("country_of_registration") || undefined}
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
        <DocumentFileUpload />
      </div>

      <div className="flex flex-col gap-2">
        <Button size="md" disabled={!canContinue} onClick={nextStep}>
          <FormattedMessage
            id="company.create.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button for optional information"
          />
        </Button>
        <Button variant="outline" size="md" onClick={skip}>
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

function Preview({ nextStep }: { nextStep: () => void }) {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext<FormSchema>();
  const { toast } = useToast();

  const {
    name,
    email,
    country,
    city,
    zip,
    address,
    country_of_registration,
    city_of_registration,
    registration_number,
    registration_date,
    logo,
    proof_of_registration,
  } = getValues();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createCompany({
        name: name,
        email: email,
        country: country,
        city: city,
        zip: zip || "",
        address: address,
        registration_date: registration_date || null,
        country_of_registration: country_of_registration || null,
        city_of_registration: city_of_registration || null,
        registration_number: registration_number || null,
        logo_file_upload_id: logo.file_upload_id || null,
        proof_of_registration_file_upload_id:
          proof_of_registration.file_upload_id || null,
      });
    },
    onSuccess: () => {
      nextStep();
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

  const combinedAddress =
    [address, zip, city, COUNTRIES[country as keyof typeof COUNTRIES]]
      .filter(Boolean)
      .join(", ") || "-";

  const parsedCountryOfRegistrationName =
    COUNTRIES[country_of_registration as keyof typeof COUNTRIES];

  return (
    <div className="flex flex-col gap-6">
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
          name={name}
          image={logo.preview_url || ""}
          type={1}
        />
        <span className="text-text-300 text-xl font-medium leading-normal">
          {name}
        </span>
      </div>

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property label={f(messages["company.email"])} value={email} />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.address"])}
          value={combinedAddress}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.registration_date"])}
          value={registration_date}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.country_of_registration"])}
          value={parsedCountryOfRegistrationName}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.city_of_registration"])}
          value={city_of_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["company.registration_number"])}
          value={registration_number}
        />
        <Separator className="bg-divider-75" />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button
          size="md"
          onClick={() => {
            mutate();
          }}
          disabled={isPending}
        >
          <FormattedMessage
            id="contacts.create.preview.save"
            defaultMessage="Save"
            description="Save contact button"
          />
        </Button>

        <Button
          size="md"
          variant="outline"
          onClick={() => {
            navigate(routes.CONTACTS);
          }}
          disabled={isPending}
        >
          <FormattedMessage
            id="contacts.create.preview.cancel"
            defaultMessage="Cancel"
            description="Cancel contact creation button"
          />
        </Button>
      </div>
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

const formSchema = requiredInformationFormSchema
  .merge(postalAddressFormSchema)
  .merge(optionalInformationFormSchema);

type FormSchema = z.infer<typeof formSchema>;

export default function Create() {
  const [step, setStep] = useState(0);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      city: "",
      zip: "",
      address: "",
      registration_date: null,
      country_of_registration: null,
      city_of_registration: "",
      registration_number: "",
      logo: {
        has_selected: false,
        preview_url: null,
        file_upload_id: null,
      },
      proof_of_registration: {
        has_selected: false,
        name: null,
        size: null,
        file_upload_id: null,
      },
    },
  });

  const previousStep = () => {
    setStep((prev) => {
      if (prev === 0) return 0;

      return prev - 1;
    });
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Page className="gap-5">
      <Topbar lead={<NavigateBack callBack={previousStep} />} />

      <FormProvider {...methods}>
        {step === 0 && <RequiredInformation nextStep={nextStep} />}
        {step === 1 && <PostalAddress nextStep={nextStep} />}
        {step === 2 && <OptionalInformation nextStep={nextStep} />}
        {step === 3 && <Preview nextStep={nextStep} />}
        {step === 4 && <Success />}
      </FormProvider>
    </Page>
  );
}
