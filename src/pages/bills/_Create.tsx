import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Big from "big.js";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CalculatorIcon,
  CalendarIcon,
  ChevronRightIcon,
  MapIcon,
  PaperclipIcon,
  PencilIcon,
  RefreshCwIcon,
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
import { Skeleton } from "@/components/ui/skeleton";
import Upload from "@/components/Upload";
import Picture from "@/components/Picture";
import { Separator } from "@/components/ui/separator";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { useIdentity } from "@/context/identity/IdentityContext";
import { useActiveIdentity } from "@/hooks/use-active-identity";
import { createBill, uploadFiles } from "@/services/bills";
import { cn } from "@/lib/utils";
import routes from "@/constants/routes";
import BitcoinIcon from "@/assets/bitcoin-icon.svg";
import ThreePartiesIcon from "@/assets/icons/three-parties.svg";
import SelfDraftedIcon from "@/assets/icons/self-drafted.svg";
import PromissoryNoteIcon from "@/assets/icons/promissory-note.svg";
import { useToast } from "@/hooks/use-toast";

const BILL_TYPE = {
  DRAFT: 2,
  SELF_DRAFTED: 1,
  PROMISSORY_NOTE: 0,
};

const formSchema = z.object({
  type: z.number(),
  payee: z.object({
    node_id: z.string(),
    name: z.string(),
    address: z.string(),
  }),
  drawee: z.object({
    node_id: z.string(),
    name: z.string(),
    address: z.string(),
  }),
  issue_date: z.string().min(1),
  maturity_date: z.string().min(1),
  sum: z.string().min(1),
  currency: z.string().min(1),
  country_of_issuing: z.string().min(1),
  city_of_issuing: z.string().min(1),
  country_of_payment: z.string().min(1),
  city_of_payment: z.string().min(1),
  language: z.string().min(1),
  file_upload_id: z.string().min(1).optional(),
});

function UploadInvoiceFile() {
  const { formatMessage: f } = useIntl();
  const { watch, setValue } = useFormContext();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFiles([file]);
    },
    onSuccess: (data) => {
      setValue("file_upload_id", data.file_upload_id);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f({
          id: "bills.create.upload.invoice",
          defaultMessage: "Upload invoice",
          description: "Upload invoice label",
        })}
        description={f({
          id: "bills.create.upload.invoice.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 5mb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);
        }}
        onRemoveFile={() => {
          setValue("file_upload_id", "");
        }}
      />
      <span className="text-text-300 text-sm font-normal leading-5">
        <FormattedMessage
          id="bills.create.noProtest"
          defaultMessage="No protest."
          description="No protest label"
        />
        {watch("file_upload_id") && (
          <>
            {" "}
            <FormattedMessage
              id="bills.create.valueReceived"
              defaultMessage="Value received."
              description="Value received label"
            />
          </>
        )}
      </span>
    </div>
  );
}

function CategoryOption({
  icon,
  label,
  description,
  onClick,
  enabled,
}: {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
  enabled: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-2 py-4 px-5 bg-elevation-200 border border-divider-50 rounded-xl cursor-pointer",
          {
            "cursor-not-allowed": !enabled,
          }
        )}
        onClick={() => {
          if (enabled) {
            onClick();
          }
        }}
      >
        <div className="flex items-center justify-center p-1.5 h-9 w-9 bg-elevation-50 border border-divider-50 rounded-full">
          <img src={icon} />
        </div>
        <div className="flex flex-col gap-0.5 mr-auto">
          <span className="text-text-300 text-base font-medium leading-6">
            {label}
          </span>
          <span className="text-text-200 text-sm font-normal leading-normal">
            {description}
          </span>
        </div>
        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>

      {!enabled && (
        <div className="absolute inset-0 bg-elevation-200 opacity-50 rounded-xl pointer-events-none cursor-not-allowed"></div>
      )}
    </div>
  );
}

