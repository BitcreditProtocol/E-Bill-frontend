import { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import { FormattedMessage } from "react-intl";
import {
  SquareArrowOutUpRightIcon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Picture from "@/components/Picture";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useIdentity } from "@/context/identity/IdentityContext";
import { getBillDetails } from "@/services/bills";
import { truncateString } from "@/utils/strings";
import routes from "@/constants/routes";
import type { BillFull } from "@/types/bill";
import LoaderIcon from "@/assets/icons/loader.svg";
import Preview from "./components/Preview";

function Loader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <Skeleton className="h-32 w-32 bg-elevation-250 rounded-xl" />

      <Skeleton className="h-16 w-full bg-elevation-250" />
      <Skeleton className="h-16 w-full bg-elevation-250" />
      <Skeleton className="h-16 w-full bg-elevation-250" />
    </div>
  );
}

type PaymentProps = Pick<
  BillFull,
  "drawer" | "issue_date" | "currency" | "address_to_pay" | "link_for_buy"
>;

function Payment({
  drawer,
  issue_date,
  currency,
  address_to_pay,
  link_for_buy,
}: PaymentProps) {
  const sum = link_for_buy.match(/[?&]amount=([^&]*)/)?.[1] as string;

  return (
    <div className="flex-1 flex flex-col items-center justify-evenly">
      <div className="flex items-center justify-center h-40 w-40 bg-elevation-250 rounded-xl">
        <QRCodeSVG bgColor="#F2EDDF" value={link_for_buy} />
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-300 text-sm font-medium">
            <FormattedMessage
              id="bill.offer.payment.address"
              defaultMessage="Address to pay"
              description="Address to pay label"
            />
          </span>

          <div className="flex items-center gap-2">
            <span className="max-w-64 text-text-200 text-base font-normal text-center leading-6 break-all mx-5">
              {address_to_pay}
            </span>

            <CopyToClipboardButton value={address_to_pay} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-text-300 text-sm font-medium">
            <FormattedMessage
              id="bill.offer.payment.link"
              defaultMessage="Link to pay"
              description="Link to pay label"
            />
          </span>

          <div className="flex items-center gap-2">
            <span className="max-w-64 text-text-200 text-base font-normal text-center leading-6 break-all">
              {truncateString(link_for_buy, 12)}
            </span>

            <button className="p-0" onClick={() => window.open(link_for_buy)}>
              <SquareArrowOutUpRightIcon className="text-text-200 w-4 h-4 stroke-1" />
            </button>
          </div>
        </div>
      </div>

      <Preview
        className="w-full"
        name={drawer.name}
        amount={parseInt(sum)}
        currency={currency}
        date={issue_date}
      />
    </div>
  );
}

type StatusProps = Pick<
  BillFull,
  | "drawer"
  | "buyer"
  | "time_of_drawing"
  | "issue_date"
  | "currency"
  | "link_for_buy"
> & { status: "success" | "failed" | "pending" };

function Status({
  status,
  drawer,
  buyer,
  time_of_drawing,
  issue_date,
  currency,
  link_for_buy,
}: StatusProps) {
  const sum = link_for_buy.match(/(?:[?&]amount=)(\d+)/)?.[1] as string;

  const statusMessage = {
    pending: "Pending",
    success: "Received",
    failed: "Failed",
  }[status];

  const icon = {
    pending: (
      <img
        src={LoaderIcon}
        alt="Loader"
        className="w-12 h-12 animate-spin ease-in-out"
      />
    ),
    success: (
      <CircleCheckIcon className="text-signal-success w-12 h-12 stroke-1" />
    ),
    failed: <CircleXIcon className="text-signal-error w-12 h-12 stroke-1" />,
  }[status];

  return (
    <div className="flex-1 flex flex-col justify-evenly gap-3">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          {icon}

          <h1 className="text-text-300 text-2xl font-medium">
            {statusMessage}
          </h1>

          <span className="text-text-200 text-base font-medium">
            {format(new Date(time_of_drawing * 1000), "dd-MMM-yyyy 'at' HH:mm")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FormattedCurrency
            className="text-lg font-medium"
            value={Number(sum)}
            type="credit"
          />
          <span className="text-text-200 text-[10px] font-normal">sat</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="bill.offer.id"
              defaultMessage="Sell bill"
              description="Bill offered to be sold"
            />
          </span>
          <Preview
            name={drawer.name}
            amount={parseInt(sum)}
            currency={currency}
            date={issue_date}
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="bill.offer.buyer"
              defaultMessage="Payment from"
              description="Buyer of the offered bill"
            />
          </span>
          <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg mb-10">
            <Picture type={1} name={buyer?.name || ""} image="" size="sm" />

            <div className="flex flex-col items-start">
              <span className="text-text-300 text-base font-medium leading-normal">
                {buyer?.name}
              </span>
              <span className="text-text-200 text-xs font-normal leading-normal">
                {buyer?.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Details() {
  const { id } = useParams() as { id: string };
  const { activeIdentity } = useIdentity();

  const { data } = useSuspenseQuery({
    queryKey: ["bill", id],
    queryFn: () => getBillDetails(id),
  });

  const isOfferedForSale = data.seller !== null && data.waiting_for_payment;
  const isBuyer =
    data.buyer?.node_id === activeIdentity.node_id && data.waiting_for_payment;

  const status =
    !data.waiting_for_payment && !data.paid
      ? "failed"
      : !data.waiting_for_payment && data.paid
      ? "success"
      : "pending";

  if (!isOfferedForSale) {
    return <Navigate to={routes.VIEW_BILL.replace(":id", id)} />;
  }

  return isBuyer ? (
    <Payment
      drawer={data.drawer}
      issue_date={data.issue_date}
      currency={data.currency}
      address_to_pay={data.address_to_pay}
      link_for_buy={data.link_for_buy}
    />
  ) : (
    <Status
      status={status}
      drawer={data.drawer}
      buyer={data.buyer}
      time_of_drawing={data.time_of_drawing}
      issue_date={data.issue_date}
      currency={data.currency}
      link_for_buy={data.link_for_buy}
    />
  );
}

export default function Offer() {
  return (
    <Page className="pb-16" displayBottomNavigation>
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.offer.title"
              defaultMessage="Bill offer"
              description="Bill offer title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Details />
      </Suspense>
    </Page>
  );
}
