import { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  GitForkIcon,
  UserPenIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  MailIcon,
  CalendarIcon,
  PencilIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import NavigateBack from "@/components/NavigateBack";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { DatePicker } from "@/components/DatePicker/datePicker";
import Upload from "@/components/Upload";
import Picture from "@/components/Picture";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { truncateString } from "@/utils/strings";
import {
  editContact,
  getContactDetails,
  uploadFile,
} from "@/services/contact_v2";
import { API_URL } from "@/constants/api";
import { GET_CONTACT_FILE, GET_TEMP_FILE } from "@/constants/endpoints";
import routes from "@/constants/routes";
import { getMessage, messages } from "./components/messages";

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-16 w-16 bg-elevation-200 rounded-full" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
        <Skeleton className="h-3 w-1/3 bg-elevation-200" />
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

const formSchema = z.object({
  type: z.number(),
  node_id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),

  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().optional(),
  address: z.string().min(1),

  date_of_birth_or_registration: z.string().optional(),
  country_of_birth_or_registration: z.string().optional(),
  city_of_birth_or_registration: z.string().optional(),
  identification_number: z.string().optional(),

  avatar: z.object({
    preview_url: z.string().optional().nullable(),
    file_upload_id: z.string().optional().nullable(),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function Form({ nodeId }: { nodeId: string }) {
  const [isDataValid, setIsDataValid] = useState(false);
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();

  const { data } = useSuspenseQuery({
    queryKey: ["contacts", "details", nodeId],
    queryFn: () => getContactDetails(nodeId),
  });

  const avatarImageUrl = data.avatar_file?.name
    ? `${API_URL}/${GET_CONTACT_FILE.replace(
        ":node_id/:name",
        `${data.node_id}/${data.avatar_file.name}`
      )}`
    : "";

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: data.type,
      node_id: data.node_id,
      name: data.name,
      email: data.email,
      country: data.country,
      city: data.city,
      zip: data.zip,
      address: data.address,
      date_of_birth_or_registration: data.date_of_birth_or_registration,
      country_of_birth_or_registration: data.country_of_birth_or_registration,
      city_of_birth_or_registration: data.city_of_birth_or_registration,
      identification_number: data.identification_number,

      avatar: {
        preview_url: avatarImageUrl,
        file_upload_id: "",
      },
    },
  });

  const watchRequiredFields = methods.watch([
    "node_id",
    "name",
    "email",
    "country",
    "city",
    "address",
  ]);

  useEffect(() => {
    const validate = async () => {
      const isValid = await methods.trigger([
        "node_id",
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

  const values = methods.getValues();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return editContact({
        node_id: values.node_id,
        name: values.name,
        email: values.email,
        country: values.country,
        city: values.city,
        zip: values.zip,
        address: values.address,
        date_of_birth_or_registration: values.date_of_birth_or_registration,
        country_of_birth_or_registration:
          values.country_of_birth_or_registration,
        city_of_birth_or_registration: values.city_of_birth_or_registration,
        identification_number: values.identification_number,
        avatar_file_upload_id: values.avatar.file_upload_id,
      });
    },
    onSuccess: async () => {
      // warning: this will break if we change the node_id and save, because the node_id retrieved from the url will no longer exist
      await queryClient.invalidateQueries({
        queryKey: ["contacts", data.node_id, "details"],
      });

      toast({
        description: f({
          id: "contact.edit.success",
          defaultMessage: "Contact updated successfully",
          description: "Contact updated successfully toast message",
        }),
        position: "bottom-center",
      });

      setTimeout(() => {
        navigate(routes.CONTACTS + "/" + data.node_id);
      }, 1000);
    },
  });

  const contactType = data.type;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-4">
        <EditProfilePicture />
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-300 text-xl font-medium leading-[30px]">
            {data.name}
          </span>
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {truncateString(data.node_id, 16)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          {...methods.register("node_id")}
          icon={<GitForkIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.nodeId"])}
          clearable
          required
        />
        <Input
          {...methods.register("email")}
          icon={<MailIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "email"))}
          required
        />
        <Input
          {...methods.register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "name"))}
          required
        />

        <CountrySelector
          label={f(messages["contacts.country"])}
          callback={(country) => {
            methods.setValue("country", country);
          }}
          value={methods.watch("country")}
          required
        />
        <Input
          {...methods.register("city")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.city"])}
          required
        />
        <Input
          {...methods.register("zip")}
          icon={<MapPinIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.zipCode"])}
        />
        <Input
          {...methods.register("address")}
          icon={<MapPinnedIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(messages["contacts.address"])}
          required
        />
        <DatePicker
          label={f(getMessage(contactType, "date"))}
          mode="single"
          customComponent={
            <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg cursor-pointer">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {methods.watch("date_of_birth_or_registration") ||
                f(getMessage(contactType, "date"))}
            </div>
          }
          onChange={({ from }) => {
            methods.setValue(
              "date_of_birth_or_registration",
              // @ts-expect-error - TS doesn't know about the date object
              format(from, "yyyy-MM-dd")
            );
          }}
        />

        <CountrySelector
          label={f(getMessage(contactType, "country"))}
          callback={(country) => {
            methods.setValue("country_of_birth_or_registration", country);
          }}
          value={methods.watch("country_of_birth_or_registration")}
        />
        <Input
          {...methods.register("city_of_birth_or_registration")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "city"))}
        />
        <Input
          {...methods.register("identification_number")}
          icon={<ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={f(getMessage(contactType, "identificationNumber"))}
        />
        <Upload
          label={f(getMessage(contactType, "document"))}
          description={f({
            id: "contacts.create.upload.acceptedFormats",
            defaultMessage: "PDF, PNG or JPG (max. 5mb)",
            description: "Accepted file formats",
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="md"
          onClick={() => {
            mutate();
          }}
          disabled={!isDataValid || isPending}
        >
          <FormattedMessage
            id="contacts.edit.save"
            defaultMessage="Save"
            description="Save edited contact button"
          />
        </Button>
        <Button
          size="md"
          variant="outline"
          onClick={() => {
            navigate(-1);
          }}
          disabled={isPending}
        >
          <FormattedMessage
            id="contacts.edit.cancel"
            defaultMessage="Cancel"
            description="Cancel edited contact button"
          />
        </Button>
      </div>
    </FormProvider>
  );
}

export default function Edit() {
  const { nodeId } = useParams<{ nodeId: string }>();

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="contacts.edit"
              defaultMessage="Edit contact"
              description="Edit contact title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Form nodeId={nodeId as string} />
      </Suspense>
    </Page>
  );
}
