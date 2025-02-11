import { FormattedMessage } from "react-intl";
import {
  CheckIcon,
  ChevronRightIcon,
  CircleXIcon,
  LoaderIcon,
} from "lucide-react";

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
import { Suspense, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BillFull } from "@types/bill";
import Picture from "@/components/Picture";

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

        <div className="flex flex-col">
          <div className="flex gap-2">
            <Button className="w-full gap-2" variant="outline" size="md">
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
      </Suspense>
    </div>
  );
}
