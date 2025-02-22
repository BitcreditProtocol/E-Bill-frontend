import { FormattedMessage } from "react-intl";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { truncateString } from "@/utils/strings";

export default function EcashToken({ token }: { token: string }) {
  return (
    <div className="flex items-center gap-2.5 py-4 px-3 bg-elevation-50 border border-divider-75 rounded-lg">
      <CopyToClipboardButton value={token} />

      <div className="flex flex-col gap-1">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="bill.mint.preview.mintedEcash"
            defaultMessage="Ecash minted"
            description="Minted Ecash label"
          />
        </span>

        <span className="text-text-200 text-base font-normal leading-6">
          {truncateString(token, 24)}
        </span>
      </div>
    </div>
  );
}
