import { FormattedMessage } from "react-intl";
import { CopyIcon, SquareArrowOutUpRightIcon } from "lucide-react";

import { FormattedCurrency } from "@/components/FormattedCurrency";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import SampleQrCode from "@/assets/sample-qr-code.svg";

export default function Pay() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <h1 className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="pay.title"
              defaultMessage="Payment instructions"
              description="Payment title"
            />
          </h1>
        }
        trail={<></>}
      />

      <div className="flex-1 flex flex-col items-center gap-12">
        <img src={SampleQrCode} className="w-32 h-32 mt-12" />

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="payment.info.address"
                defaultMessage="Address to pay"
                description="Address to pay label"
              />
            </span>

            <div className="flex items-center gap-2">
              <span className="max-w-64 text-text-200 text-base font-normal text-left leading-6 break-all">
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
                <SquareArrowOutUpRightIcon className="text-text-300 w-4 h-4 stroke-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg mb-16">
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
  );
}
