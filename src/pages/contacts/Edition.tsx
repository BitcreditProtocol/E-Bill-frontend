import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm, Controller } from "react-hook-form";
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
import { messages } from "./components/messages";

import IdentityAvatar from "@/components/IdentityAvatar";
import type { Contact } from "@/types/contact";
import { truncateString } from "@/utils/strings";

type DetailsProps = {
  type: "personal" | "company";
  name: Contact["name"];
  nodeId: Contact["node_id"];
  avatar?: Contact["avatar"];
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

export default function Edit() {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { node_id } = useParams<{ node_id: string }>();

  const contactType = node_id === "1" ? "person" : "company";

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "person",
      node_id: "my_node_id",
      name: "John Doe",
      email: "email@address.com",
      country: "",
      city: "Somewhere",
      zip: "19010",
      street: "1234 Street",
      date_of_registration: "",
      country_of_registration: "BR",
      city_of_registration: "Some city",
      registration_number: "109201",

      document_name: "",
      document_size: "",
    },
  });

  methods.watch();

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

      <FormProvider {...methods}>
        <Details
          type={contactType === "person" ? "personal" : "company"}
          name={methods.getValues("name")}
          nodeId={methods.getValues("node_id")}
        />

        <div className="flex flex-col gap-3">
          <Controller
            name="node_id"
            control={methods.control}
            render={({ field }) => (
              <Input
                {...field}
                icon={
                  <GitForkIcon className="text-text-300 h-5 w-5 stroke-1" />
                }
                label={f(messages["contacts.nodeId"])}
                clearable
                required
              />
            )}
          />
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
            {...methods.register("street")}
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
              methods.setValue("country_of_registration", country);
            }}
            value={methods.getValues("country_of_registration")}
          />
          <Input
            {...methods.register("city_of_registration")}
            icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
            label={
              contactType === "person"
                ? f(messages["contacts.person.cityOfBirth"])
                : f(messages["contacts.company.cityOfRegistration"])
            }
          />
          <Input
            {...methods.register("registration_number")}
            icon={
              <ShieldCheckIcon className="text-text-300 h-5 w-5 stroke-1" />
            }
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

        <div
          className="flex flex-col gap-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Button size="md">
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
    </Page>
  );
}
