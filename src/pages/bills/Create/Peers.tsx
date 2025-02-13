import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { useIntl } from "react-intl";
import { ChevronRightIcon, PencilIcon, UserIcon } from "lucide-react";
import ContactPicker from "@/components/Contact/ContactPicker";
import Picture from "@/components/Picture";
import { useIdentity } from "@/context/identity/IdentityContext";
import { BILL_TYPE } from "@/types/bill";
import type { Contact } from "@/types/contact";
import type { CreateBillFormSchema } from "./index";
import { format, parseISO } from "date-fns";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
      <UserIcon className="text-text-300 h-5 w-5 stroke-1" />
      <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
        {label}
      </span>
      <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
    </div>
  );
}

const payeeFormSchema = z
  .object({
    node_id: z.string(),
    name: z.string(),
    address: z.string(),
  })
  .nullable();

export function Payee() {
  const { formatMessage: f } = useIntl();
  const { activeIdentity } = useIdentity();
  const { control, setValue } = useFormContext<CreateBillFormSchema, "payee">();
  const billType = useWatch<CreateBillFormSchema, "type">({
    control,
    name: "type",
  });
  const payee = useWatch<CreateBillFormSchema, "payee">({
    control,
    name: "payee",
  });

  useEffect(() => {
    if (billType === BILL_TYPE.SELF_DRAFTED) {
      setValue("issuance", {
        city: activeIdentity.city ?? "",
        country: activeIdentity.country ?? "",
        date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      });

      setValue("payee", {
        node_id: activeIdentity.node_id,
        name: activeIdentity.name,
        address: activeIdentity.address ?? "",
      });
    }
  }, [billType, activeIdentity, setValue]);

  const handleSelectPayee = (
    contact: Pick<Contact, "node_id" | "name" | "address">
  ) => {
    setValue("payee", {
      node_id: contact.node_id,
      name: contact.name,
      address: contact.address,
    });
  };

  return (
    <ContactPicker
      canEdit={billType !== BILL_TYPE.SELF_DRAFTED}
      onSelect={handleSelectPayee}
    >
      {payee !== null ? (
        <div className="flex items-center gap-3 py-4 px-3 w-full bg-elevation-200 border border-divider-50 rounded-lg">
          <Picture type={1} name={payee.name} image="" size="sm" />
          <div className="flex flex-col items-start mr-auto">
            <span className="text-text-300 text-base font-medium leading-normal">
              {payee.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {payee.address}
            </span>
          </div>

          {billType !== BILL_TYPE.SELF_DRAFTED && (
            <ContactPicker
              canEdit={billType !== BILL_TYPE.SELF_DRAFTED}
              onSelect={(contact) => {
                handleSelectPayee(contact);
              }}
            >
              <button className="p-0">
                <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
              </button>
            </ContactPicker>
          )}
        </div>
      ) : (
        <Placeholder
          label={f({
            id: "bill.create.payee",
            defaultMessage: "Payee",
            description: "Payee label",
          })}
        />
      )}
    </ContactPicker>
  );
}

Payee.formSchema = payeeFormSchema;

const payerFormSchema = z
  .object({
    node_id: z.string(),
    name: z.string(),
    address: z.string(),
  })
  .nullable();

export function Payer() {
  const { formatMessage: f } = useIntl();
  const { activeIdentity } = useIdentity();
  const { control, setValue } = useFormContext<
    CreateBillFormSchema,
    "drawee"
  >();
  const billType = useWatch<CreateBillFormSchema, "type">({
    control,
    name: "type",
  });
  const payer = useWatch<CreateBillFormSchema, "drawee">({
    control,
    name: "drawee",
  });

  useEffect(() => {
    if (billType === BILL_TYPE.PROMISSORY_NOTE) {
      setValue("issuance", {
        city: activeIdentity.city ?? "",
        country: activeIdentity.country ?? "",
        date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      });

      setValue("drawee", {
        node_id: activeIdentity.node_id,
        name: activeIdentity.name,
        address: activeIdentity.address ?? "",
      });
    }
  }, [billType, activeIdentity, setValue]);

  const handleSelectPayer = (
    contact: Pick<Contact, "node_id" | "name" | "address">
  ) => {
    setValue("drawee", {
      node_id: contact.node_id,
      name: contact.name,
      address: contact.address,
    });
  };

  return (
    <ContactPicker
      canEdit={billType !== BILL_TYPE.PROMISSORY_NOTE}
      onSelect={handleSelectPayer}
    >
      {payer !== null ? (
        <div className="flex items-center gap-3 py-4 px-3 w-full bg-elevation-200 border border-divider-50 rounded-lg">
          <Picture type={1} name={payer.name} image="" size="sm" />
          <div className="flex flex-col items-start mr-auto">
            <span className="text-text-300 text-base font-medium leading-normal">
              {payer.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-normal">
              {payer.address}
            </span>
          </div>

          {billType !== BILL_TYPE.PROMISSORY_NOTE && (
            <ContactPicker
              canEdit={billType !== BILL_TYPE.PROMISSORY_NOTE}
              onSelect={(contact) => {
                handleSelectPayer(contact);
              }}
            >
              <button className="p-0">
                <PencilIcon className="text-text-300 h-4 w-4 stroke-1" />
              </button>
            </ContactPicker>
          )}
        </div>
      ) : (
        <Placeholder
          label={f({
            id: "bill.create.payer",
            defaultMessage: "Payer",
            description: "Payer label",
          })}
        />
      )}
    </ContactPicker>
  );
}

Payer.formSchema = payerFormSchema;
