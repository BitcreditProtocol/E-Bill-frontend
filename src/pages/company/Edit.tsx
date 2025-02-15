import { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CalendarIcon,
  CopyIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  PencilIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import Page from "@/components/wrappers/Page";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import Upload, { UploadedFilePreview } from "@/components/Upload";
import Picture from "@/components/Picture";
import { useIdentity } from "@/context/identity/IdentityContext";
import { editCompany, getCompanyDetails, uploadFile } from "@/services/company";
import { truncateString } from "@/utils/strings";
import { copyToClipboard } from "@/utils";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/constants/api";
import { GET_COMPANY_FILE, GET_TEMP_FILE } from "@/constants/endpoints";
import routes from "@/constants/routes";
import { messages } from "./components/messages";

function Loader() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
      <Skeleton className="h-10 w-full bg-elevation-200" />
    </div>
  );
}

function EditProfilePicture() {
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

      setValue("avatar.file_upload_id", data.file_upload_id);
      setValue("avatar.preview_url", previewUrl);
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
      className="relative h-fit mx-auto cursor-pointer"
      onClick={triggerFileSelect}
    >
      <Picture
        size="lg"
        name={watch("name")}
        image={watch("avatar.preview_url") || ""}
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

  avatar: z.object({
    preview_url: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
  document_file: z.object({
    hasFile: z.boolean(),
    name: z.string().optional(),
    file_upload_id: z.string().optional().nullable(),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function Form({ companyId }: { companyId: string }) {
  const navigate = useNavigate();
  const [isDataValid, setIsDataValid] = useState(false);
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryKey: ["company", "details", companyId],
    queryFn: () => getCompanyDetails(companyId),
  });

  const avatarPreviewUrl = data.logo_file?.name
    ? `${API_URL}/${GET_COMPANY_FILE.replace(
        ":node_id/:name",
        data.id + "/" + data.logo_file.name
      )}`
    : "";

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      country: data.country,
      city: data.city,
      zip: data.zip,
      address: data.address,
      registration_date: data.registration_date,
      country_of_registration: data.country_of_registration,
      city_of_registration: data.city_of_registration,
      registration_number: data.registration_number,

      avatar: {
        preview_url: avatarPreviewUrl,
        file_upload_id: "",
      },
      document_file: {
        hasFile: data.proof_of_registration_file?.name ? true : false,
        name: data.proof_of_registration_file?.name,
        file_upload_id: "",
      },
    },
  });

  const watchRequiredFields = methods.watch([
    "name",
    "email",
    "country",
    "city",
    "address",
  ]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await methods.trigger([
        "name",
        "email",
        "country",
        "city",
        "address",
      ]);

      setIsDataValid(isValid);
    };

    void validate();
  }, [watchRequiredFields, methods]);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return editCompany({
        id: companyId,
        ...methods.getValues(),
        proof_of_registration_file_upload_id:
          methods.getValues("document_file").file_upload_id,
        logo_file_upload_id: methods.getValues("avatar").file_upload_id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["company", "details", companyId],
      });

      toast({
        description: f({
          id: "company.edit.success",
          defaultMessage: "Company information updated with success",
          description: "Edit company success toast",
        }),
        position: "bottom-center",
        duration: 1000,
      });

      setTimeout(() => {
        navigate(routes.VIEW_COMPANY);
      }, 1000);
    },
  });

  const { mutate: mutateFileUpload } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (fileData) => {
      methods.setValue("document_file.file_upload_id", fileData.file_upload_id);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <div className="flex flex-col items-center gap-2">
          <EditProfilePicture />

          <span className="text-text-300 text-xl font-medium leading-[30px]">
            {data.name}
          </span>

          <div className="flex items-center gap-1">
            <span className="text-text-200 text-xs font-normal leading-[18px]">
              {truncateString(data.id, 12)}
            </span>

            <button
              className="flex items-center justify-center p-0"
              onClick={() => {
                void copyToClipboard(data.id, () => {
                  toast({
                    description: "Copied to clipboard",
                    position: "bottom-center",
                    duration: 750,
                  });
                });
              }}
            >
              <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            {...methods.register("name")}
            label={f(messages["company.name"])}
            icon={<UserIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />
          <Input
            {...methods.register("email")}
            label={f(messages["company.email"])}
            icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />
          <CountrySelector
            label={f(messages["company.country"])}
            callback={(country) => {
              methods.setValue("country", country);
            }}
            value={methods.watch("country")}
            required
          />
          <Input
            {...methods.register("city")}
            label={f(messages["company.city"])}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />
          <Input
            {...methods.register("zip")}
            label={f(messages["company.zip"])}
            icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          />

          <Input
            {...methods.register("address")}
            label={f(messages["company.address"])}
            icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />

          <DatePicker
            mode="single"
            customComponent={
              <button className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg">
                <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
                {(methods.watch("registration_date") &&
                  format(
                    parseISO(methods.watch("registration_date")),
                    "dd-MMM-yyyy"
                  )) ||
                  f(messages["company.registration_date"])}
              </button>
            }
            onChange={(date) => {
              methods.setValue(
                "registration_date",
                format(date.from as unknown as string, "yyyy-MM-dd")
              );
            }}
          />

          <CountrySelector
            label={f(messages["company.country_of_registration"])}
            callback={(country) => {
              methods.setValue("country_of_registration", country);
            }}
            value={methods.watch("country_of_registration")}
          />
          <Input
            {...methods.register("city_of_registration")}
            label={f(messages["company.city_of_registration"])}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          />

          <Input
            {...methods.register("registration_number")}
            label={f(messages["company.registration_number"])}
            icon={
              <ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />
            }
          />

          {methods.watch("document_file.hasFile") ? (
            <div
              onClick={() => {
                methods.setValue("document_file.hasFile", false);
              }}
            >
              <UploadedFilePreview
                name={methods.watch("document_file.name") || ""}
              />
            </div>
          ) : (
            <Upload
              label={f({
                id: "company.edit.file.upload",
                defaultMessage: "Upload document",
                description: "Upload document label",
              })}
              description={f({
                id: "company.edit.file.upload.acceptedFormats",
                defaultMessage: "PDF, PNG or JPG (max. 100kb)",
                description: "Accepted file formats",
              })}
              onAddFile={(file) => {
                mutateFileUpload(file);

                methods.setValue("document_file.hasFile", true);
                methods.setValue("document_file.name", file.name);
              }}
              onRemoveFile={() => {
                methods.setValue("document_file.hasFile", false);
                methods.setValue("document_file.name", "");
              }}
            />
          )}
        </div>
      </FormProvider>

      <div className="flex items-center gap-3 py-4 mt-2">
        <Button
          className="w-full"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => {
            navigate(routes.VIEW_COMPANY);
          }}
        >
          <FormattedMessage
            id="company.edit.cancel"
            defaultMessage="Cancel"
            description="Edit company cancel button"
          />
        </Button>
        <Button
          className="w-full"
          size="sm"
          onClick={() => {
            mutate();
          }}
          disabled={!isDataValid || isPending}
        >
          <FormattedMessage
            id="company.edit.save"
            defaultMessage="Save"
            description="Edit company save button"
          />
        </Button>
      </div>
    </div>
  );
}

export default function Edit() {
  const { activeIdentity } = useIdentity();

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="company.edit.title"
              defaultMessage="Edit company identity"
              description="Edit company page title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Form companyId={activeIdentity.node_id} />
      </Suspense>
    </Page>
  );
}