function Category() {
  const { setValue } = useFormContext();
  const { formatMessage: f } = useIntl();
  const { identityDetails, isLoading } = useActiveIdentity();
  const { activeIdentity } = useIdentity();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-text-300 text-sm font-normal leading-5">
            <FormattedMessage
              id="bills.create.issuer"
              defaultMessage="Issuer"
              description="Issuer label"
            />
          </span>

          <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
            <FormattedMessage
              id="bills.create.switchIdentity"
              defaultMessage="Switch identity"
              description="Switch identity button"
            />
            <RefreshCwIcon className="text-brand-200 h-3 w-3 stroke-1" />
          </button>
        </div>
        {isLoading ? (
          <Skeleton className="h-16 w-full bg-elevation-200" />
        ) : (
          <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
            <Picture
              name={activeIdentity.name}
              image={activeIdentity.avatar}
              type={activeIdentity.type === "personal" ? 0 : 1}
              size="sm"
            />
            <div className="flex flex-col mr-auto">
              <span className="text-text-300 text-base font-medium leading-6">
                {identityDetails?.name}
              </span>
              <span className="text-text-200 text-xs font-normal leading-normal">
                {identityDetails?.address}
              </span>
            </div>
            <button className="p-0">
              <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-text-300 text-sm font-normal leading-5">
          <FormattedMessage
            id="bills.create.type"
            defaultMessage="Type of bill"
            description="Type of bill label"
          />
        </span>

        <CategoryOption
          icon={ThreePartiesIcon}
          label={f({
            id: "bills.create.type.draft",
            defaultMessage: "Draft (three parties)",
            description: "Draft type label",
          })}
          description={f({
            id: "bills.create.type.draft.description",
            defaultMessage: "Drawee pays to payee",
            description: "Draft type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.DRAFT);
          }}
          enabled={!isLoading}
        />

        <CategoryOption
          icon={SelfDraftedIcon}
          label={f({
            id: "bills.create.type.selfDrafted",
            defaultMessage: "Self drafted",
            description: "Self drafted type label",
          })}
          description={f({
            id: "bills.create.type.selfDrafted.description",
            defaultMessage: "Drawee pays to me",
            description: "Self drafted type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.SELF_DRAFTED);
          }}
          enabled={!isLoading}
        />

        <CategoryOption
          icon={PromissoryNoteIcon}
          label={f({
            id: "bills.create.type.promissoryNote",
            defaultMessage: "Promissory note",
            description: "Promissory note type label",
          })}
          description={f({
            id: "bills.create.type.promissoryNote.description",
            defaultMessage: "I pay to payee",
            description: "Promissory note type description",
          })}
          onClick={() => {
            setValue("type", BILL_TYPE.PROMISSORY_NOTE);
          }}
          enabled={!isLoading}
        />
      </div>
    </div>
  );
}

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
              label={f({
                id: "bills.create.issuance.issueDate",
                defaultMessage: "Issue date",
                description: "Issue date label",
              })}
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
  const { watch, setValue } = useFormContext();
  const [payee, setPayee] = useState<{
    node_id: string;
    name: string;
    address: string;
  } | null>(null);

  const billType = watch("type") as number;
  const {
    type,
    identityDetails,
    personalIdentity,
    companyIdentity,
    isLoading,
  } = useActiveIdentity();

  useEffect(() => {
    if (billType === BILL_TYPE.SELF_DRAFTED && identityDetails && !isLoading) {
      const node_id =
        type === "company"
          ? (companyIdentity?.id as string)
          : (personalIdentity?.node_id as string);

      setPayee({
        node_id,
        name: identityDetails.name,
        address: identityDetails.address,
      });

      setValue("payee.node_id", node_id);
      setValue("payee.name", identityDetails.name);
      setValue("payee.address", identityDetails.address);
    }
  }, [
    billType,
    type,
    identityDetails,
    isLoading,
    companyIdentity?.id,
    personalIdentity?.node_id,
    setValue,
  ]);

  return (
    <>
      {payee !== null ? (
        <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex flex-col mr-auto">
            <span className="text-text-300 text-base font-medium leading-6">
              {payee.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {payee.address}
            </span>
          </div>

          {billType !== BILL_TYPE.SELF_DRAFTED && (
            <ContactPicker
              onSelect={(contact) => {
                setPayee(contact);

                setValue("payee.node_id", contact.node_id);
                setValue("payee.name", contact.name);
                setValue("payee.address", contact.address);
              }}
            >
              <button className="p-0">
                <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
              </button>
            </ContactPicker>
          )}
        </div>
      ) : (
        <ContactPicker
          onSelect={(contact) => {
            setPayee(contact);

            setValue("payee.node_id", contact.node_id);
            setValue("payee.name", contact.name);
            setValue("payee.address", contact.address);
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

  const { toast } = useToast();

  return (
    <Drawer
      open={open}
      onOpenChange={() => {
        if (watch("issue_date") === "" || watch("maturity_date") === "") {
          toast({
            title: "Error",
            description: "Please select issue and maturity date first",
            position: "bottom-center",
          });

          return;
        }

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
  const { watch, setValue } = useFormContext();
  const [payer, setPayer] = useState<{
    node_id: string;
    name: string;
    address: string;
  } | null>(null);

  const billType = watch("type") as number;
  const {
    type,
    identityDetails,
    personalIdentity,
    companyIdentity,
    isLoading,
  } = useActiveIdentity();

  useEffect(() => {
    if (
      billType === BILL_TYPE.PROMISSORY_NOTE &&
      identityDetails &&
      !isLoading
    ) {
      const node_id =
        type === "company"
          ? (companyIdentity?.id as string)
          : (personalIdentity?.node_id as string);

      setPayer({
        node_id,
        name: identityDetails.name,
        address: identityDetails.address,
      });

      setValue("payer.node_id", node_id);
      setValue("payer.name", identityDetails.name);
      setValue("payer.address", identityDetails.address);
    }
  }, [
    billType,
    type,
    identityDetails,
    isLoading,
    companyIdentity?.id,
    personalIdentity?.node_id,
    setValue,
  ]);

  return (
    <>
      {payer !== null ? (
        <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex flex-col mr-auto">
            <span className="text-text-300 text-base font-medium leading-6">
              {payer.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {payer.address}
            </span>
          </div>

          {billType !== BILL_TYPE.PROMISSORY_NOTE && (
            <button className="p-0">
              <ContactPicker
                onSelect={(contact) => {
                  setPayer(contact);

                  setValue("payer.node_id", contact.node_id);
                  setValue("payer.name", contact.name);
                  setValue("payer.address", contact.address);
                }}
              >
                <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
              </ContactPicker>
            </button>
          )}
        </div>
      ) : (
        <ContactPicker
          onSelect={(contact) => {
            setPayer(contact);

            setValue("payer.node_id", contact.node_id);
            setValue("payer.name", contact.name);
            setValue("payer.address", contact.address);
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

function Information({ setPreview }: { setPreview: () => void }) {
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

      <div className="flex flex-col gap-4 mb-auto">
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

        <UploadInvoiceFile />
      </div>

      <Button size="md" onClick={setPreview}>
        <FormattedMessage
          id="bills.create.preview"
          defaultMessage="Preview"
          description="Preview button"
        />
      </Button>
    </div>
  );
}

// todo: move this one to bill card and render conditionally if previewing

function Property({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start px-5">
      <span className="flex-1 text-text-200 text-xs font-normal pt-0.5">
        {label}
      </span>
      {typeof value === "string" ? (
        <div className="flex-1 text-text-300 text-sm font-medium text-right">
          {value}
        </div>
      ) : (
        <>{value}</>
      )}
    </div>
  );
}

function Preview() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const { toast } = useToast();
  const { activeIdentity } = useIdentity();

  const formattedIssueDate = format(
    parseISO(getValues("issue_date") as string),
    "dd-MMM-yyyy"
  );
  const formattedMaturityDate = format(
    parseISO(getValues("maturity_date") as string),
    "dd-MMM-yyyy"
  );
  const issuingInformation = `${getValues("city_of_issuing") as string}, ${
    getValues("country_of_issuing") as string
  }, ${formattedIssueDate}`;
  const placeOfPayment = `${getValues("city_of_payment") as string}, ${
    getValues("country_of_payment") as string
  }`;

  const { mutate } = useMutation({
    mutationFn: () =>
      createBill({
        country_of_issuing: getValues("country_of_issuing") as string,
        city_of_issuing: getValues("city_of_issuing") as string,
        issue_date: getValues("issue_date") as string,
        maturity_date: getValues("maturity_date") as string,
        sum: getValues("sum") as string,
        currency: getValues("currency") as string,
        language: getValues("language") as string,
        country_of_payment: getValues("country_of_payment") as string,
        city_of_payment: getValues("city_of_payment") as string,
        type: getValues("type") as number,
        payee: getValues("payee.node_id") as string,
        drawee: getValues("payer.node_id") as string,
        file_upload_id: getValues("file_upload_id") as string,
      }),
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Bill created successfully",
        position: "bottom-center",
      });

      navigate(routes.VIEW_BILL.replace(":id", data.id));
    },
    onError: () => {
      toast({
        title: intl.formatMessage({
          id: "bill.create.preview.error",
          defaultMessage: "Error",
          description: "Error toast title",
        }),
        description: intl.formatMessage({
          id: "bill.create.preview.error.description",
          defaultMessage:
            "Error while creating bill. Please review the information and try again.",
          description: "Error toast description",
        }),
        variant: "error",
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col border border-divider-50 rounded-xl select-none mb-auto">
        <div className="flex flex-col gap-3 p-5 bg-elevation-200 rounded-xl">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-sm font-medium">
                {issuingInformation}
              </span>

              <h2 className="text-text-300 text-base font-medium">
                <FormattedMessage
                  id="bill.create.preview.details.billOfExchange"
                  defaultMessage="Against this bill of exchange"
                  description="Heading for bill preview page"
                />
              </h2>
            </div>

            <button className="h-fit p-0">
              <PaperclipIcon className="text-text-300 w-5 h-5 stroke-1" />
            </button>
          </div>

          <div className="flex flex-col gap-0.5">
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
          </div>

          <div className="flex flex-col gap-3 bg-elevation-200 rounded-b-2xl">
            <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-xl rounded-b-2xl">
              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.payOn",
                  defaultMessage: "Pay on",
                  description: "Pay on property for bill card",
                })}
                value={formattedMaturityDate}
              />
              <Separator />

              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.toTheOrderOf",
                  defaultMessage: "To the order of",
                  description: "To the order of property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {getValues("payee.name")}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {getValues("payee.address")}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.sum",
                  defaultMessage: "The sum of",
                  description: "Sum property for bill card",
                })}
                value={
                  <FormattedCurrency
                    value={Number(getValues("sum") as string)}
                    color="none"
                    signDisplay="never"
                  />
                }
              />
              <Separator />

              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.payer",
                  defaultMessage: "Payer",
                  description: "Payer property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {getValues("payer.name")}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {getValues("payer.address")}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.drawer",
                  defaultMessage: "Drawer",
                  description: "Drawer property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {activeIdentity.name}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {activeIdentity.address}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={intl.formatMessage({
                  id: "bill.create.preview.details.placeOfPayment",
                  defaultMessage: "Place of payment",
                  description: "Place of payment property for bill card",
                })}
                value={placeOfPayment}
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.create.preview.details.noProtest"
                defaultMessage="No protest."
                description="No protest copy for bill card"
              />
              {getValues("file_upload_id") !== "" && (
                <FormattedMessage
                  id="bills.create.preview.details.valueReceived"
                  defaultMessage="Value received."
                  description="Value received label"
                />
              )}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="md"
        onClick={() => {
          mutate();
        }}
      >
        <FormattedMessage
          id="bills.create.sign"
          defaultMessage="Sign"
          description="Sign bill creation button"
        />
      </Button>
    </div>
  );
}

export default function Create() {
  const [isPreview, setIsPreview] = useState(false);
  const defaultIssueDate = format(new Date(), "yyyy-MM-dd");

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: -1,
      payee: "",
      drawee: "",
      issue_date: defaultIssueDate,
      maturity_date: "",
      sum: "0",
      currency: "sat",
      language: "en-US",
      // default to current user identity info
      country_of_issuing: "AT",
      city_of_issuing: "Vienna",
      // default to selected contact info
      country_of_payment: "AT",
      city_of_payment: "Vienna",
      // send a null if no file is selected
      file_upload_id: "",
    },
  });

  const billType = methods.watch("type");

  return (
    <Page className="gap-6">
      <Topbar
        lead={
          <NavigateBack
            callBack={() => {
              methods.reset();
            }}
          />
        }
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
        {isPreview ? (
          <Preview />
        ) : billType == -1 ? (
          <Category />
        ) : (
          <Information
            setPreview={() => {
              setIsPreview(true);
            }}
          />
        )}
      </FormProvider>
    </Page>
  );
}
