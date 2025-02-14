import { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CopyIcon, SquareArrowOutUpRightIcon } from "lucide-react";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getBillDetails } from "@/services/bills";
import { getActiveIdentity } from "@/services/identity_v2";
import { truncateString } from "@/utils/strings";
import { copyToClipboard } from "@/utils";
import routes from "@/constants/routes";
import Preview from "./components/Preview";

function Loader() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Skeleton className="h-40 w-40 bg-elevation-200" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
    </div>
  );
}

function Information({ id }: { id: string }) {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { toast } = useToast();

  const { data } = useSuspenseQuery({
    queryFn: () => getBillDetails(id),
    queryKey: ["bill", id, "payment"],
  });

  const { data: activeIdentity } = useSuspenseQuery({
    queryFn: () => getActiveIdentity(),
    queryKey: ["identity", "active"],
  });

  const isPayer = data.drawee.node_id === activeIdentity.node_id;

  // todo: move to declarative block navigate redirect
  useEffect(() => {
    if (!isPayer || data.paid) {
      navigate(routes.VIEW_BILL.replace(":id", id));
    }
  }, [id, data, isPayer, navigate]);

  return (
    <>
      <div className="flex-1 flex flex-col items-center gap-12 w-full pb-20">
        <div className="flex items-center justify-center h-40 w-40 bg-elevation-250 rounded-xl">
          <QRCodeSVG bgColor="#F2EDDF" value={data.link_to_pay} />
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.payment.info.address"
                defaultMessage="Address to pay"
                description="Address to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal text-center leading-6 break-all mx-5">
                {data.address_to_pay}
              </span>

              <button
                className="p-0"
                onClick={() => {
                  copyToClipboard(data.address_to_pay)
                    .then(() => {
                      toast({
                        description: f({
                          id: "bill.payment.info.address.copied",
                          defaultMessage: "Address copied to clipboard!",
                        }),
                        position: "bottom-center",
                      });
                    })
                    .catch(() => {
                      toast({
                        description: f({
                          id: "bill.payment.info.address.failed",
                          defaultMessage:
                            "Error while copying address to clipboard",
                        }),
                        variant: "error",
                        position: "bottom-center",
                      });
                    });
                }}
              >
                <CopyIcon className="text-text-200 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.payment.info.link"
                defaultMessage="Link to pay"
                description="Link to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal text-center leading-6 break-all">
                {truncateString(data.link_to_pay, 12)}
              </span>

              <button
                className="p-0"
                onClick={() => window.open(data.link_to_pay)}
              >
                <SquareArrowOutUpRightIcon className="text-text-200 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>
        </div>

        <Preview
          className="w-full mt-auto"
          name={data.drawer.name}
          date={format(
            new Date(parseISO(data.issue_date)).toUTCString(),
            "dd-MMM-yyyy"
          )}
          amount={Number(data.sum)}
          currency="sat"
        />
      </div>
    </>
  );
}

export default function Pay() {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className="gap-6" displayBottomNavigation>
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.pay.title"
              defaultMessage="Payment instructions"
              description="Payment title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <Information id={id as string} />
      </Suspense>
    </Page>
  );
}
