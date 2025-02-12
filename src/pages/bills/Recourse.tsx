import { Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarIcon } from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Picture from "@/components/Picture";
import {
  getBillDetails,
  getPastEndorsees,
  requestAcceptanceRecourse,
} from "@/services/bills";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Sign from "@/components/Sign";
import { useToast } from "@/hooks/use-toast";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";
import Preview from "./components/Preview";

type HolderProps = {
  node_id: string;
  name: string;
  /*   address: {
    country: string;
    city: string;
    address: string;
    zip: string;
  };
  timestamp: number; */
  signing_timestamp: number;
};

function Holder({ node_id, name, signing_timestamp }: HolderProps) {
  const { setValue } = useFormContext<FormSchema>();

  // const formattedAddress = `${address.city}, ${address.country}`;
  const formattedDate = format(
    new Date(signing_timestamp * 1000),
    "dd MMM yyyy"
  );

  const selectAsHolder = useCallback(() => {
    setValue("recoursee", {
      node_id,
      name,
      signing_timestamp,
    });
  }, [setValue, node_id, name, signing_timestamp]);

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={selectAsHolder}
    >
      <Picture type={1} name={name} image="" size="md" />
      <div className="flex flex-col gap-1 mr-auto">
        <span className="text-text-300 text-sm font-medium leading-5">
          {name}
        </span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="text-text-200 h-4 w-4 stroke-1" />
          <span className="text-text-200 text-xs font-normal leading-normal">
            {formattedDate}
          </span>
        </div>
      </div>
      <RadioGroupItem value={node_id} />
    </div>
  );
}

function PreviousHolders() {
  const { id } = useParams() as { id: string };

  const { data } = useSuspenseQuery({
    queryFn: () => getPastEndorsees(id),
    queryKey: ["bill", id, "past_endorsees"],
  });

  const { watch } = useFormContext<FormSchema>();
  const selectedHolder = watch("recoursee");

  return (
    <div className="flex flex-col mb-auto">
      <div className="flex flex-col gap-1 py-4">
        <span className="text-text-300 text-base font-medium leading-normal">
          <FormattedMessage
            id="bill.recourse.holders"
            defaultMessage="Prior holders"
            description="Prior holders of the bill"
          />
        </span>
        <span className="text-text-200 text-base font-normal leading-normal">
          <FormattedMessage
            id="bill.recourse.holders.description"
            defaultMessage="Select a prior holder for recourse"
            description="Description for selecting the prior holder of the bill"
          />
        </span>
      </div>

      <RadioGroup value={selectedHolder.node_id} name="recoursee">
        <div className="flex flex-col gap-4">
          {data.past_endorsees.length === 0 ? (
            <>
              <Separator className="bg-divider-75" />
              <div className="py-3 text-text-200 text-sm font-normal leading-normal mx-auto">
                <FormattedMessage
                  id="bill.recourse.noHolders"
                  defaultMessage="No prior holders"
                  description="No prior holders of the bill"
                />
              </div>
            </>
          ) : (
            data.past_endorsees.map((endorsee, index) => (
              <>
                <Holder
                  key={endorsee.pay_to_the_order_of.node_id}
                  node_id={endorsee.pay_to_the_order_of.node_id}
                  name={endorsee.pay_to_the_order_of.name}
                  // address={endorsee.signing_address}
                  signing_timestamp={endorsee.signing_timestamp}
                />
                {index < data.past_endorsees.length - 1 && (
                  <Separator className="bg-divider-75" />
                )}
              </>
            ))
          )}
        </div>
      </RadioGroup>
    </div>
  );
}

function Details() {
  const { id } = useParams() as { id: string };

  const { data } = useSuspenseQuery({
    queryFn: () => getBillDetails(id),
    queryKey: ["bill", id],
  });

  const { watch, setValue } = useFormContext<FormSchema>();
  const selectedHolder = watch("recoursee");

  setValue("bill.drawer", {
    node_id: data.drawer.node_id,
    name: data.drawer.name,
  });
  setValue("bill.sum", data.sum);
  setValue("bill.currency", data.currency);
  setValue("bill.issue_date", data.issue_date);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Preview
        name={data.drawer.name}
        amount={parseInt(data.sum)}
        currency={data.currency}
        date={data.issue_date}
      />

      <PreviousHolders />

      <Button
        size="md"
        disabled={selectedHolder.node_id === ""}
        onClick={() => {
          setValue("selected", true);
        }}
      >
        Select
      </Button>
    </div>
  );
}

