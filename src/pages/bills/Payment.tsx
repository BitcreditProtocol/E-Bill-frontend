import { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CircleCheckIcon,
  CircleXIcon,
  CopyIcon,
  LandmarkIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import RefreshButton from "@/components/RefreshButton";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { Skeleton } from "@/components/ui/skeleton";
import { findHolder } from "@/utils/bill";
import { truncateString } from "@/utils/strings";
import { toast } from "@/hooks/use-toast";
import {
  checkBillInDHT,
  getBillDetails,
  getPrivateKey,
} from "@/services/bills";
import { getActiveIdentity } from "@/services/identity_v2";
import LoaderIcon from "@/assets/icons/loader.svg";
import Preview from "./components/Preview";

function Loader() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Skeleton className="h-24 w-32 bg-elevation-200" />
      <Skeleton className="h-20 w-full bg-elevation-200" />
      <Skeleton className="h-20 w-full bg-elevation-200" />
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

function Information({ id }: { id: string }) {
  const { data: activeIdentity } = useSuspenseQuery({
    queryFn: () => getActiveIdentity(),
    queryKey: ["identity", "active"],
  });

  const { data } = useSuspenseQuery({
    queryFn: () => getBillDetails(id),
    queryKey: ["bill", id],
  });

  const holder = findHolder(data);
  const isPayer = data.drawee.node_id === activeIdentity.node_id;
  const isHolder = holder.node_id === activeIdentity.node_id;
  const role = isPayer ? "payer" : isHolder ? "holder" : null;

  const { data: privateKeyData } = useQuery({
    queryFn: () => getPrivateKey(id),
    queryKey: ["bill", id, "private_key"],
    enabled: role === "holder",
  });

  const status =
    data.requested_to_pay && !data.paid
      ? "pending"
      : data.paid
      ? "success"
      : "failed";

  const statusMessage = {
    pending: "Pending",
    success: "Success",
    failed: "Failed",
  }[status];

  const billPaymentMessage = {
    pending: "Payment pending",
    success: "Payment received",
    failed: "Payment failed",
  }[status];

  const icon = {
    pending: (
      <img
        src={LoaderIcon}
        alt="Loader"
        className={"w-12 h-12 animate-spin ease-in-out"}
      />
    ),
    success: (
      <CircleCheckIcon className="text-signal-success w-12 h-12 stroke-1" />
    ),
    failed: <CircleXIcon className="text-signal-error w-12 h-12 stroke-1" />,
  }[status];

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          {icon}

          <h1 className="text-text-300 text-2xl font-medium">
            {statusMessage}
          </h1>

          <span className="text-text-200 text-base font-medium">
            {format(
              new Date(data.time_of_drawing * 1000),
              "dd-MMM-yyyy 'at' HH:mm"
            )}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FormattedCurrency
            className="text-lg font-medium"
            value={Number(data.sum)}
            type="credit"
          />
          <span className="text-text-200 text-[10px] font-normal">
            {data.currency}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              {billPaymentMessage}
            </span>

            <Preview
              name={data.payee.name}
              date={format(
                new Date(parseISO(data.issue_date)).toUTCString(),
                "dd-MMM-yyyy"
              )}
              amount={Number(data.sum)}
              currency="sat"
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.payment.info.from"
                defaultMessage="Payment from"
                description="Payment from label"
              />
            </span>

            <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
              <div className="flex items-center justify-center h-10 w-10 bg-elevation-50 border border-divider-50 rounded-full">
                <LandmarkIcon className="text-text-300 w-5 h-5 stroke-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-text-300 text-base font-medium leading-6">
                  {data.drawer.name}
                </span>
                <span className="text-text-200 text-xs font-normal leading-[18px]">
                  {data.drawer.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {role === "holder" && (
            <div className="flex flex-col gap-2">
              <span className="text-text-300 text-sm font-medium">
                <FormattedMessage
                  id="bill.payment.info.privateKey"
                  defaultMessage="Private key spend"
                  description="Address to private key spend"
                />
              </span>

              <div className="flex items-center gap-2">
                <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                  {privateKeyData?.private_key}
                </span>

                <CopyToClipboardButton
                  value={privateKeyData?.private_key || ""}
                />
              </div>
            </div>
          )}

          {role === "payer" && (
            <div className="flex flex-col gap-2">
              <span className="text-text-300 text-sm font-medium">
                <FormattedMessage
                  id="bill.payment.info.address"
                  defaultMessage="Address to pay"
                  description="Address to pay label"
                />
              </span>

              <div className="flex items-center gap-2">
                <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                  {data.address_to_pay}
                </span>

                <button className="">
                  <CopyIcon className="text-text-200 w-4 h-4 stroke-1" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.payment.info.mempoolLink"
                defaultMessage="Link to mempool"
                description="Link to mempool label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                {truncateString(data.mempool_link_for_address_to_pay, 24)}
              </span>

              <button
                className="p-0"
                onClick={() =>
                  window.open(data.mempool_link_for_address_to_pay)
                }
              >
                <SquareArrowOutUpRightIcon className="text-text-200 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>

          {/* <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.payment.info.link"
                defaultMessage="Link to pay"
                description="Link to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                {data.link_to_pay}
              </span>

              <button className="">
                <CopyIcon className="text-text-300 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default function Payment() {
  const { formatMessage: f } = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams() as { id: string };

  // todo: use a query instead
  const { mutate: refetch, isPending } = useMutation({
    mutationFn: () => checkBillInDHT(id),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        title: f({
          id: "bill.status.refresh.success.title",
          defaultMessage: "Success!",
        }),
        description: f({
          id: "bill.status.refresh.success.description",
          defaultMessage: "Successfully refreshed bill status!",
        }),
        variant: "success",
        position: "bottom-center",
        duration: 1_000,
      });
    },
  });

  return (
    <Page className="gap-6" displayBottomNavigation>
      <Topbar
        lead={<NavigateBack />}
        trail={
          <RefreshButton
            label={f({
              id: "bill.status.refresh",
              defaultMessage: "Refresh",
              description: "Refresh button label",
            })}
            content={f({
              id: "bill.status.refresh.content",
              defaultMessage: "Refresh bill status",
              description: "Refresh bill status tooltip",
            })}
            onClick={() => {
              refetch();
            }}
            loading={isPending}
          />
        }
      />

      <Suspense fallback={<Loader />}>
        <Information id={id} />
      </Suspense>
    </Page>
  );
}
