import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage, useIntl } from "react-intl";
import {
  GitForkIcon,
  UserPenIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  MailIcon,
  CopyIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import NavigateBack from "@/components/NavigateBack";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { DatePicker } from "@/components/DatePicker/datePicker";
import Upload from "@/components/Upload";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import IdentityAvatar from "@/components/IdentityAvatar";
import { editContact, getContact } from "@/services/contact";
import { truncateString } from "@/utils/strings";
import type { Contact } from "@/types/contact";
import type { EditContactPayload } from "@/services/contact";
import { messages } from "./components/messages";

function Loader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 bg-elevation-200" />
        <Skeleton className="h-6 w-1/2 bg-elevation-200" />
        <Skeleton className="h-4 w-1/2 bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-3 py-6 px-5 w-full border border-divider-75 rounded-xl">
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-14 bg-elevation-200" />
      </div>
    </div>
  );
}

type DetailsProps = {
  type: "personal" | "company";
  name: Contact["name"];
  nodeId: Contact["node_id"];
  avatar?: string;
};

function Details({ type, name, nodeId, avatar }: DetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <IdentityAvatar
        name={name}
        picture={avatar || ""}
        identityType={type}
        size="lg"
      />

      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-[30px]">
          {name}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {truncateString(nodeId, 12)}
          </span>

          <button className="flex items-center justify-center">
            <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

const formSchema = z.object({
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

function Form() {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();

  const { node_id } = useParams<{ node_id: string }>();
  const { data } = useSuspenseQuery({
    queryKey: ["contacts", "details", node_id],
    queryFn: () => getContact(node_id as string),
  });

  const contactType = data.type === 0 ? "person" : "company";

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

      document_name: "",
      document_size: "",
    },
  });

  methods.watch(["country", "country_of_birth_or_registration"]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: EditContactPayload) => {
      return editContact(data);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["contacts", "details", variables.node_id],
        data
      );
    },
  });

  return (
    <FormProvider {...methods}>
      <Details
        type={contactType === "person" ? "personal" : "company"}
        name={methods.getValues("name")}
        nodeId={methods.getValues("node_id")}
      />

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
          label={
            contactType === "person"
              ? f(messages["contacts.person.email"])
              : f(messages["contacts.company.email"])
          }
          required
        />
        <Input
          {...methods.register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.name"])
              : f(messages["contacts.company.name"])
          }
          required
        />

        <CountrySelector
          label={f(messages["contacts.country"])}
          callback={(country) => {
            methods.setValue("country", country);
          }}
          value={methods.getValues("country")}
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
          label={
            contactType === "person"
              ? f(messages["contacts.person.dateOfBirth"])
              : f(messages["contacts.company.dateOfRegistration"])
          }
          mode="single"
          onChange={() => null}
        />

        <CountrySelector
          label={
            contactType === "person"
              ? f(messages["contacts.person.countryOfBirth"])
              : f(messages["contacts.company.countryOfRegistration"])
          }
          callback={(country) => {
            methods.setValue("country_of_birth_or_registration", country);
          }}
          value={methods.getValues("country_of_birth_or_registration")}
        />
        <Input
          {...methods.register("city_of_birth_or_registration")}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={
            contactType === "person"
              ? f(messages["contacts.person.cityOfBirth"])
              : f(messages["contacts.company.cityOfRegistration"])
          }
        />
        <Input
          {...methods.register("identification_number")}
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
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="md"
          onClick={() => {
            mutation.mutate(methods.getValues());
          }}
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
        <Form />
      </Suspense>
    </Page>
  );
}
