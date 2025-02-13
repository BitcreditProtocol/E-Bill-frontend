import { useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormattedMessage } from "react-intl";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Label from "@/components/typography/Label";
import { Button } from "@/components/ui/button";
import { Payee, Payer } from "./Peers";
import PaymentDate from "./PaymentDate";
import Issuance from "./Issuance";
import Amount from "./Amount";
import PlaceOfPayment from "./PlaceOfPayment";
import Invoice from "./Invoice";
import Preview from "./Preview";

const formSchema = z
  .object({
    type: z.number(),
    payee: Payee.formSchema,
    drawee: Payer.formSchema,
    issuance: Issuance.formSchema,
    payment: PlaceOfPayment.formSchema.merge(PaymentDate.formSchema).nullable(),
    billing: Amount.formSchema,
    language: z.string().min(1),
    invoice: Invoice.formSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.issuance) {
      ctx.addIssue({
        path: ["issuance"],
        message: "Issuance details are required.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.payee) {
      ctx.addIssue({
        path: ["payee"],
        message: "Payee details are required.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.drawee) {
      ctx.addIssue({
        path: ["drawee"],
        message: "Drawee details are required.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.payment) {
      ctx.addIssue({
        path: ["payment"],
        message: "Payment details are required.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.billing.sum) {
      ctx.addIssue({
        path: ["billing", "sum"],
        message: "Amount is required.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type CreateBillFormSchema = z.infer<typeof formSchema>;

function Details({
  setIsPreviewing,
}: {
  setIsPreviewing: (value: boolean) => void;
}) {
  const [isValid, setIsValid] = useState(false);
  const { control, trigger } = useFormContext<CreateBillFormSchema>();
  const bill = useWatch<CreateBillFormSchema>({ control });

  useEffect(() => {
    const validate = async () => {
      const isValid = await trigger();

      setIsValid(isValid);
    };

    void validate();
  }, [bill, trigger]);

  return (
    <div className="flex-1 flex flex-col justify-between ">
      <div className="flex flex-col gap-4 mb-auto">
        <Issuance />

        <span className="text-text-300 text-xl font-medium leading-normal">
          <FormattedMessage
            id="bill.create.billOfExchange"
            defaultMessage="Against this bill of exchange"
            description="Bill of exchange label"
          />
        </span>

        <div className="flex flex-col gap-2">
          <Label className="font-normal">
            <FormattedMessage
              id="bill.create.payOn"
              defaultMessage="pay on"
              description="pay on label"
            />
          </Label>
          <PaymentDate />
        </div>

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

        <Amount />

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

        <PlaceOfPayment />

        <Invoice />
      </div>

      <Button
        className="w-full"
        onClick={() => {
          setIsPreviewing(true);
        }}
        disabled={!isValid}
      >
        <FormattedMessage
          id="bill.create.preview"
          defaultMessage="Preview"
          description="Preview button"
        />
      </Button>
    </div>
  );
}

export default function Create() {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const methods = useForm<CreateBillFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 0,
      issuance: null,
      payment: null,
      billing: {
        sum: null,
        discount: null,
        currency: "sat",
      },
      language: "en-US",
      payee: null,
      drawee: null,
      invoice: {
        has_selected_file: false,
        file_name: "",
        file_size: 0,
        file_upload_id: null,
      },
    },
  });

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.create.title"
              defaultMessage="Draw bill"
              description="Create a new bill title"
            />
          </PageTitle>
        }
      />

      <FormProvider {...methods}>
        <Details setIsPreviewing={setIsPreviewing} />
        {isPreviewing && <Preview />}
      </FormProvider>
    </Page>
  );
}
