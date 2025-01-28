import { FormattedMessage } from "react-intl";
import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Sign() {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Button className="w-full" size="md">
          <FormattedMessage
            id="bill.recourse.sign"
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
                  id="bill.recourse.sign.title"
                  defaultMessage="Are you sure?"
                  description="Confirm signature title"
                />
              </span>
              <span className="text-text-200 text-xs">
                <FormattedMessage
                  id="bill.recourse.sign.subtitle"
                  defaultMessage="This recourse request is legally binding"
                  description="Confirm signature subtitle"
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full" size="md">
              <FormattedMessage
                id="bill.recourse.sign.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="bill.recourse.sign.cancel"
                  defaultMessage="Cancel"
                  description="Cancel button"
                />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
