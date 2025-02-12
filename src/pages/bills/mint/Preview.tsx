import { FormattedMessage, useIntl } from "react-intl";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import Label from "@/components/typography/Label";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";

import Mint from "./components/Mint";
import BillPreview from "../components/Preview";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getBillDetails } from "@/services/bills";
import { Suspense, useState } from "react";
import { acceptQuote, getQuote } from "@/services/quotes";
import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "@/hooks/use-toast";
import routes from "@/constants/routes";
import { WILDCAT_ONE } from "@/constants/mints";
import { DialogProps } from "vaul";
function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

type ConfirmSignProps = {
  onConfirm: () => void
} & Required<Pick<DialogProps, 'open' | 'onOpenChange'>>

function ConfirmSign({ onConfirm, open, onOpenChange} : ConfirmSignProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger>
        <Button className="w-full" size="md">
          <FormattedMessage
            id="bill.mint.preview.sign"
            defaultMessage="Sign"
            description="Sign mint button"
          />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-elevation-50">
        <div className="flex flex-col gap-6 py-8 px-5">
          <div className="flex gap-2">
            <TriangleAlertIcon className="text-signal-error h-5 w-5 stroke-1" />

            <div className="flex flex-col gap-1.5">
              <span className="text-text-300 text-lg font-medium">
                <FormattedMessage
                  id="bill.mint.preview.sign.title"
                  defaultMessage="Are you sure?"
                  description="Confirm signature title"
                />
              </span>
              <span className="text-text-200 text-xs">
                <FormattedMessage
                  id="bill.mint.preview.sign.subtitle"
                  defaultMessage="The endorsement to the mint is legally binding"
                  description="Confirm signature subtitle"
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full" size="md" onClick={onConfirm}>
              <FormattedMessage
                id="bill.mint.preview.sign.confirm"
                defaultMessage="Confirm"
                description="Confirm button in preview mint"
              />
            </Button>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="bill.mint.preview.sign.cancel"
                  defaultMessage="Cancel"
                  description="Cancel button in preview mint"
                />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function Preview() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data: bill } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id as string),
  });

  const { data: quote } = useSuspenseQuery({
    queryKey: ["quotes", id as string],
    queryFn: () => getQuote(id as string),
  });

  const { mutate: doAcceptQuote } = useMutation({
    mutationFn: () => {
      return acceptQuote(id as string);
    },
    onError: () => {
      toast({
        variant: "error",
        title: intl.formatMessage({
          id: "bill.actions.requestAcceptance.error.title",
          defaultMessage: "Error!",
        }),
        description: intl.formatMessage({
          id: "bill.actions.requestAcceptance.error.description",
          defaultMessage: "Error while accepting quote!",
        }),
        position: "bottom-center",
      });
      setConfirmOpen(false);
    },
    onSuccess: () => {
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

      navigate(routes.MINT_RECEIVED.replace(":id", id as string))
    },
  });

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
        <Suspense fallback={<Loader />}>
          <BillPreview
            name={bill.drawee.name}
            date={bill.issue_date}
            amount={Number(bill.sum)}
            currency={bill.currency}
          />
        </Suspense>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>
              <FormattedMessage
                id="bill.mint.preview.toTheOrderOf"
                defaultMessage="to the order of"
                description="To the order of label"
              />
            </Label>

            <Mint name={WILDCAT_ONE.name} nodeId={WILDCAT_ONE.node_id} />
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

              <Suspense fallback={<Loader />}>
                <div className="flex items-center gap-1 self-end">
                  <FormattedCurrency
                    className="text-sm font-medium leading-5"
                    value={Number(quote.sum)}
                    type="credit"
                  />
                  <span className="text-text-200 text-[10px]">sat</span>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <ConfirmSign onConfirm={() => { doAcceptQuote(); }} open={confirmOpen} onOpenChange={setConfirmOpen}/>
      </div>
    </div>
  );
}
