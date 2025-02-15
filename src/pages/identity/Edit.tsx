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
import { FormattedMessage, useIntl } from "react-intl";
import {
  UserPenIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  MailIcon,
  ShieldCheckIcon,
  PencilIcon,
  CopyIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Picture from "@/components/Picture";
import Upload, { UploadedFilePreview } from "@/components/Upload";
import { copyToClipboard } from "@/utils";
import { truncateString } from "@/utils/strings";
import {
  editIdentity,
  getIdentityDetails,
  uploadFile,
} from "@/services/identity_v2";
import routes from "@/constants/routes";
import { API_URL } from "@/constants/api";
import { GET_TEMP_FILE } from "@/constants/endpoints";
import { messages } from "./components/messages";

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-16 w-16 bg-elevation-200 rounded-full" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
      </div>
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

  avatar: z.object({
    preview_url: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
  document_file: z.object({
    hasFile: z.boolean().optional().nullable(),
    name: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function Form() {
  const [isDataValid, setIsDataValid] = useState(false);
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryFn: getIdentityDetails,
    queryKey: ["identity", "details"],
  });

  const avatarPreviewUrl =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    data.profile_picture_file
      ? `${API_URL}/identity/file/${data.profile_picture_file.name}`
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
      date_of_birth: data.date_of_birth,
      country_of_birth: data.country_of_birth,
      city_of_birth: data.city_of_birth,
      identification_number: data.identification_number,
      avatar: {
        preview_url: avatarPreviewUrl,
        file_upload_id: "",
      },
      document_file: {
        hasFile: data.identity_document_file.name ? true : false,
        name: data.identity_document_file.name,
        file_upload_id: "",
      },
    },
  });

  const watchRequiredFields = methods.watch(["name", "email"]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await methods.trigger(["name", "email"]);

      setIsDataValid(isValid);
    };

    void validate();
  }, [watchRequiredFields, methods]);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return editIdentity({
        ...methods.getValues(),
        profile_picture_file_upload_id:
          methods.getValues().avatar.file_upload_id,
        identity_document_file_upload_id:
          methods.getValues().document_file.file_upload_id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["identity", "details"],
      });

      toast({
        description: f({
          id: "identity.edit.success",
          defaultMessage: "Personal identity updated successfully",
          description: "Personal identity updated successfully toast message",
        }),
        position: "bottom-center",
        duration: 1000,
      });

      setTimeout(() => {
        navigate(routes.VIEW_IDENTITY);
      });
    },
  });

  const { mutate: mutateFileUpload } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      methods.setValue("document_file.file_upload_id", data.file_upload_id);
    },
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <FormProvider {...methods}>
        <div className="flex flex-col items-center gap-2">
          <EditProfilePicture />

          <span className="text-text-300 text-xl font-medium leading-[30px]">
            {data.name}
          </span>

          <div className="flex items-center gap-1">
            <span className="text-text-200 text-xs font-normal leading-[18px]">
              {truncateString(data.node_id, 12)}
            </span>

            <button
              className="flex items-center justify-center p-0"
              onClick={() => {
                void copyToClipboard(data.node_id, () => {
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
            label={f(messages["identity.personal.name"])}
            icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />
          <Input
            {...methods.register("email")}
            label={f(messages["identity.personal.email"])}
            icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
            required
          />

          <CountrySelector
            label={f(messages["identity.personal.country"])}
            callback={(country) => {
              methods.setValue("country", country);
            }}
            value={methods.watch("country")}
          />
          <Input
            {...methods.register("city")}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
            label={f(messages["identity.personal.city"])}
          />
          <Input
            {...methods.register("zip")}
            icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
            label={f(messages["identity.personal.zip"])}
          />
          <Input
            {...methods.register("address")}
            label={f(messages["identity.personal.address"])}
            icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          />

          <CountrySelector
            label={f(messages["identity.personal.country_of_birth"])}
            callback={(country) => {
              methods.setValue("country_of_birth", country);
            }}
            value={methods.watch("country_of_birth")}
          />
          <Input
            {...methods.register("city_of_birth")}
            label={f(messages["identity.personal.city_of_birth"])}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          />
          <Input
            {...methods.register("identification_number")}
            label={f(messages["identity.personal.identification_number"])}
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
              <UploadedFilePreview name={methods.watch("document_file.name")} />
            </div>
          ) : (
            <Upload
              label={f({
                id: "identity.edit.file.upload",
                defaultMessage: "Upload document",
                description: "Upload document label",
              })}
              description={f({
                id: "identity.edit.file.upload.acceptedFormats",
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

      <div className="flex items-center gap-3 mt-auto">
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          disabled={isPending}
        >
          <FormattedMessage
            id="identity.edit.cancel"
            defaultMessage="Cancel"
            description="Cancel button text"
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
            id="identity.edit.save"
            defaultMessage="Save"
            description="Save button text"
          />
        </Button>
      </div>
    </div>
  );
}

export default function Edit() {
  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="identity.edit"
              defaultMessage="Edit personal identity"
              description="Edit personal identity title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Form />
      </Suspense>
    </Page>
  );
}
