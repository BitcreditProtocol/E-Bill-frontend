import { FormattedMessage } from "react-intl";
import {
  BanknoteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LandmarkIcon,
  SendHorizonalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import type { BillFull } from "@/types/bill";

function SecondaryActions() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full" variant="outline" size="sm">
          <FormattedMessage
            id="bill.actions.actionsList"
            defaultMessage="Endorse"
            description="Actions list trigger button"
          />

          <ChevronDownIcon className="text-text-300 w-5 h-5 stroke-1" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[375px] bg-elevation-50 mx-auto">
        <div className="p-5">
          <Button className="w-full" variant="outline" size="sm">
            <FormattedMessage
              id="bill.actions.actionsList"
              defaultMessage="Endorse"
              description="Actions list trigger button"
            />

            <ChevronUpIcon className="text-text-300 w-5 h-5 stroke-1" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 p-5 border-t border-divider-75">
          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <SendHorizonalIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.endorse"
              defaultMessage="Endorse"
              description="Endorse button"
            />
          </button>

          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <BanknoteIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.sell"
              defaultMessage="Sell"
              description="Sell button"
            />
          </button>

          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <LandmarkIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.mint"
              defaultMessage="Mint"
              description="Mint button"
            />
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type BillActionsProps = {
  role: "holder" | "payer";
  accepted: BillFull["accepted"];
  endorsed: BillFull["endorsed"];
  requested_to_accept: BillFull["requested_to_accept"];
  requested_to_pay: BillFull["requested_to_pay"];
  paid: BillFull["paid"];
  waiting_for_payment: BillFull["waiting_for_payment"];
};

function Holder({
  accepted,
  requested_to_accept,
  requested_to_pay,
  paid,
  endorsed,
}: Omit<BillActionsProps, "role">) {
  if (endorsed) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-3">
      {!accepted && !requested_to_accept && (
        <>
          <Button size="sm">
            <FormattedMessage
              id="bill.actions.requestAcceptance"
              defaultMessage="Request to accept"
              description="Request to accept button"
            />
          </Button>
        </>
      )}

      {!requested_to_pay && !paid && <SecondaryActions />}
    </div>
  );
}

function Payer({
  accepted,
  requested_to_accept,
  paid,
  requested_to_pay,
}: Omit<BillActionsProps, "role">) {
  return (
    <div className="flex flex-col gap-3">
      {!accepted && requested_to_accept && (
        <>
          <Button size="sm">
            <FormattedMessage
              id="bill.actions.acceptance.sign"
              defaultMessage="Sign acceptance"
              description="Sign acceptance for payer button"
            />
          </Button>
          <Button size="sm" variant="outline">
            <FormattedMessage
              id="bill.actions.acceptance.reject"
              defaultMessage="Reject acceptance"
              description="Reject acceptance for payer button"
            />
          </Button>
        </>
      )}

      {!paid && requested_to_pay && (
        <Button size="sm">
          <FormattedMessage
            id="bill.actions.pay"
            defaultMessage="Pay"
            description="Pay button"
          />
        </Button>
      )}
    </div>
  );
}

export default function Actions({
  role,
  accepted,
  endorsed,
  requested_to_accept,
  requested_to_pay,
  paid,
  waiting_for_payment,
}: BillActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {role === "holder" ? (
        <Holder
          accepted={accepted}
          requested_to_accept={requested_to_accept}
          requested_to_pay={requested_to_pay}
          paid={paid}
          endorsed={endorsed}
          waiting_for_payment={waiting_for_payment}
        />
      ) : (
        <Payer
          accepted={accepted}
          requested_to_accept={requested_to_accept}
          requested_to_pay={requested_to_pay}
          paid={paid}
          endorsed={endorsed}
          waiting_for_payment={waiting_for_payment}
        />
      )}
    </div>
  );
}
