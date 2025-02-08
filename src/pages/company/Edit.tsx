import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CalendarIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import NavigateBack from "@/components/NavigateBack";
import Summary from "@/components/Summary";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import Page from "@/components/wrappers/Page";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker/datePicker";
import { useIdentity } from "@/context/identity/IdentityContext";
import { editCompany, getCompanyDetails } from "@/services/company";
import { useToast } from "@/hooks/use-toast";
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
});

function Form({ companyId }: { companyId: string }) {
  const navigate = useNavigate();
  const [isDataValid, setIsDataValid] = useState(false);
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryKey: ["company", "details", companyId],
    queryFn: () => getCompanyDetails(companyId),
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
      registration_date: data.registration_date,
      country_of_registration: data.country_of_registration,
      city_of_registration: data.city_of_registration,
      registration_number: data.registration_number,
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
      return editCompany({
        id: companyId,
        ...methods.getValues(),
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
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Summary identityType={1} name={data.name} nodeId={data.id} picture="" />

      <FormProvider {...methods}>
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
          />
          <Input
            {...methods.register("city")}
            label={f(messages["company.city"])}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
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
          />

          <DatePicker
            mode="single"
            value={{ from: parseISO(methods.watch("registration_date")) }}
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
