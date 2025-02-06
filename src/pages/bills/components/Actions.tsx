import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import {
  BanknoteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LandmarkIcon,
  SendHorizonalIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { accept, rejectToAccept, requestToAccept } from "@/services/bills";
import type { BillFull } from "@/types/bill";
import { useToast } from "@/hooks/use-toast";

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
  id: BillFull["id"];
  role: "holder" | "payer";
  accepted: BillFull["accepted"];
  endorsed: BillFull["endorsed"];
  requested_to_accept: BillFull["requested_to_accept"];
  requested_to_pay: BillFull["requested_to_pay"];
  paid: BillFull["paid"];
  waiting_for_payment: BillFull["waiting_for_payment"];
};

function Holder({
  id,
  accepted,
  requested_to_accept,
  requested_to_pay,
  paid,
  endorsed,
}: Omit<BillActionsProps, "role">) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => requestToAccept(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        description: (
          <FormattedMessage
            id="bill.actions.requestAcceptance.success"
            defaultMessage="Request sent successfully"
            description="Request acceptance success toast message"
          />
        ),
        position: "bottom-center",
      });
    },
  });

  if (endorsed) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-3">
      {!accepted && (
        <>
          <Button
            size="sm"
            onClick={() => {
              mutate();
            }}
            disabled={isPending || requested_to_accept}
          >
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

function Acceptance({ id }: { id: string }) {
  const [isAcceptance, setIsAcceptance] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (isAcceptance) {
        return accept(id);
      } else {
        return rejectToAccept(id);
      }
    },
    onSuccess: async () => {
      setIsDrawerOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["bill", id],
      });
    },
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <>
          <Button
            size="sm"
            onClick={() => {
              setIsDrawerOpen(true);
              setIsAcceptance(true);
            }}
          >
            <FormattedMessage
              id="bill.actions.acceptance.sign"
              defaultMessage="Sign acceptance"
              description="Sign acceptance for payer button"
            />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsDrawerOpen(true);
              setIsAcceptance(false);
            }}
          >
            <FormattedMessage
              id="bill.actions.acceptance.reject"
              defaultMessage="Reject acceptance"
              description="Reject acceptance for payer button"
            />
          </Button>
        </>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DrawerHeader className="flex gap-2 w-full p-0">
          <TriangleAlertIcon className="text-signal-error h-5 w-5 stroke-1" />
          <div className="flex flex-col gap-1.5">
            <DrawerTitle className="text-text-300 text-lg font-medium leading-normal">
              <FormattedMessage
                id="bill.actions.acceptance.title"
                defaultMessage="The signing of your acceptance is legally binding"
                description="Bill acceptance update confirmation message"
              />
            </DrawerTitle>
            <DrawerDescription className="text-text-200 text-xs font-normal leading-normal">
              <FormattedMessage
                id="bill.actions.acceptance.description"
                defaultMessage="The signing of your acceptance is legally binding"
                description="Bill acceptance update confirmation message"
              />
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-3 w-full p-0">
          <Button
            size="md"
            onClick={() => {
              mutate();
            }}
            disabled={isPending}
          >
            <FormattedMessage
              id="bill.actions.acceptance.confirm"
              defaultMessage="Confirm"
              description="Confirm bill acceptance button"
            />
          </Button>
          <DrawerClose asChild>
            <Button
              className="w-full"
              variant="outline"
              size="md"
              disabled={isPending}
            >
              {isAcceptance}
              <FormattedMessage
                id="bill.actions.acceptance.cancel"
                defaultMessage="Cancel"
                description="Cancel bill acceptance button"
              />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
      {(!accepted || requested_to_accept) && <Acceptance id="1" />}

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
  id,
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
          id={id}
          accepted={accepted}
          requested_to_accept={requested_to_accept}
          requested_to_pay={requested_to_pay}
          paid={paid}
          endorsed={endorsed}
          waiting_for_payment={waiting_for_payment}
        />
      ) : (
        <Payer
          id={id}
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
