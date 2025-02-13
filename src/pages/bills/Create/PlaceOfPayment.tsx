import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormattedMessage, useIntl } from "react-intl";
import { MapIcon, PencilIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import CountrySelector from "@/components/CountrySelector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateBillFormSchema } from "./index";

const formSchema = z.object({
  city: z.string().min(1),
  country: z.string().min(2),
});

export default function PlaceOfPayment() {
  const { formatMessage: f } = useIntl();
  const { control, setValue } = useFormContext<CreateBillFormSchema>();
  const payment = useWatch<CreateBillFormSchema, "payment">({
    control,
    name: "payment",
  });

  const [newPlaceOfPayment, setNewPlaceOfPayment] = useState({
    city: payment?.city,
    country: payment?.country,
  });

  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  const location = payment
    ? [payment.city, payment.country].filter(Boolean).join(", ")
    : "-";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-text-200 text-xs font-normal leading-normal">
          <FormattedMessage
            id="bills.create.payment.place"
            defaultMessage="Place of payment"
            description="Place of payment label"
          />
        </span>
        <span className="text-text-300 text-sm font-normal leading-5">
          {location}
        </span>
      </div>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
        }}
      >
        <DialogTrigger>
          <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
            <PencilIcon className="text-brand-200 h-3 w-3 stroke-1" />

            <FormattedMessage
              id="bill.create.payment.place.edit"
              defaultMessage="Edit"
              description="Edit place of payment button"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-6 py-6 px-5 h-full max-w-[375px] bg-elevation-50">
          <Topbar
            lead={<NavigateBack callBack={closeDialog} />}
            middle={
              <PageTitle>
                <FormattedMessage
                  id="bill.create.payment.place.title"
                  defaultMessage="Place of payment"
                  description="Bill place of payment title"
                />
              </PageTitle>
            }
          />

          <span className="text-text-300 text-sm font-normal leading-5">
            <>
              {payment?.city || newPlaceOfPayment.city},{" "}
              {payment?.country || newPlaceOfPayment.country}
            </>
          </span>

          <div className="flex flex-col gap-3">
            <CountrySelector
              label={f({
                id: "bill.create.payment.place.country",
                defaultMessage: "Country of payment",
                description: "Country of payment label",
              })}
              callback={(country) => {
                setNewPlaceOfPayment((prev) => ({
                  ...prev,
                  country,
                }));
              }}
              value={newPlaceOfPayment.country || payment?.country}
            />

            <Input
              icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
              label={f({
                id: "bills.create.payment.place.city",
                defaultMessage: "City of payment",
                description: "City of payment label",
              })}
              defaultValue={payment?.city}
              onChange={(e) => {
                setNewPlaceOfPayment((prev) => ({
                  ...prev,
                  city: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-row-reverse items-center gap-3 mt-auto">
            <Button
              className="w-full"
              size="sm"
              onClick={() => {
                setValue("payment.city", newPlaceOfPayment.city || "");
                setValue("payment.country", newPlaceOfPayment.country || "");

                setOpen(false);
              }}
            >
              <FormattedMessage
                id="bill.create.payment.place.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>
            <Button
              className="w-full"
              size="sm"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              <FormattedMessage
                id="bill.create.payment.place.cancel"
                defaultMessage="Cancel"
                description="Cancel button"
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

PlaceOfPayment.formSchema = formSchema;
