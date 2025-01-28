import { FormattedMessage } from "react-intl";
import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ResetConfirmation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerContent className="bg-elevation-50">
        <div className="flex flex-col gap-6 py-8 px-5">
          <div className="flex gap-2">
            <TriangleAlertIcon className="text-signal-error h-5 w-5 stroke-1" />

            <div className="flex flex-col gap-1.5">
              <span className="text-text-300 text-lg font-medium">
                <FormattedMessage
                  id="settings.reset.preview.title"
                  defaultMessage="Are you sure?"
                  description="Confirm seed removal title"
                />
              </span>
              <span className="text-text-200 text-xs">
                <FormattedMessage
                  id="settings.reset.preview.subtitle"
                  defaultMessage="This will remove your data from this  device."
                  description="Confirm seed removal subtitle"
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="md" variant="destructive">
              <FormattedMessage
                id="settings.reset.deleteSeed"
                defaultMessage="Delete seed"
                description="Delete seed button"
              />
            </Button>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="settings.reset.cancel"
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
