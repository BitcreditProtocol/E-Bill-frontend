import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarIcon, MapIcon, PencilIcon } from "lucide-react";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { DatePicker } from "@/components/DatePicker/datePicker";
import CountrySelector from "@/components/CountrySelector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateBillFormSchema } from "./index";

const formSchema = z
  .object({
    city: z.string().min(1),
    country: z.string().min(2),
    date: z.string().nullable(),
  })
  .nullable();

export default function Issuance() {
  const { formatMessage: f } = useIntl();
  const { control, setValue } = useFormContext<CreateBillFormSchema>();
  const issuance = useWatch<CreateBillFormSchema, "issuance">({
    control,
    name: "issuance",
  });

  const formattedDate = issuance?.date
    ? format(parseISO(issuance.date), "dd-MMM-yyyy")
    : null;
  const locationAndDate = issuance
    ? [issuance.city, issuance.country, formattedDate]
        .filter(Boolean)
        .join(", ")
    : "-";

  const [newIssuanceData, setNewIssuanceData] = useState({
    city: issuance?.city,
    country: issuance?.country,
    date: issuance?.date,
  });
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-text-300 text-sm font-normal leading-5 mb-1">
        {locationAndDate}
      </span>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
        }}
      >
        <DialogTrigger className="flex items-center gap-1 text-brand-200 text-xs font-medium">
          <PencilIcon className="text-brand-200 h-3 w-3 stroke-1" />
          <FormattedMessage
            id="bills.create.edit"
            defaultMessage="Edit"
            description="Edit date button"
          />
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-6 py-6 px-5 h-full max-w-[375px] bg-elevation-50">
          <Topbar
            lead={<NavigateBack callBack={closeDialog} />}
            middle={
              <PageTitle>
                <FormattedMessage
                  id="bill.create.issuance.title"
                  defaultMessage="Issuance"
                  description="Bill issuance title"
                />
              </PageTitle>
            }
          />

          <span className="text-text-300 text-sm font-normal leading-5">
            {locationAndDate}
          </span>

          <div className="flex flex-col gap-3">
            <CountrySelector
              label={f({
                id: "bill.create.issuance.countryOfIssuing",
                defaultMessage: "Country of issuing",
                description: "Country of issuing label",
              })}
              callback={(country) => {
                setNewIssuanceData((prev) => ({ ...prev, country }));
              }}
              value={newIssuanceData.country}
              required
            />

            <Input
              icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
              label={f({
                id: "bill.create.issuance.cityOfIssuing",
                defaultMessage: "City of issuing",
                description: "City of issuing label",
              })}
              defaultValue={newIssuanceData.city}
              onChange={(e) => {
                setNewIssuanceData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }));
              }}
              required
            />

            <DatePicker
              value={{
                from: issuance?.date ? parseISO(issuance.date) : undefined,
              }}
              mode="single"
              customComponent={
                <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg cursor-pointer">
                  <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />

                  {issuance?.date
                    ? format(parseISO(issuance.date), "dd-MMM-yyyy")
                    : f({
                        id: "bill.create.issuance.date",
                        defaultMessage: "Issue date",
                        description: "Issuance date picker label",
                      })}
                </div>
              }
              onChange={(e) => {
                setNewIssuanceData((prev) => ({
                  ...prev,
                  date: e.from
                    ? format(parseISO(e.from.toISOString()), "yyyy-MM-dd")
                    : null,
                }));
              }}
            />
          </div>

          <div className="flex flex-row-reverse gap-2 mt-auto">
            <Button
              className="w-full"
              size="sm"
              onClick={() => {
                setValue("issuance", {
                  city: newIssuanceData.city || "",
                  country: newIssuanceData.country || "",
                  date: newIssuanceData.date || null,
                });

                closeDialog();
              }}
            >
              <FormattedMessage
                id="bill.create.issuance.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>
            <Button
              className="w-full"
              size="sm"
              variant="outline"
              onClick={closeDialog}
            >
              <FormattedMessage
                id="bill.create.issuance.cancel"
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

Issuance.formSchema = formSchema;
