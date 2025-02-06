import { FormattedMessage } from "react-intl";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import Label from "@/components/typography/Label";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";

import Mint from "./components/Mint";
import EcashAddress from "./components/EcashAddress";
import Sign from "./components/Sign";
import BillPreview from "../components/Preview";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBillDetails } from "@/services/bills";
import { Suspense } from "react";

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
    <BillPreview
      name={data.drawee.name}
      date={data.issue_date}
      amount={Number(data.sum)}
      currency="BTC"
    />
  );
}

export default function Preview() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.preview.title"
              defaultMessage="Preview mint"
              description="Preview mint page title"
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

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>
              <FormattedMessage
                id="bill.mint.preview.toTheOrderOf"
                defaultMessage="to the order of"
                description="To the order of label"
              />
            </Label>

            <Mint name="Wildcat One" pubkey="npub1eajvs...agcd93" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              <FormattedMessage
                id="bill.mint.preview.forTheSumOf"
                defaultMessage="for the sum of"
                description="For the sum of label"
              />
            </Label>

            <div className="flex items-center justify-between py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
              <div className="flex gap-1.5">
                <img src={BitcoinCurrencyIcon} />
                <span className="text-text-300 text-sm font-medium leading-5">
                  BTC
                </span>
              </div>

              <div className="flex items-center gap-1 self-end">
                <FormattedCurrency
                  className="text-sm font-medium leading-5"
                  value={1.11092}
                  type="credit"
                />
                <span className="text-text-200 text-[10px]">BTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <EcashAddress address="bitcr2df3ee...s43ek1" />
        <Sign />
      </div>
    </div>
  );
}
