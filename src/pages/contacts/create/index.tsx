import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage, useIntl } from "react-intl";
import { format } from "date-fns";
import {
  GitForkIcon,
  UserPenIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  MailIcon,
} from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";
import { Description, Title } from "@/components/typography/Step";
import UploadAvatar from "@/components/UploadAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import CountrySelector from "@/components/CountrySelector";
import { getInitials } from "@/utils";

import SwitchContactType from "./components/SwitchContactType";
import Preview from "./Preview";
import PageTitle from "@/components/typography/PageTitle";
import Upload from "@/components/Upload";

const formSchema = z.object({
  type: z.enum(["person", "company", "mint"]),
  node_id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),

  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  street: z.string().min(1),

  date_of_registration: z.string().min(1),
  country_of_registration: z.string().min(1),
  city_of_registration: z.string().min(1),
  registration_number: z.string().min(1),

  document_name: z.string().min(1),
  document_size: z.string().min(1),
});

function RequiredInformation({
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

  const { register, watch, trigger } = useFormContext();
  const watchRequiredValues = watch(["node_id", "name", "email"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["node_id", "name", "email"]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  const companyNameLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.companyName",
    defaultMessage: "Legal company name",
    description: "Label for company name input",
  });
  const personNameLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.personalName",
    defaultMessage: "Legal full name",
    description: "Label for personal name input",
  });

  const companyEmailLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.companyEmail",
    defaultMessage: "Company email",
    description: "Label for company email input",
  });
  const personEmailLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.personalEmail",
    defaultMessage: "Email address",
    description: "Label for personal email input",
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Title>
          <FormattedMessage
            id="contacts.create.requiredInformation.title"
            defaultMessage="Required"
            description="Title for create contact page"
          />
        </Title>
        <Description className="text-center mx-16">
          <FormattedMessage
            id="contacts.create.requiredInformation.description"
            defaultMessage="This information is required for bill counterparties"
            description="Description for create contact page"
          />
        </Description>
      </div>

      <div className="mx-auto">{switchContact}</div>

      <div className="flex flex-col gap-3">
        <Input
          {...register("node_id")}
          icon={<GitForkIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={intl.formatMessage({
            id: "contacts.create.requiredInformation.nodeId",
            defaultMessage: "Node ID",
            description: "Label for node ID input",
          })}
          required
        />
        <Input
          {...register("email")}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person" ? personEmailLabel : companyEmailLabel
          }
          required
        />
        <Input
          {...register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={contactType === "person" ? personNameLabel : companyNameLabel}
          required
        />
      </div>

      <Button
        className="mt-auto"
        onClick={moveToNextStep}
        disabled={!isDataValid}
      >
        <FormattedMessage
          id="contacts.create.requiredInformation.continue"
          defaultMessage="Continue"
          description="Continue button for create contact page"
        />
      </Button>
    </div>
  );
}

