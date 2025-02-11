import { Suspense, useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
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
import Summary from "@/components/Summary";
import { editIdentity, getIdentityDetails } from "@/services/identity_v2";
import { API_URL } from "@/constants/api";
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
});

function Form() {
  const [isDataValid, setIsDataValid] = useState(false);
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryFn: getIdentityDetails,
    queryKey: ["identity", "details"],
  });

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
      });
    },
  });

  const avatar =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    data.profile_picture_file !== null
      ? `${API_URL}/identity/file/${data.profile_picture_file.name}`
      : "";

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Summary
        identityType={0}
        name={data.name}
        nodeId={data.node_id}
        picture={avatar}
      />

      <FormProvider {...methods}>
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
