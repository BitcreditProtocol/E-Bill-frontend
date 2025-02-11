import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
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
import {
  accept,
  rejectToAccept,
  rejectToBuy,
  requestToAccept,
  requestToPay,
} from "@/services/bills";
import { useToast } from "@/hooks/use-toast";
import routes from "@/constants/routes";
import { useIdentity } from "@/context/identity/IdentityContext";
import type { BillFull } from "@/types/bill";
import Sign from "@/components/Sign";
import { readMintConfig } from "@/constants/mints";

function SecondaryActions({ id }: { id: string }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full" variant="outline" size="sm">
          <FormattedMessage
            id="bill.actions.list"
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
              id="bill.actions.list"
              defaultMessage="Endorse"
              description="Actions list trigger button"
            />

            <ChevronUpIcon className="text-text-300 w-5 h-5 stroke-1" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 p-5 border-t border-divider-75">
          <Link to={routes.ENDORSE.replace(":id", id)}>
            <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
              <SendHorizonalIcon className="text-text-300 w-5 h-5 stroke-1" />

              <FormattedMessage
                id="bill.actions.endorse"
                defaultMessage="Endorse"
                description="Endorse button"
              />
            </button>
          </Link>

          <Link to={routes.SELL_BILL.replace(":id", id)}>
            <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
              <BanknoteIcon className="text-text-300 w-5 h-5 stroke-1" />

              <FormattedMessage
                id="bill.actions.sell"
                defaultMessage="Sell"
                description="Sell button"
              />
            </button>
          </Link>

          <Link to={routes.REQUEST_MINT.replace(":id", id)}>
            <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
              <LandmarkIcon className="text-text-300 w-5 h-5 stroke-1" />

              <FormattedMessage
                id="bill.actions.mint"
                defaultMessage="Mint"
                description="Mint button"
              />
            </button>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type BillActionsProps = {
  id: BillFull["id"];
  role: "holder" | "payer" | null;
  accepted: BillFull["accepted"];
  endorsed: BillFull["endorsed"];
  requested_to_accept: BillFull["requested_to_accept"];
  requested_to_pay: BillFull["requested_to_pay"];
  paid: BillFull["paid"];
  // bill sale
  waiting_for_payment: BillFull["waiting_for_payment"];
  seller: BillFull["seller"];
  buyer: BillFull["buyer"];
};

function Holder({
  id,
  accepted,
  requested_to_accept,
  requested_to_pay,
  paid,
  endorsed,
}: Omit<BillActionsProps, "role" | "seller" | "buyer">) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: requestAcceptance, isPending: isAcceptancePending } =
    useMutation({
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
      onError: () => {
        toast({
          description: (
            <FormattedMessage
              id="bill.actions.requestAcceptance.error"
              defaultMessage="Request failed"
              description="Request acceptance error toast message"
            />
          ),
          position: "bottom-center",
        });
      },
    });

  const { mutate: requestPayment, isPending: isPaymentPending } = useMutation({
    mutationFn: () =>
      requestToPay({
        bill_id: id,
        currency: "sat",
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        description: (
          <FormattedMessage
            id="bill.actions.requestPayment.success"
            defaultMessage="Request sent successfully"
            description="Request payment success toast message"
          />
        ),
        position: "bottom-center",
      });
    },
    onError: () => {
      toast({
        description: (
          <FormattedMessage
            id="bill.actions.requestPayment.error"
            defaultMessage="Request failed"
            description="Request payment error toast message"
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
              requestAcceptance();
            }}
            disabled={isAcceptancePending || requested_to_accept}
          >
            <FormattedMessage
              id="bill.actions.requestAcceptance"
              defaultMessage="Request to accept"
              description="Request to accept button"
            />
          </Button>
          <SecondaryActions id={id} />
        </>
      )}

      {accepted && !requested_to_pay && !paid && (
        <div className="flex flex-col gap-3">
          <Button
            size="sm"
            onClick={() => {
              requestPayment();
            }}
            disabled={isPaymentPending}
          >
            <FormattedMessage
              id="bill.actions.requestPayment"
              defaultMessage="Request payment"
              description="Request payment button"
            />
          </Button>
          <SecondaryActions id={id} />
        </div>
      )}

      {requested_to_pay && (
        <Link to={routes.PAYMENT.replace(":id", id)}>
          <Button className="w-full" size="sm">
            <FormattedMessage
              id="bill.actions.payment.check"
              defaultMessage="Check payment"
              description="Action to verify payment status"
            />
          </Button>
        </Link>
      )}
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
  id,
  accepted,
  requested_to_accept,
  paid,
  requested_to_pay,
}: Omit<BillActionsProps, "role" | "seller" | "buyer">) {
  return (
    <div className="flex flex-col gap-3">
      {(!accepted || requested_to_accept) && <Acceptance id={id} />}

      {!paid && requested_to_pay && (
        <Link to={routes.PAY.replace(":id", id)}>
          <Button size="sm">
            <FormattedMessage
              id="bill.actions.pay"
              defaultMessage="Pay"
              description="Pay button"
            />
          </Button>
        </Link>
      )}
    </div>
  );
}

