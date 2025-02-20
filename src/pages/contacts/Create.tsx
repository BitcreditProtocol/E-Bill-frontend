import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CalendarIcon,
  GitForkIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  PencilIcon,
  ShieldCheckIcon,
  UserPenIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";
import { Description, Title } from "@/components/typography/Step";
import Picture from "@/components/Picture";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import Upload, { UploadedFilePreview } from "@/components/Upload";
import { toast, useToast } from "@/hooks/use-toast";
import { createContact, uploadFile } from "@/services/contact_v2";
import { truncateString } from "@/utils/strings";
import routes from "@/constants/routes";
import { API_URL } from "@/constants/api";
import { GET_TEMP_FILE } from "@/constants/endpoints";
import { ContactTypes } from "@/types/contact";
import SwitchContactType from "./components/SwitchContactType";
import { Label, Value } from "./components/Typography";
import { messages, getMessage } from "./components/messages";

function ProfilePictureUpload() {
  const { formatMessage: f } = useIntl();
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

      setValue("avatar.has_selected", true);
      setValue("avatar.file_upload_id", data.file_upload_id);
      setValue("avatar.preview_url", previewUrl);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size >= 100 * 1024) {
        toast({
          title: f({
            id: "contact.create.file.error",
            defaultMessage: "Error",
          }),
          description: f({
            id: "contact.create.file.size.error",
            defaultMessage: "File size is too big. Max. 100kb allowed.",
          }),
          variant: "error",
          position: "bottom-center",
          duration: 1000,
        });

        return;
      }

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
        image={watch("avatar.preview_url") || ""}
        type={watch("type")}
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
  const { setValue, getValues } = useFormContext<FormSchema>();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("proof_document.has_selected", true);
      setValue("proof_document.file_upload_id", data.file_upload_id);
    },
  });

  const contactType = getValues("type");

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f(getMessage(contactType, "uploadDocument"))}
        description={f({
          id: "contacts.create.upload.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 100kb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);

          setValue("proof_document.name", file.name);
          setValue("proof_document.size", file.size);
        }}
        onRemoveFile={() => {
          setValue("proof_document.has_selected", false);
          setValue("proof_document.file_upload_id", null);
          setValue("proof_document.name", null);
          setValue("proof_document.size", null);
        }}
      />
    </div>
  );
}

const requiredInformationFormSchema = z.object({
  type: z.number(),
  node_id: z.string().min(1),
  email: z.string().min(1),
  name: z.string().min(1),
});

type RequiredInformationFormSchema = z.infer<
  typeof requiredInformationFormSchema
>;

