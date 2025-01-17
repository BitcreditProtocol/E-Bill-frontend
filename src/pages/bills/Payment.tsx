import { useSearchParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  CircleCheckIcon,
  CircleXIcon,
  CopyIcon,
  LandmarkIcon,
} from "lucide-react";

import { FormattedCurrency } from "@/components/FormattedCurrency";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import LoaderIcon from "@/assets/icons/loader.svg";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "pending";

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

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-12 px-6 w-full">
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          {status === "pending" && (
            <img src={LoaderIcon} alt="Loader" className="w-12 h-12" />
          )}

          {status === "success" && (
            <CircleCheckIcon className="text-signal-success w-12 h-12 stroke-1" />
          )}

          {status === "failed" && (
            <CircleXIcon className="text-signal-error w-12 h-12 stroke-1" />
          )}

          <h1 className="text-text-300 text-2xl font-medium">
            {statusMessage}
          </h1>

          <span className="text-text-200 text-base font-medium">
            03-Nov-2024 at 10:55
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FormattedCurrency
            className="text-lg font-medium"
            value={12.94101}
            type="credit"
          />
          <span className="text-text-200 text-[10px] font-normal">BTC</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              {billPaymentMessage}
            </span>

            <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
              <div className="flex flex-col gap-0.5">
                <span className="text-text-300 text-base font-medium leading-6">
                  Google Inc
                </span>
                <span className="text-text-200 text-xs font-normal leading-[18px]">
                  03-Nov-24
                </span>
              </div>

              <div className="flex items-center gap-1 self-end">
                <FormattedCurrency
                  className="text-sm"
                  value={12.94101}
                  type="credit"
                />
                <span className="text-text-200 text-[10px]">BTC</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="payment.info.from"
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
                  Danube Water Shipping
                </span>
                <span className="text-text-200 text-xs font-normal leading-[18px]">
                  Pinksterhof 20, 2134DP, Vienna
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="payment.info.address"
                defaultMessage="Address to pay"
                description="Address to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                3Zh5j2xioLjUuNapxBHxgMWXyQVYYPHyUkJcRS7xfTBc
              </span>

              <button className="">
                <CopyIcon className="text-text-300 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="payment.info.link"
                defaultMessage="Link to pay"
                description="Link to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal leading-6 break-all">
                Bitcoin..352cd
              </span>

              <button className="">
                <CopyIcon className="text-text-300 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
