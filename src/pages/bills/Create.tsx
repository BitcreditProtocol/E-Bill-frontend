import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Big from "big.js";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CalculatorIcon,
  CalendarIcon,
  ChevronRightIcon,
  MapIcon,
  PencilIcon,
  UserIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { DatePicker } from "@/components/DatePicker/datePicker";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ContactPicker from "@/components/Contact/ContactPicker";
import CountrySelector from "@/components/CountrySelector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import BitcoinIcon from "@/assets/bitcoin-icon.svg";
import { Contact } from "@/types/contact";

const formSchema = z.object({
  type: z.number(),
  payee: z.string().min(1),
  drawee: z.string().min(1),
  issue_date: z.string().min(1),
  maturity_date: z.string().min(1),
  sum: z.string().min(1),
  currency: z.string().min(1),
  country_of_issuing: z.string().min(1),
  city_of_issuing: z.string().min(1),
  country_of_payment: z.string().min(1),
  city_of_payment: z.string().min(1),
  language: z.string().min(1),
});

function Issuance() {
  const { register, watch, getValues, setValue } = useFormContext();
  const { formatMessage: f } = useIntl();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-text-300 text-sm font-normal leading-5 mb-1">
        {getValues("city_of_issuing")}, {getValues("country_of_issuing")},{" "}
        {format(parseISO(getValues("issue_date") as string), "dd-MMM-yyyy")}
      </span>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
        }}
      >
        <DialogTrigger>
          <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
            <PencilIcon className="text-brand-200 h-3 w-3 stroke-1" />

            <FormattedMessage
              id="bills.create.edit"
              defaultMessage="Edit"
              description="Edit date button"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-6 py-6 px-5 h-full max-w-[375px] bg-elevation-50">
          <Topbar
            lead={<NavigateBack callBack={closeDialog} />}
            middle={
              <PageTitle>
                <FormattedMessage
                  id="bills.create.issuance.title"
                  defaultMessage="Issuance"
                  description="Bill issuance title"
                />
              </PageTitle>
            }
          />

          <span className="text-text-300 text-sm font-normal leading-5">
            {getValues("city_of_issuing")}, {getValues("country_of_issuing")},{" "}
            {getValues("issue_date")}
          </span>

          <div className="flex flex-col gap-3">
            <CountrySelector
              label={f({
                id: "bills.create.issuance.countryOfIssuing",
                defaultMessage: "Country of issuing",
                description: "Country of issuing label",
              })}
              callback={(country) => {
                setValue("country_of_issuing", country);
              }}
              value={watch("country_of_issuing") as string}
              required
            />

            <Input
              {...register("city_of_issuing")}
              icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
              label={f({
                id: "bills.create.issuance.cityOfIssuing",
                defaultMessage: "City of issuing",
                description: "City of issuing label",
              })}
              required
            />

            <DatePicker
              label="Issue date"
              mode="single"
              value={{ from: parseISO(watch("issue_date") as string) }}
              onChange={(e) => {
                setValue(
                  "issue_date",
                  format(e.from as unknown as string, "yyyy-MM-dd")
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button size="md">
              <FormattedMessage
                id="bills.create.issuance.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>
            <Button size="md" variant="outline">
              <FormattedMessage
                id="bills.create.issuance.cancel"
                defaultMessage="Cancel"
                description="Cancel button"
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Payee() {
  const [selectedContact, setSelectedContact] = useState<Pick<
    Contact,
    "node_id" | "name" | "address"
  > | null>(null);

  return (
    <>
      {selectedContact ? (
        <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex flex-col mr-auto">
            <span className="text-text-300 text-base font-medium leading-6">
              {selectedContact.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {selectedContact.address}
            </span>
          </div>

          <ContactPicker
            onSelect={(contact) => {
              setSelectedContact(contact);
            }}
          >
            <button className="p-0">
              <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
            </button>
          </ContactPicker>
        </div>
      ) : (
        <ContactPicker
          onSelect={(contact) => {
            setSelectedContact(contact);
          }}
        >
          <button className="flex items-center gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
            <UserIcon className="text-text-300 h-5 w-5 stroke-1" />
            <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
              <FormattedMessage
                id="bills.create.payee"
                defaultMessage="Payee"
                description="Payee label"
              />
            </span>
            <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        </ContactPicker>
      )}
    </>
  );
}

function CalculateDiscount() {
  const { watch, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState<{
    days: number;
    rate: number;
  } | null>(null);

  return (
    <Drawer
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
      }}
    >
      <DrawerTrigger asChild>
        <button className="flex items-center gap-1">
          <CalculatorIcon className="text-text-300 h-4 w-4 stroke-1" />
          <span className="text-text-300 text-xs font-medium leading-normal">
            {discount !== null ? (
              `${discount.days.toString()} @ ${(
                discount.rate * 100
              ).toString()}%`
            ) : (
              <FormattedMessage
                id="bills.create.discount"
                defaultMessage="Calculate discount"
                description="Calculate discount button"
              />
            )}
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DiscountForm
          startDate={parseISO(watch("issue_date") as string)}
          endDate={parseISO(watch("maturity_date") as string)}
          onSubmit={(e) => {
            setValue("sum", e.net.value.toString());
            setDiscount({
              days: e.days,
              rate: e.discountRate.toNumber(),
            });
            setOpen(false);
          }}
          gross={{
            value: Big(parseInt(watch("sum") as string)),
            currency: "BTC",
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

function DateSelector() {
  const { setValue, watch } = useFormContext();

  return (
    <DatePicker
      mode="single"
      customComponent={
        <button className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg">
          <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
          {(watch("maturity_date") &&
            format(
              parseISO(watch("maturity_date") as string),
              "dd-MMM-yyyy"
            )) ||
            "Date"}
        </button>
      }
      onChange={(e) => {
        setValue(
          "maturity_date",
          format(e.from as unknown as string, "yyyy-MM-dd")
        );
      }}
    />
  );
}

function Payer() {
  const [selectedContact, setSelectedContact] = useState<Pick<
    Contact,
    "node_id" | "name" | "address"
  > | null>(null);
  return (
    <>
      {selectedContact ? (
        <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex flex-col mr-auto">
            <span className="text-text-300 text-base font-medium leading-6">
              {selectedContact.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {selectedContact.address}
            </span>
          </div>

          <button className="p-0">
            <ContactPicker
              onSelect={(contact) => {
                setSelectedContact(contact);
              }}
            >
              <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
            </ContactPicker>
          </button>
        </div>
      ) : (
        <ContactPicker
          onSelect={(contact) => {
            setSelectedContact(contact);
          }}
        >
          <button className="flex items-center gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
            <UserIcon className="text-text-300 h-5 w-5 stroke-1" />
            <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
              <FormattedMessage
                id="bills.create.payer"
                defaultMessage="Payer"
                description="Payer label"
              />
            </span>
            <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        </ContactPicker>
      )}
    </>
  );
}

function Payment() {
  const { register, watch, getValues, setValue } = useFormContext();
  const { formatMessage: f } = useIntl();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-text-200 text-xs font-normal leading-normal">
          <FormattedMessage
            id="bills.create.payment"
            defaultMessage="Place of payment"
            description="Place of payment label"
          />
        </span>
        <span className="text-text-300 text-sm font-normal leading-5">
          {getValues("city_of_payment")}, {getValues("country_of_payment")}
        </span>
      </div>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
        }}
      >
        <DialogTrigger>
          <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
            <PencilIcon className="text-brand-200 h-3 w-3 stroke-1" />

            <FormattedMessage
              id="bills.create.payment.edit"
              defaultMessage="Edit"
              description="Edit place of payment button"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-6 py-6 px-5 h-full max-w-[375px] bg-elevation-50">
          <Topbar
            lead={<NavigateBack callBack={closeDialog} />}
            middle={
              <PageTitle>
                <FormattedMessage
                  id="bills.create.payment.title"
                  defaultMessage="Place of payment"
                  description="Bill place of payment title"
                />
              </PageTitle>
            }
          />

          <span className="text-text-300 text-sm font-normal leading-5">
            {getValues("city_of_payment")}, {getValues("country_of_payment")}
          </span>

          <div className="flex flex-col gap-3">
            <CountrySelector
              label={f({
                id: "bills.create.payment.countryOfPayment",
                defaultMessage: "Country of payment",
                description: "Country of payment label",
              })}
              callback={(country) => {
                setValue("country_of_payment", country);
              }}
              value={watch("country_of_payment") as string}
              required
            />

            <Input
              {...register("city_of_payment")}
              icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
              label={f({
                id: "bills.create.payment.cityOfPayment",
                defaultMessage: "City of payment",
                description: "City of payment label",
              })}
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button size="md">
              <FormattedMessage
                id="bills.create.payment.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>
            <Button size="md" variant="outline">
              <FormattedMessage
                id="bills.create.payment.cancel"
                defaultMessage="Cancel"
                description="Cancel button"
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Information() {
  const { register, watch } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <span className="text-text-300 text-xl font-medium leading-normal">
        <FormattedMessage
          id="bills.create.billOfExchange"
          defaultMessage="Against this bill of exchange"
          description="Bill of exchange label"
        />
      </span>

      <div className="flex flex-col gap-4">
        <Issuance />

        <div className="flex flex-col gap-2">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bills.create.payOn"
              defaultMessage="pay on"
              description="Pay on label"
            />
          </span>

          <DateSelector />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bills.create.orderOf"
              defaultMessage="to the order of"
              description="To the order of label"
            />
          </span>

          <Payee />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-text-300 text-sm font-normal leading-5">
              <FormattedMessage
                id="bills.create.sumOf"
                defaultMessage="the sum of"
                description="Sum of label"
              />
            </span>

            <CalculateDiscount />
          </div>
          <div className="flex items-center gap-1.5 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
            <img className="h-5 w-5" src={BitcoinIcon} />
            <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
              BTC
            </span>

            <input
              {...register("sum")}
              className="bg-transparent text-right outline-none"
              type="text"
              value={watch("sum") as string}
            />

            <span className="text-text-200 text-[10px] font-normal leading-snug">
              BTC
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bills.create.payer"
              defaultMessage="Payer"
              description="Payer label"
            />
          </span>

          <Payer />
        </div>

        <Payment />

        <div className="flex flex-col gap-2">
          <Upload
            label="Upload invoice"
            description="PDF, PNG or JPG (max. 5mb)"
          />
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bills.create.noProtest"
              defaultMessage="No protest."
              description="No protest label"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Create() {
  const defaultIssueDate = format(new Date(), "yyyy-MM-dd");

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 0,
      payee: "",
      drawee: "",
      issue_date: defaultIssueDate,
      maturity_date: "",
      sum: "0",
      currency: "",
      country_of_issuing: "AT",
      city_of_issuing: "Vienna",
      country_of_payment: "AT",
      city_of_payment: "Vienna",
    },
  });

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bills.create.title"
              defaultMessage="Draw bill"
              description="Create bill of exchange title"
            />
          </PageTitle>
        }
      />
      <FormProvider {...methods}>
        <Information />
      </FormProvider>
    </Page>
  );
}