function RequiredInformation({ nextStep }: { nextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue } =
    useFormContext<RequiredInformationFormSchema>();
  const [canContinue, setCanContinue] = useState(false);
  const watchValues = watch(["type", "node_id", "email", "name"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger(["type", "node_id", "email", "name"]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

  const contactType = watch("type");
  const changeContactType = (type: number) => {
    setValue("type", type);
  };

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

      <div className="mx-auto">
        <SwitchContactType
          contactType={contactType || ContactTypes.Person}
          onChange={changeContactType}
        />
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <Input
          {...register("node_id")}
          icon={<GitForkIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.nodeId"])}
          required
        />
        <Input
          {...register("email")}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "email"))}
          required
        />
        <Input
          {...register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "name"))}
          required
        />
      </div>

      <Button size="md" disabled={!canContinue} onClick={nextStep}>
        <FormattedMessage
          id="contacts.create.continue"
          defaultMessage="Continue"
          description="Button to go to next step in contact creation"
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
  const watchValues = watch(["country", "city", "zip", "address"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger(["country", "city", "zip", "address"]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

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

      <div className="flex flex-col gap-3 mb-auto">
        <CountrySelector
          label={f(messages["contacts.country"])}
          callback={(country) => {
            setValue("country", country);
          }}
          value={watch("country") || undefined}
          required
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
          {...register("address")}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.address"])}
          required
        />
      </div>

      <Button size="md" disabled={!canContinue} onClick={nextStep}>
        <FormattedMessage
          id="contacts.create.continue"
          defaultMessage="Continue"
          description="Button to go to next step in contact creation"
        />
      </Button>
    </div>
  );
}

const optionalInformationFormSchema = z.object({
  date_of_birth_or_registration: z.string().optional().nullable(),
  country_of_birth_or_registration: z.string().optional().nullable(),
  city_of_birth_or_registration: z.string().optional().nullable(),
  identification_number: z.string().optional().nullable(),
  avatar: z.object({
    has_selected: z.boolean(),
    preview_url: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
  proof_document: z.object({
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

  const contactType = useWatch<FormSchema, "type">({ name: "type" });
  const watchValues = watch([
    "date_of_birth_or_registration",
    "country_of_birth_or_registration",
    "city_of_birth_or_registration",
    "identification_number",
  ]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger([
        "date_of_birth_or_registration",
        "country_of_birth_or_registration",
        "city_of_birth_or_registration",
        "identification_number",
      ]);

      setCanContinue(isValid);
    };

    void validate();
  }, [watchValues, trigger]);

  const skip = () => {
    reset((prev) => ({
      ...prev,
      date_of_birth_or_registration: null,
      country_of_birth_or_registration: null,
      city_of_birth_or_registration: null,
      identification_number: null,
      avatar: {
        has_selected: false,
        preview_url: null,
        file_upload_id: null,
      },
      proof_document: {
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

      <ProfilePictureUpload />

      <div className="flex flex-col gap-3 mb-auto">
        <DatePicker
          mode="single"
          label={f(getMessage(contactType, "date"))}
          customComponent={
            <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg cursor-pointer">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {watch("date_of_birth_or_registration") ||
                f(getMessage(contactType, "date"))}
            </div>
          }
          onChange={({ from }) => {
            setValue(
              "date_of_birth_or_registration",
              // @ts-expect-error - TS doesn't know about the date object
              format(from, "yyyy-MM-dd")
            );
          }}
        />
        <CountrySelector
          label={f(getMessage(contactType, "country"))}
          callback={(country) => {
            setValue("country_of_birth_or_registration", country);
          }}
          value={watch("country_of_birth_or_registration") || undefined}
        />
        <Input
          {...register("city_of_birth_or_registration")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "city"))}
        />
        <Input
          {...register("identification_number")}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "identificationNumber"))}
        />
        <DocumentFileUpload />
      </div>

      <div className="flex flex-col gap-2">
        <Button size="md" disabled={!canContinue} onClick={nextStep}>
          <FormattedMessage
            id="contacts.create.continue"
            defaultMessage="Continue"
            description="Button to go to next step in contact creation"
          />
        </Button>
        <Button variant="outline" size="md" onClick={skip}>
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

const formSchema = requiredInformationFormSchema
  .merge(postalAddressFormSchema)
  .merge(optionalInformationFormSchema);

type FormSchema = z.infer<typeof formSchema>;

function Property({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode | string | null;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {value !== null ? (
        typeof value === "string" && value !== "" ? (
          <Value>{value}</Value>
        ) : (
          value
        )
      ) : (
        "-"
      )}
    </div>
  );
}

function Preview() {
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext<FormSchema>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    type,
    node_id,
    name,
    email,
    country,
    city,
    zip,
    address,
    date_of_birth_or_registration,
    country_of_birth_or_registration,
    city_of_birth_or_registration,
    identification_number,
    avatar,
    proof_document,
  } = getValues();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createContact({
        type,
        node_id,
        name,
        email,
        country,
        city,
        zip,
        address,
        date_of_birth_or_registration: date_of_birth_or_registration || null,
        country_of_birth_or_registration:
          country_of_birth_or_registration || null,
        city_of_birth_or_registration: city_of_birth_or_registration || null,
        identification_number: identification_number || null,
        avatar_file_upload_id: avatar.file_upload_id,
        proof_document_file_upload_id: proof_document.file_upload_id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      toast({
        title: f({
          id: "contacts.create.success",
          defaultMessage: "Success!",
          description: "Contact created successfully toast message",
        }),
        description: f({
          id: "contacts.create.success.description",
          defaultMessage: "Contact created successfully!",
          description: "Contact created successfully toast message",
        }),
        position: "bottom-center",
      });

      navigate(routes.CONTACTS);
    },
    onError: () => {
      toast({
        title: f({
          id: "contacts.create.error",
          defaultMessage: "Error!",
          description: "Error while creating contact toast message",
        }),
        description: f({
          id: "contacts.create.error.description",
          defaultMessage:
            "An error occurred while creating the contact. Please, try again.",
          description: "Error while creating contact toast message",
        }),
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <Picture
          type={type}
          name={name}
          image={avatar.preview_url || ""}
          size="lg"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-300 text-xl font-medium leading-normal">
              {name}
            </span>

            <div className="flex items-center justify-center gap-1">
              <span className="text-text-200 text-xs font-normal leading-normal">
                {truncateString(node_id, 14)}
              </span>
              <CopyToClipboardButton value={node_id} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={f(getMessage(type, "email"))}
          value={getValues("email")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["contacts.address"])}
          value={getValues("address")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(getMessage(type, "date"))}
          value={getValues("date_of_birth_or_registration")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(getMessage(type, "country"))}
          value={getValues("country_of_birth_or_registration")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(getMessage(type, "city"))}
          value={getValues("city_of_birth_or_registration")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(getMessage(type, "identificationNumber"))}
          value={getValues("identification_number")}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(getMessage(type, "document"))}
          value={
            !proof_document.has_selected ? (
              "-"
            ) : (
              <UploadedFilePreview
                name={proof_document.name ?? "-"}
                size={proof_document.size ?? 0}
              />
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
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

export default function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 0,
      node_id: "",
      name: "",
      country: "",
      city: "",
      zip: "",
      address: "",
      date_of_birth_or_registration: null,
      country_of_birth_or_registration: null,
      city_of_birth_or_registration: null,
      identification_number: null,
      avatar: {
        has_selected: false,
        preview_url: null,
        file_upload_id: null,
      },
      proof_document: {
        has_selected: false,
        name: null,
        size: null,
        file_upload_id: null,
      },
    },
  });

  const previousStep = () => {
    setStep((prev) => {
      if (prev === 0) {
        navigate(routes.CONTACTS);
      }

      return prev - 1;
    });
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack callBack={previousStep} />}
        middle={<StepIndicator totalSteps={3} currentStep={step} />}
      />

      <FormProvider {...methods}>
        {step === 0 && <RequiredInformation nextStep={nextStep} />}
        {step === 1 && <PostalAddress nextStep={nextStep} />}
        {step === 2 && <OptionalInformation nextStep={nextStep} />}
        {step === 3 && <Preview />}
      </FormProvider>
    </Page>
  );
}