type BuyerActionsProps = {
  id: BillFull["id"];
  paid: BillFull["paid"];
  waiting_for_payment: BillFull["waiting_for_payment"];
};

function Buyer({ id }: BuyerActionsProps) {
  const { formatMessage: f } = useIntl();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [signOpen, setSignOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return rejectToBuy(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        title: f({
          id: "bill.actions.buy.reject.success",
          defaultMessage: "Bill rejected",
          description: "Bill rejected success toast title",
        }),
        description: f({
          id: "bill.actions.buy.reject.success",
          defaultMessage: "Bill rejected successfully",
          description: "Bill rejected success toast message",
        }),
        position: "bottom-center",
      });
    },
    onError: () => {
      toast({
        title: f({
          id: "bill.actions.buy.reject.error",
          defaultMessage: "Bill rejection failed",
          description: "Bill rejection error toast title",
        }),
        description: f({
          id: "bill.actions.buy.reject.error",
          defaultMessage: "Bill rejection failed",
          description: "Bill rejection error toast message",
        }),
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <Link to={routes.OFFER.replace(":id", id)}>
        <Button className="w-full" size="md">
          <FormattedMessage
            id="bill.actions.buy.view"
            defaultMessage="View payment details"
            description="Buy offered bill button"
          />
        </Button>
      </Link>
      <Sign
        open={signOpen}
        onOpenChange={() => {
          setSignOpen(!signOpen);
        }}
        title={f({
          id: "bill.reject.sign.title",
          defaultMessage: "Are you sure?",
          description: "Sign confirmation title",
        })}
        description={f({
          id: "bill.reject.sign.description",
          defaultMessage: "The signing of the rejection is legally binding",
          description: "Sign confirmation description",
        })}
        confirm={
          <Button
            size="md"
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
          >
            <FormattedMessage
              id="bill.reject.sign.confirm"
              defaultMessage="Confirm"
              description="Button to confirm buy rejection action"
            />
          </Button>
        }
        cancel={
          <Button
            className="w-full"
            size="md"
            variant="outline"
            disabled={isPending}
          >
            <FormattedMessage
              id="bill.reject.sign.cancel"
              defaultMessage="Cancel"
              description="Button to cancel bill buy rejection action"
            />
          </Button>
        }
      >
        <Button
          className="w-full"
          size="md"
          variant="outline"
          disabled={isPending}
        >
          <FormattedMessage
            id="bill.actions.buy.reject"
            defaultMessage="Reject"
            description="Button to trigger bill buy rejection signature"
          />
        </Button>
      </Sign>
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
  seller,
  buyer,
}: BillActionsProps) {
  const { activeIdentity } = useIdentity();
  const mintConfig = useMemo(() => readMintConfig(), []);

  const __dev_mightBeMintRequest = mintConfig.__dev_mintViewEnabled && role === null;

  const isOfferedForSale = seller !== null && waiting_for_payment;
  const isSeller = seller?.node_id === activeIdentity.node_id;
  const isBuyer =
    buyer?.node_id === activeIdentity.node_id && waiting_for_payment;

  if (isOfferedForSale) {
    if (isBuyer) {
      return (
        <Buyer id={id} paid={paid} waiting_for_payment={waiting_for_payment} />
      );
    }

    if (isSeller) {
      return (
        <Link to={routes.OFFER.replace(":id", id)}>
          <Button className="w-full" size="md">
            <FormattedMessage
              id="bill.actions.offer.view"
              defaultMessage="View payment status"
              description="View offer payment status button"
            />
          </Button>
        </Link>
      );
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {role !== null ? (
        role === "holder" ? (
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
        )
      ) : (
        <>
          {__dev_mightBeMintRequest && (<>
            <div className="flex">
              <Link to={routes.MINT_REQUEST.replace(":id", id)} className="w-full">
                <Button size="sm" className="w-full">
                  Request to mint
                </Button>
              </Link>
            </div>
          </>)}
        </>
      )}
    </div>
  );
}
