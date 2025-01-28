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
import PageTitle from "@/components/typography/PageTitle";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";
import { Description, Title } from "@/components/typography/Step";
import UploadAvatar from "@/components/UploadAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import CountrySelector from "@/components/CountrySelector";
import Upload from "@/components/Upload";
import { getInitials } from "@/utils";

import SwitchContactType from "./components/SwitchContactType";
import Preview from "./Preview";
import { messages } from "./components/messages";

const formSchema = z.object({
  type: z.enum(["person", "company", "mint"]),
  node_id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),

  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().optional(),
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
  const { formatMessage: f } = useIntl();
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
        {f(messages["contacts.company.cityOfRegistration"])}
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
          label={f(messages["contacts.nodeId"])}
          required
        />
        <Input
          {...register("email")}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.email"])
              : f(messages["contacts.company.email"])
          }
          required
        />
        <Input
          {...register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.name"])
              : f(messages["contacts.company.name"])
          }
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
  const { formatMessage: f } = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger, getValues, setValue } = useFormContext();
  const watchRequiredValues = watch(["country", "city", "street"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["country", "city", "street"]);

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
          label={f(messages["contacts.country"])}
          callback={(e) => {
            setValue("country", e);
          }}
          value={getValues("country") as string}
        />
        <Input
          {...register("city")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.city"])}
          required
        />
        <Input
          {...register("zip")}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.zipCode"])}
        />
        <Input
          {...register("street")}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.address"])}
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
  const { formatMessage: f } = useIntl();

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
            label={f({
              id: "Add photo",
              defaultMessage: "Add photo",
              description: "Label for avatar upload",
            })}
          />
        </div>

        <DatePicker
          label={
            contactType === "person"
              ? f(messages["contacts.person.dateOfBirth"])
              : f(messages["contacts.company.dateOfRegistration"])
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
            contactType === "person"
              ? f(messages["contacts.person.countryOfBirth"])
              : f(messages["contacts.company.countryOfRegistration"])
          }
          callback={(e) => {
            setValue("country_of_registration", e);
          }}
        />
        <Input
          {...register("city_of_registration")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.cityOfBirth"])
              : f(messages["contacts.company.cityOfRegistration"])
          }
        />
        <Input
          {...register("registration_number")}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.identityNumber"])
              : f(messages["contacts.company.registrationNumber"])
          }
        />
        <Upload
          label={
            contactType === "person"
              ? f(messages["contacts.person.identityDocument"])
              : f(messages["contacts.company.registrationDocument"])
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
