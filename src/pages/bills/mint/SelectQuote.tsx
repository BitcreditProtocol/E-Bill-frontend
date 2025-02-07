import { FormattedMessage } from "react-intl";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import SectionTitle from "@/components/typography/SectionTitle";
import Preview from "../components/Preview";
import Quote from "./components/Quote";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { acceptMint, getBillDetails } from "@/services/bills";
import { Suspense } from "react";
import { getQuote } from "@/services/quotes";
import routes from "@/constants/routes";
import { MINT_LIST } from "@/constants/mints";

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

function Information({ id }: { id: string }) {
  const { data: bill } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  return (
    <Preview
      name={bill.drawee.name}
      date={bill.issue_date}
      amount={Number(bill.sum)}
      currency={bill.currency}
    />
  );
}

export default function SelectQuote() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: bill } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id as string),
  });

  const { data: quote } = useSuspenseQuery({
    queryKey: ["quotes", id as string],
    queryFn: () => getQuote(id as string).catch(() => { return null }),
    refetchInterval: 5_000,
  });

  // TODO: remove - fake accepting mint request here
  const { mutate: __dev_doAcceptMint, isPending } = useMutation({
    mutationFn: async () => {
      await acceptMint({
        bill_id: bill.id,
        sum: String(Math.floor(Number(bill.sum) * (0.9 + Math.random() / 10))),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["quotes", id],
      });
    },
  });

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.title"
              defaultMessage="Mint quotes"
              description="Mint quotes page title"
            />
          </PageTitle>
        }
        trail={<></>}
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Information id={id as string} />
        </Suspense>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <SectionTitle>
            <FormattedMessage
              id="bill.mint.selectQuote"
              defaultMessage="Select a quote"
              description="Select a quote section title"
            />
          </SectionTitle>

          <div className="flex flex-col gap-3">
            {MINT_LIST.filter((it) => it.enabled)
              .map((it, index) => {
                return (<div key={index} onClick={() => {
                  if (!quote && !isPending) {
                    __dev_doAcceptMint()
                  }
                }}>
                  {quote ? (<>
                    <Link to={routes.PREVIEW_MINT.replace(":id", quote.bill_id)}>
                      <Quote mintName={it.name} rate={
                        1 - (Number(quote.sum) / Number(bill.sum))
                      } status="accepted" />
                    </Link>
                  </>) : (
                    <Quote mintName={it.name} status="pending" />)}
                </div>);
              })}
            {/*
              <Quote mintName="Fishermans Mint" rate={0.0001} status="declined" />
            */}
          </div>
        </div>

        <Button variant="outline" size="md" className="mt-auto" disabled>
          <FormattedMessage
            id="bill.mint.cancel"
            defaultMessage="Cancel mint request"
            description="Cancel mint request button"
          />
        </Button>
      </div>
    </div>
  );
}
