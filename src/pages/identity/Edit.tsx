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
import { messages } from "./components/messages";
import { useEffect, useState } from "react";

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
  const { formatMessage: f } = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "my full name",
      email: "my@email.com",
      country: "BR",
      city: "somewhere in brazil",
      zip: "65476000",
      address: "Rua das flores, 123",
      date_of_birth: "",
      country_of_birth: "BR",
      city_of_birth: "somewhere again",
      identification_number: "92101",
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

  return (
    <div className="flex-1 flex flex-col gap-6">
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
        <Button className="w-full" size="sm" variant="outline">
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
            console.log("saved");
          }}
          disabled={!isDataValid}
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

      <Form />
    </Page>
  );
}
