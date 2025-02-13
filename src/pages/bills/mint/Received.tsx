import { FormattedMessage } from "react-intl";
import { CircleCheckIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import Label from "@/components/typography/Label";
import { FormattedCurrency } from "@/components/FormattedCurrency";

import Preview from "../components/Preview";
import Mint from "./components/Mint";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBillDetails } from "@/services/bills";
import { getQuote } from "@/services/quotes";
import EcashToken from "./components/EcashToken";
import { Suspense, useMemo, useState } from "react";
import { useLanguage } from "@/context/language/LanguageContext";
import { formatDateAndTime } from "@/utils/dates";
import { MintConfig, readMintConfig } from "@/constants/mints";
import { Skeleton } from "@/components/ui/skeleton";
import { BillFull } from "@/types/bill";

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

function ReceivedInner({ bill_id: id } : { bill_id: BillFull["id"] }) {
  const lang = useLanguage();

  const [mintConfig] = useState<MintConfig>(readMintConfig());

  const { data: bill } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  const { data: quote } = useSuspenseQuery({
    queryKey: ["quotes", id],
    queryFn: () => getQuote(id),
  });

  const lastEndorseBlocks = useMemo(() => {
    const endorsements = bill.chain_of_blocks.blocks.filter((it) => it.op_code === 'Endorse');
    return endorsements.length > 0 ? endorsements[endorsements.length - 1] : undefined;
  }, [bill]);

  return (<>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <CircleCheckIcon className="text-signal-success w-12 h-12 stroke-1" />

          <h1 className="text-text-300 text-2xl font-medium">
            <FormattedMessage
              id="bill.mint.received.paymentReceived"
              defaultMessage="Received"
              description="Payment received title"
            />
          </h1>

          {lastEndorseBlocks && (<span className="text-text-200 text-base font-medium">
            {formatDateAndTime(new Date(lastEndorseBlocks.timestamp * 1000), lang.locale)}
          </span>)}
        </div>
        <div className="flex items-center gap-1">
          <FormattedCurrency
            className="text-lg font-medium"
            value={Number(quote.sum)}
            type="credit"
          />
          <span className="text-text-200 text-[10px] font-normal">sat</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-auto">
        <div className="flex flex-col gap-3">
          <Label>
            <FormattedMessage
              id="bill.mint.received.billMinted"
              defaultMessage="Bill minted"
              description="Bill minted label"
            />
          </Label>

          <Preview
            name={bill.drawee.name}
            date={bill.issue_date}
            amount={Number(bill.sum)}
            currency={bill.currency}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>
            <FormattedMessage
              id="bill.mint.received.mintedBy"
              defaultMessage="By"
              description="Bill minted by label"
            />
          </Label>

          <Mint name={mintConfig.wildcatOne.name} nodeId={mintConfig.wildcatOne.node_id} />
        </div>
      </div>

      <EcashToken token={quote.token} />
    </>
  );
}

export default function Received() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar lead={<NavigateBack />} trail={<></>} />

      <Suspense fallback={<Loader />}>
        <ReceivedInner bill_id={id as string} />
      </Suspense>
    </div>
  );
}
