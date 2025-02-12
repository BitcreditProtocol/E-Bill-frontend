import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage } from "react-intl";
import { ChevronRightIcon, UserIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import Label from "@/components/typography/Label";
import ContactPicker from "@/components/Contact/ContactPicker";

function Payee() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const payee = watch("payee");

  return (
    <ContactPicker
      onSelect={(contact) => {
        setValue("payee.node_id", contact.node_id);
        setValue("payee.name", contact.name);
        setValue("payee.address", contact.address);
      }}
    >
      {!payee ? (
        <button className="flex items-center gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
          <UserIcon className="text-text-300 h-5 w-5 stroke-1" />
          <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
            <FormattedMessage
              id="bill.create.payee"
              defaultMessage="Payee"
              description="Payee label"
            />
          </span>
          <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
        </button>
      ) : (
        <div>Payee been chosen! {payee.name}</div>
      )}
    </ContactPicker>
  );
}

function Payer() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const payer = watch("drawee");

  return (
    <ContactPicker
      onSelect={(contact) => {
        setValue("payee.node_id", contact.node_id);
        setValue("payee.name", contact.name);
        setValue("payee.address", contact.address);
      }}
    >
      {!payer ? (
        <button className="flex items-center gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
          <UserIcon className="text-text-300 h-5 w-5 stroke-1" />
          <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
            <FormattedMessage
              id="bill.create.payee"
              defaultMessage="Payee"
              description="Payee label"
            />
          </span>
          <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
        </button>
      ) : (
        <div>Payee been chosen! {payer.name}</div>
      )}
    </ContactPicker>
  );
}

const formSchema = z.object({
  type: z.number(),
  issue_date: z.string().min(10),
  maturity_date: z.string().min(10),
  country_of_issuing: z.string().min(2),
  city_of_issuing: z.string().min(1),
  country_of_payment: z.string().min(2),
  city_of_payment: z.string().min(1),
  sum: z.number().min(1),
  currency: z.string().min(1),
  language: z.string().min(1),
  payee: z
    .object({
      node_id: z.string(),
      name: z.string(),
      address: z.string(),
    })
    .nullable(),
  drawee: z
    .object({
      node_id: z.string(),
      name: z.string(),
      address: z.string(),
    })
    .nullable(),
  file_upload: z.string().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

function Details() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="font-normal">
          <FormattedMessage
            id="bill.create.orderOf"
            defaultMessage="to the order of"
            description="To the order of label"
          />
        </Label>
        <Payee />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-normal">
          <FormattedMessage
            id="bill.create.payer"
            defaultMessage="Payer"
            description="Payer label"
          />
        </Label>
        <Payer />
      </div>
    </div>
  );
}

// function Preview() {}

export default function Create() {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 0,
      issue_date: "",
      maturity_date: "",
      country_of_issuing: "",
      city_of_issuing: "",
      country_of_payment: "",
      city_of_payment: "",
      sum: 0,
      currency: "",
      language: "",
      payee: null,
      drawee: null,
      file_upload: null,
    },
  });

  return (
    <Page className="gap-6">
      <Topbar lead={<NavigateBack />} />

      <FormProvider {...methods}>
        <Details />
      </FormProvider>
    </Page>
  );
}
