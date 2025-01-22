import { FormattedMessage } from "react-intl";
import { CircleCheckIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import Label from "@/components/typography/Label";
import { FormattedCurrency } from "@/components/FormattedCurrency";

import BillPreview from "../components/BillPreview";
import Mint from "./components/Mint";
import EcashAddress from "./components/EcashAddress";

export default function Received() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar lead={<NavigateBack />} trail={<></>} />

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

      <div className="flex flex-col gap-3 mb-auto">
        <div className="flex flex-col gap-3">
          <Label>
            <FormattedMessage
              id="bill.mint.received.billMinted"
              defaultMessage="Bill minted"
              description="Bill minted label"
            />
          </Label>

          <BillPreview company="Pear, Inc" date="31-Jan-2025" amount={1.2311} />
        </div>

        <div className="flex flex-col gap-3">
          <Label>
            <FormattedMessage
              id="bill.mint.received.mintedBy"
              defaultMessage="By"
              description="Bill minted by label"
            />
          </Label>

          <Mint name="Wildcat One" pubkey="npub1eajvs...agcd93" />
        </div>
      </div>

      <EcashAddress address="bitcr2df3ee...s43ek1" />
    </div>
  );
}