function Review() {
  const [signOpen, setSignOpen] = useState(false);
  const { formatMessage: f } = useIntl();
  const { watch } = useFormContext<FormSchema>();
  const bill = watch("bill");
  const recoursee = watch("recoursee");

  const formattedDate = format(
    new Date(recoursee.signing_timestamp * 1000),
    "dd MMM yyyy"
  );

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return requestAcceptanceRecourse({
        bill_id: bill.bill_id,
        recoursee: recoursee.node_id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", bill.bill_id],
      });

      toast({
        title: f({
          id: "bill.recourse.success",
          defaultMessage: "Success!",
          description: "Bill recourse success toast",
        }),
        description: f({
          id: "bill.recourse.success.description",
          defaultMessage: "The recourse has been requested successfully",
          description: "Bill recourse success toast description",
        }),
        position: "bottom-center",
      });
    },
    onError: () => {
      toast({
        title: f({
          id: "bill.recourse.error",
          defaultMessage: "Error!",
          description: "Bill recourse error toast",
        }),
        description: f({
          id: "bill.recourse.error.description",
          defaultMessage: "An error occurred while requesting the recourse",
          description: "Bill recourse error toast description",
        }),
        variant: "error",
        position: "bottom-center",
      });
    },
    onSettled: () => {
      setSignOpen(!signOpen);
    },
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Preview
        name={bill.drawer.name}
        amount={parseInt(bill.sum)}
        currency={bill.currency}
        date={bill.issue_date}
      />

      <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
        <Picture type={1} name={recoursee.name} image="" size="md" />
        <div className="flex flex-col gap-1 mr-auto">
          <span className="text-text-300 text-sm font-medium leading-5">
            {recoursee.name}
          </span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="text-text-200 h-4 w-4 stroke-1" />
            <span className="text-text-200 text-xs font-normal leading-normal">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="bill.recourse.sumOf"
            defaultMessage="Request the sum of"
            description="Request the sum of the bill"
          />
        </span>
        <div className="flex items-center justify-between py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex items-center gap-1 text-text-300 text-sm font-medium leading-5">
            <img src={BitcoinCurrencyIcon} alt="Bitcoin" className="h-5 w-5" />
            BTC
          </div>
          <div className="flex items-center gap-1">
            <FormattedCurrency
              value={Number(bill.sum)}
              className="text-sm font-medium leading-5"
            />
            <span className="text-text-200 text-[10px] font-normal leading-[14px]">
              {bill.currency}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Sign
          open={signOpen}
          onOpenChange={() => {
            setSignOpen(!signOpen);
          }}
          title={f({
            id: "bill.recourse.sign.title",
            defaultMessage: "Are you sure?",
            description: "Sign confirmation title",
          })}
          description={f({
            id: "bill.recourse.sign.description",
            defaultMessage: "This recourse request is legally binding",
            description: "Sign confirmation description",
          })}
          confirm={
            <Button
              size="md"
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
            >
              <FormattedMessage
                id="bill.recourse.sign.confirm"
                defaultMessage="Confirm"
                description="Button to confirm bill recourse request action"
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
                id="bill.recourse.sign.cancel"
                defaultMessage="Cancel"
                description="Button to cancel bill recourse request action"
              />
            </Button>
          }
        >
          <Button className="w-full" size="md" disabled={isPending}>
            <FormattedMessage
              id="bill.recourse.request.sign"
              defaultMessage="Sign"
              description="Button to trigger bill recourse signature"
            />
          </Button>
        </Sign>
      </div>
    </div>
  );
}

const formSchema = z.object({
  bill: z.object({
    bill_id: z.string().min(1),
    drawer: z.object({
      node_id: z.string().min(1),
      name: z.string().min(1),
    }),
    issue_date: z.string(),
    sum: z.string(),
    currency: z.string(),
  }),
  recoursee: z.object({
    node_id: z.string().min(1),
    name: z.string().min(1),
    signing_timestamp: z.number(),
  }),
  sum: z.number().optional(),
  currency: z.string().optional(),
  // form state
  selected: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

function Form() {
  const { id } = useParams() as { id: string };

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bill: {
        bill_id: id,
        drawer: {
          node_id: "",
          name: "",
        },
        issue_date: "",
        sum: "",
        currency: "sat",
      },
      recoursee: {
        node_id: "",
        name: "",
        signing_timestamp: 0,
      },
      sum: 0,
      currency: "sat",
      selected: false,
    },
  });

  const isRecourseeSelected = methods.watch("selected");

  return (
    <FormProvider {...methods}>
      {isRecourseeSelected ? <Review /> : <Details />}
    </FormProvider>
  );
}

export default function Recourse() {
  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle className="text-signal-error">
            <FormattedMessage
              id="bill.recourse.title"
              defaultMessage="Request recourse"
              description="Title for request recourse page"
            />
          </PageTitle>
        }
      />
      <Suspense fallback={<>Loading</>}>
        <Form />
      </Suspense>
    </Page>
  );
}
