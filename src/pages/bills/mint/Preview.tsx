import { FormattedMessage } from "react-intl";
import { CopyIcon, LandmarkIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import Label from "@/components/typography/Label";
import { Button } from "@/components/ui/button";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";

import BillPreview from "../components/BillPreview";

function Mint({ name, pubkey }: { name: string; pubkey: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-elevation-200 border border-divider-50 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-50 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">{name}</span>
          <span className="text-text-200 text-xs font-normal leading-[18px]">
            {pubkey}
          </span>
        </div>
      </div>
    </div>
  );
}

function MintedEcashAddress({ address }: { address: string }) {
  return (
    <div className="flex items-center gap-2.5 py-4 px-3 bg-elevation-50 border border-divider-75 rounded-lg">
      <CopyIcon className="text-text-200 h-6 w-6 stroke-1" />
      <div className="flex flex-col gap-1">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="bill.mint.preview.mintedEcash"
            defaultMessage="Ecash minted"
            description="Minted Ecash label"
          />
        </span>

        <span className="text-text-200 text-base font-normal leading-6">
          {address}
        </span>
      </div>
    </div>
  );
}

export default function Preview() {
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
        <BillPreview company="Pear, Inc" date="31-Jan-2025" amount={1.2311} />

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
        <MintedEcashAddress address="bitcr2df3ee...s43ek1" />
        <Button>
          <FormattedMessage
            id="bill.mint.preview.sign"
            defaultMessage="Sign"
            description="Sign mint button label"
          />
        </Button>
      </div>
    </div>
  );
}