function PostalAddress({
  switchContact,
  moveToNextStep,
}: {
  switchContact: React.ReactNode;
  moveToNextStep: () => void;
}) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger, setValue } = useFormContext();
  const watchRequiredValues = watch(["country", "city", "zip", "street"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["country", "city", "zip", "street"]);

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
        <CountrySelector
          label={intl.formatMessage({
            id: "contacts.create.postalAddress.country",
            defaultMessage: "Country",
            description: "Label for country input",
          })}
          callback={(e) => {
            setValue("country", e);
          }}
        />
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

function OptionalInformation({
  contactType,
  switchContact,
  setProfilePicturePreview,
  moveToNextStep,
}: {
  contactType: "person" | "company" | "mint";
  switchContact: React.ReactNode;
  setProfilePicturePreview: (file: string) => void;
  moveToNextStep: () => void;
}) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const { register, watch, trigger, getValues, setValue } = useFormContext();
  const watchRequiredValues = watch([
    "date_of_registration",
    "country_of_registration",
    "city_of_registration",
    "registration_number",
    "document_name",
    "document_size",
  ]);

  const handleSavePreview = (previewUrl: string) => {
    setProfilePicturePreview(previewUrl); // Save the preview URL for later use
  };
  const avatarFallback = getInitials(getValues("name") as string);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger([
        "date_of_registration",
        "country_of_registration",
        "city_of_registration",
        "registration_number",
        "document_name",
        "document_size",
      ]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  const skipInformation = () => {
    [
      "date_of_registration",
      "country_of_registration",
      "city_of_registration",
      "registration_number",
      "document_name",
      "document_size",
    ].forEach((field) => {
      setValue(field, "");
    });
  };

  const companyRegistrationDateLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.dateOfRegistration",
    defaultMessage: "Date of registration",
    description: "Label for date of registration input",
  });
  const personBirthDateLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.dateOfBirth",
    defaultMessage: "Date of birth",
    description: "Label for date of birth input",
  });

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

  const companyCountryLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.countryOfRegistration",
    defaultMessage: "Country of registration",
    description: "Label for country of registration input",
  });
  const personCountryLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.countryOfBirth",
    defaultMessage: "Country of birth",
    description: "Label for country of birth input",
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

  const companyRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.registrationDocument",
    defaultMessage: "Registration document",
    description: "Label for registration document input",
  });
  const personRegistrationDocumentLabel = intl.formatMessage({
    id: "contacts.create.optionalInformation.registrationDocument",
    defaultMessage: "Identity document",
    description: "Label for registration document input",
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
        <div className="mb-5 mx-auto">
          <UploadAvatar
            name={avatarFallback}
            onSavePreview={handleSavePreview}
            label={intl.formatMessage({
              id: "Add photo",
              defaultMessage: "Add photo",
              description: "Label for avatar upload",
            })}
          />
        </div>

        <DatePicker
          label={
            contactType === "person"
              ? personBirthDateLabel
              : companyRegistrationDateLabel
          }
          value={{
            from: currentDate,
          }}
          mode="single"
          onChange={({ from }) => {
            // @ts-expect-error - TS doesn't know about the date object
            setCurrentDate(from);
            // @ts-expect-error - TS doesn't know about the date object
            setValue("date_of_registration", format(from, "dd-MMM-yyyy"));
          }}
        />
        <CountrySelector
          label={
            contactType === "person" ? personCountryLabel : companyCountryLabel
          }
          callback={(e) => {
            setValue("country_of_registration", e);
          }}
        />
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
        <Upload
          label={
            contactType === "person"
              ? personRegistrationDocumentLabel
              : companyRegistrationDocumentLabel
          }
          description="PDF, PNG or JPG (max. 5mb)"
          onAddFile={(file) => {
            setValue("document_name", file.name);
            setValue("document_size", Math.round(file.size / 1024).toString());
            console.log(file);

            console.log(getValues("document_name"));
            console.log(getValues("document_size"));
          }}
          onRemoveFile={() => {
            setValue("document_name", "");
            setValue("document_size", "");
          }}
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

export default function Create() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [contactType, setContactType] = useState<"person" | "company" | "mint">(
    "person"
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "person",
      node_id: "",
      name: "",
      email: "",
      country: "",
      city: "",
      zip: "",
      street: "",
      date_of_registration: "",
      country_of_registration: "",
      city_of_registration: "",
      registration_number: "",

      document_name: "",
      document_size: "",
    },
  });

  const moveToPreviousStep = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };
  const moveToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const changeContactType = (type: "person" | "company" | "mint") => {
    setContactType(type);
  };

  const contactTypeSwitch = (
    <SwitchContactType contactType={contactType} onChange={changeContactType} />
  );

  const steps = [
    <RequiredInformation
      contactType={contactType}
      switchContact={contactTypeSwitch}
      moveToNextStep={moveToNextStep}
    />,
    <PostalAddress
      switchContact={contactTypeSwitch}
      moveToNextStep={moveToNextStep}
    />,
    <OptionalInformation
      contactType={contactType}
      switchContact={contactTypeSwitch}
      setProfilePicturePreview={setProfilePicturePreview}
      moveToNextStep={() => {
        setIsPreview(true);
      }}
    />,
  ];

  return (
    <Page className="gap-5">
      <Topbar
        lead={
          <NavigateBack
            callBack={() => {
              if (currentStep !== 0) {
                moveToPreviousStep();

                return;
              }

              navigate(-1);
            }}
          />
        }
        middle={
          isPreview ? (
            <PageTitle>
              <FormattedMessage
                id="contacts.create.preview.title"
                defaultMessage="Preview"
                description="Title for contact creation preview"
              />
            </PageTitle>
          ) : (
            <StepIndicator
              totalSteps={steps.length}
              currentStep={currentStep}
            />
          )
        }
      />
      <FormProvider {...methods}>
        {isPreview ? (
          <Preview
            profilePicturePreview={profilePicturePreview}
            contactType={contactType}
          />
        ) : (
          steps[currentStep]
        )}
      </FormProvider>
    </Page>
  );
}
