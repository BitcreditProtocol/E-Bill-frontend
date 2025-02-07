import { z } from "zod";
import { FormattedMessage } from "react-intl";
import { CalculatorIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Button } from "@/components/ui/button";
import ContactPicker from "@/components/Contact/ContactPicker";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";
import Preview from "./components/Preview";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Contact } from "@/types/contact";
import Picture from "@/components/Picture";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";
import { parseISO } from "date-fns";
import Big from "big.js";

function Buyer() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const {
    buyer: { node_id, name, address },
  } = watch();
  const hasSelectedBuyer = !!node_id;
  const select = ({
    node_id,
    name,
    address,
  }: Pick<Contact, "node_id" | "name" | "address">) => {
    setValue("buyer", { node_id, name, address });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-text-300 text-sm font-normal leading-5">
        <FormattedMessage
          id="bill.sell.toTheOrderOf"
          defaultMessage="to the order of"
          description="Label for buyer selection"
        />
      </span>

      <ContactPicker
        onSelect={(contact) => {
          select(contact);
        }}
      >
        {hasSelectedBuyer ? (
          <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
            <Picture type={1} name={name} image="" size="sm" />

            <div className="flex flex-col items-start">
              <span className="text-text-300 text-base font-medium leading-normal">
                {name}
              </span>
              <span className="text-text-200 text-xs font-normal leading-normal">
                {address}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
            <div className="flex items-center gap-2">
              <UserIcon className="text-text-300 h-5 w-5 stroke-1" />

              <span className="text-text-300 text-sm font-medium leading-5">
                <FormattedMessage
                  id="bill.sell.buyer"
                  defaultMessage="Buyer"
                  description="Buyer selection label"
                />
              </span>
            </div>

            <ChevronRightIcon className="text-text-300 h-5 w-5 stroke-1" />
          </div>
        )}
      </ContactPicker>
    </div>
  );
}

function DiscountCalculator() {
  const { watch, setValue } = useFormContext<FormSchema>();
  const {
    discount: { rate, days, start_date, end_date },
    sum,
  } = watch();

  console.log({ rate, days, start_date, end_date, sum });

  const hasDiscount = rate > 0 && days > 0;
  const discountTerms = `${days.toString()} @ ${rate.toString()}%`;

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
    <Drawer>
      <DrawerTrigger className="flex items-center gap-1 p-0 text-text-300 text-xs font-medium leading-normal">
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
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DiscountForm
          startDate={parseISO(start_date)}
          endDate={parseISO(end_date)}
          onSubmit={(values) => {
            console.log(values.discountRate.toString());
            setDiscount({
              sum: values.net.value.round(0).toString(),
              rate: values.discountRate.mul(100).toNumber(),
              days: values.days,
            });
          }}
          gross={{
            value: Big(parseInt(sum)),
            currency: "sat",
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

function Amount() {
  const { register } = useFormContext<FormSchema>();

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
        <DiscountCalculator />
      </div>
      <div className="flex items-center justify-between gap-2 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
        <div className="flex items-center gap-1.5">
          <img src={BitcoinCurrencyIcon} alt="Bitcoin" className="h-5 w-5" />
          <span className="text-text-300 text-sm font-medium leading-5 uppercase">
            btc
          </span>
        </div>
        <input
          {...register("sum", {
            setValueAs: (value: string) => {
              const sanitized = value.replace(/\D/g, "");
              return sanitized ? String(parseInt(sanitized, 10)) : "";
            },
          })}
          className="flex-1 bg-transparent text-right outline-none"
          type="text"
          inputMode="numeric"
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
        />
        <span className="text-text-200 text-[10px] font-normal leading-[14px] lowercase">
          sat
        </span>
      </div>
    </div>
  );
}

const formSchema = z.object({
  bill_id: z.string().min(1),
  buyer: z.object({
    node_id: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
  }),
  discount: z.object({
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    rate: z.number().int().positive(),
    days: z.number().int().positive(),
  }),
  sum: z.string().min(1),
  currency: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Sell() {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill_id: "",
      buyer: {
        node_id: "",
        name: "",
        address: "",
      },
      discount: {
        start_date: "2025-01-01",
        end_date: "2025-03-01",
        rate: 0,
        days: 0,
      },
      sum: "5000",
      currency: "",
    },
  });

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.sell.title"
              defaultMessage="Sell bill"
              description="Sell Bill page title"
            />
          </PageTitle>
        }
      />

      <Preview name="John Doe" amount={1000} currency="SAT" date="2021-10-10" />

      <FormProvider {...methods}>
        <div className="flex-1 flex flex-col gap-6">
          <Buyer />

          <Amount />
        </div>
      </FormProvider>

      <Button className="h-[54px] w-full bg-text-300 text-white font-medium rounded-[8px] py-[18px] px-8">
        <FormattedMessage
          id="Sell"
          defaultMessage="Sell"
          description="Button to trigger bill sell"
        />
      </Button>
    </Page>
  );
}
