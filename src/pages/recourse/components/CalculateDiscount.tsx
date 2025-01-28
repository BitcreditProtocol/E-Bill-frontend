import Big from "big.js";
import { addDays } from "date-fns";
import { CalculatorIcon } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";

export default function CalculateDiscount() {
  const date = new Date();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex items-center gap-1">
          <CalculatorIcon className="text-text-300 h-4 w-4 stroke-1" />

          <span className="text-text-300 text-xs font-medium leading-normal">
            17d @ 4%
          </span>
        </div>
      </DrawerTrigger>

      <DrawerContent className="p-5 bg-elevation-50">
        <DiscountForm
          startDate={date}
          endDate={addDays(date, 17)}
          onSubmit={(e) => {
            console.log(e);
          }}
          gross={{ currency: "BTC", value: new Big(12.49) }}
        />
      </DrawerContent>
    </Drawer>
  );
}
