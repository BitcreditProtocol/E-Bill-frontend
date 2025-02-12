import { Suspense, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Big from "big.js";
import { parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CalculatorIcon, ChevronRightIcon, UserIcon } from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Button } from "@/components/ui/button";
import ContactPicker from "@/components/Contact/ContactPicker";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";
import Picture from "@/components/Picture";
import { Skeleton } from "@/components/ui/skeleton";
import Sign from "@/components/Sign";
import { useIdentity } from "@/context/identity/IdentityContext";
import { useToast } from "@/hooks/use-toast";
import { getBillDetails, offerToSell } from "@/services/bills";
import routes from "@/constants/routes";
import type { Contact } from "@/types/contact";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";
import Preview from "./components/Preview";

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-16 w-full bg-elevation-200" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/3 bg-elevation-200" />
        <Skeleton className="h-16 w-full bg-elevation-200" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/3 bg-elevation-200" />
        <Skeleton className="h-16 w-full bg-elevation-200" />
      </div>
    </div>
  );
}

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
          type="text"
          inputMode="numeric"
          className="flex-1 bg-transparent text-right outline-none"
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

function Form() {
  const { id } = useParams() as { id: string };
  const { formatMessage: f } = useIntl();
  const { activeIdentity } = useIdentity();
  const [signOpen, setSignOpen] = useState(false);

  const { data } = useSuspenseQuery({
    queryFn: () => getBillDetails(id),
    queryKey: ["bills", id],
  });

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill_id: data.id,
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
      sum: data.sum,
      currency: data.currency,
    },
  });

  const { buyer, sum, discount } = methods.watch();
  const canOfferToSell =
    !!buyer.node_id && !!sum && !!discount.rate && !!discount.days;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const bill = {
        bill_id: methods.getValues("bill_id"),
        buyer: methods.getValues("buyer.node_id"),
        sum: methods.getValues("sum"),
        currency: methods.getValues("currency"),
      };

      return offerToSell({
        ...bill,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        title: f({
          id: "bill.sell.offer.success",
          defaultMessage: "Success!",
          description: "Bill sell success toast",
        }),
        description: f({
          id: "bill.sell.offer.success.description",
          defaultMessage: "The bill has been offered for sale",
          description: "Bill sell success toast description",
        }),
        position: "bottom-center",
      });
    },
    onError: () => {
      toast({
        title: f({
          id: "bill.sell.offer.error",
          defaultMessage: "Error!",
          description: "Bill sell error toast",
        }),
        description: f({
          id: "bill.sell.offer.error.description",
          defaultMessage: "An error occurred while offering the bill for sale",
          description: "Bill sell error toast description",
        }),
        variant: "error",
        position: "bottom-center",
      });
    },
    onSettled: () => {
      setSignOpen(!signOpen);
    },
  });

  const isHolder = data.drawer.node_id === activeIdentity.node_id;
  const isOfferedForSale = data.seller !== null && data.waiting_for_payment;

  const signSale = () => {
    if (isHolder && !isOfferedForSale) {
      mutate();
    }
  };

  return !isHolder ? (
    <Navigate to={routes.VIEW_BILL.replace(":id", id)} />
  ) : (
    <>
      <Preview
        name={data.drawer.name}
        amount={parseInt(data.sum)}
        currency={data.currency}
        date={data.issue_date}
      />

      <FormProvider {...methods}>
        <div className="flex-1 flex flex-col gap-6">
          <Buyer />
          <Amount />

          <div className="mt-auto">
            <Sign
              open={signOpen}
              onOpenChange={() => {
                setSignOpen(!signOpen);
              }}
              title={f({
                id: "bill.sell.sign.title",
                defaultMessage: "Are you sure?",
                description: "Sign confirmation title",
              })}
              description={f({
                id: "bill.sell.sign.description",
                defaultMessage: "The signing of the sale is legally binding",
                description: "Sign confirmation description",
              })}
              confirm={
                <Button
                  size="md"
                  disabled={!canOfferToSell || isPending}
                  onClick={() => {
                    signSale();
                  }}
                >
                  <FormattedMessage
                    id="bill.sell.sign.confirm"
                    defaultMessage="Confirm"
                    description="Button to confirm bill sell action"
                  />
                </Button>
              }
              cancel={
                <Button
                  className="w-full"
                  size="md"
                  variant="outline"
                  disabled={isPending}
                >
                  <FormattedMessage
                    id="bill.sell.sign.cancel"
                    defaultMessage="Cancel"
                    description="Button to cancel bill sell action"
                  />
                </Button>
              }
            >
              <Button className="w-full" size="md" disabled={!canOfferToSell}>
                <FormattedMessage
                  id="bill.sell.sign"
                  defaultMessage="Sign"
                  description="Button to trigger bill sell signature"
                />
              </Button>
            </Sign>
          </div>
        </div>
      </FormProvider>
    </>
  );
}

export default function Sell() {
  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.sell.title"
              defaultMessage="Sell bill"
              description="Sell bill page title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Form />
      </Suspense>
    </Page>
  );
}
