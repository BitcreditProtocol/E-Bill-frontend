import { FormattedMessage } from "react-intl";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import SectionTitle from "@/components/typography/SectionTitle";
import Preview from "../components/Preview";
import Quote from "./components/Quote";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { acceptMint, getBillDetails } from "@/services/bills";
import { Suspense, useEffect } from "react";
import { getQuote } from "@/services/quotes";


function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

function Information({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  return (
    <Preview
      name={data.drawee.name}
      date={data.issue_date}
      amount={Number(data.sum)}
      currency="BTC"
    />
  );
}

export default function SelectQuote() {
  const { id } = useParams<{ id: string }>();

  const { data } = useSuspenseQuery({
    queryKey: ["quotes", id as string],
    queryFn: () => getQuote(id as string).catch(() => { return null }),
    refetchInterval: 3_000,
  });

  // TODO: remove - fake accepting mint request here
  useEffect(() => {
    if (data) return;

    const timerId = setTimeout(() => {
      acceptMint({
        bill_id: id as string,
        sum: "1000",
      }).then(() => {
        console.log('Successfully accepted mint request..');
      }).catch(() => {
        console.log('Error while accepting mint request..');
      });
    }, 5_000);

    return () => { clearTimeout(timerId); };
  }, [id, data]);

  console.log(data);

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
            {data ? (<>
              <Quote mintName="Wildcat One" rate={0.0001} status="accepted" />
            </>) : (<>
              <Quote mintName="Wildcat One" rate={0.0001} status="pending" />
            </>)}
            <Quote mintName="Fishermans Mint" rate={0.0001} status="declined" />
          </div>
        </div>

        <Button variant="outline" size="md" className="mt-auto">
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
