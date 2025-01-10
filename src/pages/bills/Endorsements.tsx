import { FormattedMessage } from "react-intl";
import { ChevronsUpDownIcon } from "lucide-react";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import Endorsement from "./components/Endorsement";

export default function Endorsements() {
  return (
    <div className="flex flex-col gap-6 max-w-[375px] bg-elevation-50 w-full min-h-fit h-screen py-4 px-5 absolute z-10">
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="endorsements.title"
              defaultMessage="Endorsements ({count})"
              description="Endorsements title"
              values={{ count: 1 }}
            />
          </h1>

          <button className="flex items-center p-0 text-text-300 text-xs font-medium">
            <ChevronsUpDownIcon className="text-text-300 w-4 h-4 stroke-1" />

            <FormattedMessage
              id="endorsements.sort"
              defaultMessage="Newest"
              description="Sort endorsements"
            />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Endorsement
            payee="Nvidia Inc"
            payeeAddress="One Apple Park Way, Cupertino, California"
            signer="Apple Inc."
            localAndDate="San Francisco, 5 Nov 2024"
          />
        </div>
      </div>
    </div>
  );
}
