import { FormattedMessage } from "react-intl";
import {
  CalculatorIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleXIcon,
  LoaderIcon,
} from "lucide-react";

import { z } from "zod";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Label from "@/components/typography/Label";
import SectionTitle from "@/components/typography/SectionTitle";

import Preview from "../components/Preview";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { __dev_findInListAllIfMintViewIsEnabledOrThrow, readMintConfig } from "@/constants/mints";
import { getBillDetails } from "@/services/bills";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Picture from "@/components/Picture";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";
import { parseISO } from "date-fns";
import Big from "big.js";
import { BillFull } from "@/types/bill";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FormattedCurrency } from "@/components/FormattedCurrency";

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

type MintRequestProps = {
  bill: BillFull
}

function MintRequest({ bill } : MintRequestProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-elevation-200 border border-divider-75 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <LoaderIcon className="text-text-300 h-4 w-4 stroke-1 animate-spin" />
          <Label>
            <FormattedMessage
              id="bill.mint.requestToMint"
              defaultMessage="Request to mint"
              description="Request to mint label"
            />
          </Label>
        </div>

        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>

      <Preview
        className="bg-elevation-50 border-divider-75"
        name={bill.drawee.name}
        date={bill.issue_date}
        amount={Number(bill.sum)}
        currency={bill.currency}
      />
    </div>
  );
}

function DiscountCalculator({ children, bill }: PropsWithChildren<{ bill: BillFull }>) {
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext<FormSchema>();
  const {
    discount: { start_date, end_date }
  } = watch();

  const setDiscount = ({
    sum,
    rate,
    days,
  }: {
    sum: string;
    rate: number;
    days: number;
  }) => {
    setValue("discount", { rate, days, start_date, end_date });
    setValue("sum", sum);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center gap-1 p-0 text-text-300 text-xs font-medium leading-normal">
        {children}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DiscountForm
          startDate={start_date}
          endDate={end_date}
          onSubmit={(values) => {
            setDiscount({
              sum: values.net.value.round(0).toString(),
              rate: values.discountRate.mul(100).toNumber(),
              days: values.days,
            });
            setOpen(false);
          }}
          gross={{
            value: Big(parseInt(bill.sum)),
            currency: bill.currency,
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

function DiscountRate({ bill }: { bill: BillFull }) {
  const { watch } = useFormContext<FormSchema>();
  const {
    discount: { rate, days },
    sum
  } = watch();
  const hasDiscount = rate > 0 && days > 0;
  const discountTerms = `${days.toString()} @ ${rate.toString()}%`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-text-300 text-sm font-normal leading-5">
          <FormattedMessage
            id="bill.sell.forTheSumOf"
            defaultMessage="for the sum of"
            description="Label for bill value input"
          />
        </span>
        <DiscountCalculator bill={bill}>
          <>
            <CalculatorIcon className="text-text-300 h-4 w-4 stroke-1" />
            {hasDiscount ? (
              discountTerms
            ) : (
              <FormattedMessage
                id="bill.sell.calculateDiscount"
                defaultMessage="Calculate discount"
                description="Calculate discount button"
              />
            )}
          </>
        </DiscountCalculator>
      </div>
      <div className="flex items-center justify-between gap-1 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
        <div className="flex items-center gap-1.5">
          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="bill.mintRequest.discountRate.label.text"
              defaultMessage="Discount Rate"
              description="Discount rate label on Mint Request page"
            />
          </span>
        </div>
        <input
          value={rate}
          type="text"
          inputMode="numeric"
          className="flex-1 bg-transparent text-right outline-none"
          readOnly
        />
        <div className="">
          %
        </div>
      </div>
      <div className="flex items-center justify-between gap-1.5 mb-2 text-text-200 ">
        <div>
          <FormattedMessage
            id="bill.mintRequest.netAmount.label.text"
            defaultMessage="Net amount"
            description="Net amount label on Mint Request page"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            {sum === undefined ? (<>?</>) : (<>
              <FormattedCurrency
                value={Number(sum)}
                color="none"
              />
              <span className="text-text-200 text-[10px] font-normal">sat</span>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
}


const formSchema = z.object({
  bill_id: z.string().min(1),
  discount: z.object({
    start_date: z.date(),
    end_date: z.date(),
    rate: z.number().int().positive(),
    days: z.number().int().positive(),
  }),
  sum: z.string().min(1).or(z.undefined()),
  currency: z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

export default function Request() {
  const { id } = useParams<{ id: string }>();
    const mintConfig = useMemo(() => readMintConfig(), []);

  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id as string).catch((err: unknown) => {
      // try to fetch the bill from the "list all" endpoint if mint view is enabled
      return __dev_findInListAllIfMintViewIsEnabledOrThrow(id as string, mintConfig, err)
    }),
  });

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill_id: data.id,
      discount: {
        start_date: parseISO(data.issue_date),
        end_date: parseISO(data.maturity_date),
        rate: 1,
        days: 0,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.request.title"
              defaultMessage="Request to mint"
              description="Request to mint page title"
            />
          </PageTitle>
        }
        trail={<></>}
      />

      <Suspense fallback={<Loader />}>
        <div className="flex-1 flex flex-col gap-5 justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Picture type={0} name={data.drawer.name} image="" size="md" />
              <div className="flex flex-col gap-0.5">
                <SectionTitle>{data.drawer.name}</SectionTitle>
                <div className="flex gap-0.5 text-text-200 text-sm font-medium">
                  <span>{data.drawer.address},</span>
                  <span>{data.drawer.city},</span>
                  <span>{data.drawer.country}</span>
                </div>
              </div>
            </div>

            <MintRequest bill={data}/>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <FormProvider {...methods}>
                <DiscountRate bill={data}/>
              </FormProvider>
            </div>
            <div className="flex gap-2">
              <Button className="w-full gap-2" variant="outline" size="md" disabled>
                <CircleXIcon className="text-text-300 h-5 w-5 stroke-1" />

                <FormattedMessage
                  id="bill.mint.request.reject"
                  defaultMessage="Reject"
                  description="Reject button label"
                />
              </Button>

              <Button className="w-full gap-2" variant="outline" size="md">
                <CheckIcon className="text-text-300 h-5 w-5 stroke-1" />

                <FormattedMessage
                  id="bill.mint.request.quote"
                  defaultMessage="Quote"
                  description="Quote button label"
                />
              </Button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
