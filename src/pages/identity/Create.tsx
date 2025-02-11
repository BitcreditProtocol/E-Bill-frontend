import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useIntl, FormattedMessage } from "react-intl";
import {
  CalendarIcon,
  CircleCheckIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  PencilIcon,
  UserIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Description, Title } from "@/components/typography/Step";
import StepIndicator from "@/components/StepIndicator";
import { Input } from "@/components/ui/input";
import SectionTitle from "@/components/typography/SectionTitle";
import CountrySelector from "@/components/CountrySelector";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Picture from "@/components/Picture";
import { DatePicker } from "@/components/DatePicker/datePicker";
import Upload from "@/components/Upload";
import { useToast } from "@/hooks/use-toast";
import { createIdentity, uploadFile } from "@/services/identity_v2";
import routes from "@/constants/routes";
import SuccessIllustration from "@/assets/success-illustration.svg";
import Property from "./components/Property";
import { messages } from "./components/messages";

function ProfilePictureUpload() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("profile_picture_file_upload_id", data.file_upload_id);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const logoImageObjectUrl = URL.createObjectURL(file);
      setValue("profile_picture_preview_url", logoImageObjectUrl);
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
        image={watch("profile_picture_preview_url") || ""}
        type={0}
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

function UploadIdentityDocumentFile() {
  const { formatMessage: f } = useIntl();
  const { setValue } = useFormContext<FormSchema>();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("identity_document_file_upload_id", data.file_upload_id);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f({
          id: "identity.create.upload.document",
          defaultMessage: "Upload identity document",
          description: "Upload identity document label",
        })}
        description={f({
          id: "identity.create.upload.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 5mb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);
          setValue("identity_document_file_metadata", {
            name: file.name,
            size: file.size,
          });
        }}
        onRemoveFile={() => {
          setValue("identity_document_file_upload_id", "");
          setValue("identity_document_file_metadata", undefined);
        }}
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
    [
      "date_of_birth",
      "country_of_birth",
      "city_of_birth",
      "identification_number",
    ].forEach((field) => {
      setValue(field, "");
    });

    setValue("profile_picture_preview_url", null);
    setValue("profile_picture_file_upload_id", null);
    setValue("identity_document_file_upload_id", null);
    setValue("identity_document_file_metadata", null);

    moveToNextStep();
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
        <Description className="text-center mx-10">
          <FormattedMessage
            id="identity.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it to grow your credit score"
            description="Description for the optional information step"
          />
        </Description>
      </div>
      <div className="flex flex-col gap-3">
        <ProfilePictureUpload />

        <DatePicker
          mode="single"
          customComponent={
            <button className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {(watch("date_of_birth") &&
                format(
                  parseISO(watch("date_of_birth") as string),
                  "dd-MMM-yyyy"
                )) ||
                f(messages["identity.date_of_birth"])}
            </button>
          }
          onChange={(date) => {
            setValue(
              "date_of_birth",
              format(date.from as unknown as string, "yyyy-MM-dd")
            );
          }}
        />

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

        <UploadIdentityDocumentFile />
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

function Preview({ moveToNextStep }: { moveToNextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext<FormSchema>();
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const values = getValues();
  const address = `${values.address}, ${values.zip as string}, ${
    values.city
  }, ${values.country}`;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createIdentity({
        name: values.name,
        email: values.email,
        country: values.country,
        city: values.city,
        zip: values.zip || "",
        address: values.address,
        date_of_birth: values.date_of_birth || "",
        country_of_birth: values.country_of_birth || "",
        city_of_birth: values.city_of_birth || "",
        identification_number: values.identification_number || "",
        profile_picture_file_upload_id:
          values.profile_picture_file_upload_id || null,
        identity_document_file_upload_id:
          values.identity_document_file_upload_id || null,
      }),
    onSuccess: () => {
      toast({
        title: f({
          id: "identity.create.preview.success",
          defaultMessage: "Success!",
          description: "Success toast title",
        }),
        description: f({
          id: "identity.create.preview.success",
          defaultMessage: "Identity created successfully",
          description: "Success toast description",
        }),
        position: "bottom-center",
      });

      setTimeout(() => {
        moveToNextStep();
      }, 2000);
    },
    onError: () => {
      toast({
        title: f({
          id: "identity.create.preview.error",
          defaultMessage: "Error",
          description: "Error toast title",
        }),
        description: f({
          id: "identity.create.preview.error.description",
          defaultMessage:
            "Error while creating identity. Please review the information and try again.",
          description: "Error toast description",
        }),
        position: "bottom-center",
      });
    },
  });

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
          <Property label={f(messages["identity.name"])} value={values.name} />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.email"])}
            value={values.email}
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
          <Picture
            size="lg"
            name={values.name}
            image={values.profile_picture_preview_url as string}
            type={0}
          />

          <Property
            label={f(messages["identity.date_of_birth"])}
            value={values.date_of_birth as string}
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

          <Property
            label={f(messages["identity.personal.identity_file"])}
            value={
              values.identity_document_file_metadata ? (
                <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <span className="max-w-32 text-text-300 text-sm font-medium leading-5 truncate">
                      {values.identity_document_file_metadata.name}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-[18px]">
                      {Math.round(
                        values.identity_document_file_metadata.size / 1024
                      )}{" "}
                      KB
                    </span>
                    <CircleCheckIcon
                      className="h-4 w-4 text-signal-success"
                      strokeWidth={1}
                    />
                  </div>
                </div>
              ) : (
                "-"
              )
            }
          />
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

        <Button
          size="md"
          disabled={!hasAgreedToTerms || isPending}
          onClick={() => {
            mutate();
          }}
        >
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

function Success() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-12 justify-center h-full">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-text-300 text-2xl font-medium text-center leading-8 mb-0 mx-6">
            <FormattedMessage
              id="Successfully created your identity"
              defaultMessage="Successfully created your identity"
              description="Header copy for Success page"
            />
          </h1>

          <span className="text-text-200 text-base font-normal text-center leading-normal">
            <FormattedMessage
              id="identity.create.success.description"
              defaultMessage="You have successfully created your identity and can now use the app"
              description="Subheader copy for success page"
            />
          </span>
        </div>

        <img
          src={SuccessIllustration}
          alt="Success"
          className="aspect-square max-w-[220px] mx-auto pointer-events-none"
        />
      </div>
      <Link to={routes.HOME}>
        <Button size="md">
          <FormattedMessage
            id="identity.create.finish"
            defaultMessage="Finish"
            description="Action to enter the app after finishing the onboarding"
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
  date_of_birth: z.string().min(1).optional(),
  country_of_birth: z.string().min(2).optional(),
  city_of_birth: z.string().min(1).optional(),
  identification_number: z.string().min(1).optional(),

  profile_picture_preview_url: z.string().optional(),
  profile_picture_file_upload_id: z.string().optional(),
  identity_document_file_upload_id: z.string().optional(),
  identity_document_file_metadata: z
    .object({
      name: z.string(),
      size: z.number(),
    })
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Create() {
  const [currentStep, setCurrentStep] = useState<
    keyof typeof CreationFormSteps
  >(CreationFormSteps.REQUIRED_INFORMATION);

  const methods = useForm<FormSchema>({
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

      profile_picture_preview_url: "",
      profile_picture_file_upload_id: "",
      identity_document_file_upload_id: "",
      identity_document_file_metadata: undefined,
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
        moveToNextStep={() => {
          setCurrentStep(CreationFormSteps.SUCCESS);
        }}
      />
    ),
    [CreationFormSteps.SUCCESS]: <Success />,
  };

  return (
    <Page
      className="gap-10"
      displayBackgroundEllipse={currentStep === CreationFormSteps.SUCCESS}
    >
      <Topbar
        lead={
          <NavigateBack
            callBack={() => {
              if (currentStep === CreationFormSteps.REQUIRED_INFORMATION) {
                // Go back to the previous page
              } else {
                setCurrentStep(
                  Object.keys(CreationFormSteps)[
                    Object.keys(CreationFormSteps).indexOf(currentStep) - 1
                  ] as keyof typeof CreationFormSteps
                );
              }
            }}
          />
        }
        middle={
          <StepIndicator
            totalSteps={Object.keys(CreationFormSteps).length}
            currentStep={Object.keys(CreationFormSteps).indexOf(currentStep)}
          />
        }
      />

      <FormProvider {...methods}>{steps[currentStep]}</FormProvider>
    </Page>
  );
}
