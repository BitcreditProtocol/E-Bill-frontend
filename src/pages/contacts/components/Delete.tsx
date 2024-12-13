import { FormattedMessage } from "react-intl";
import { TrashIcon, TriangleAlert } from "lucide-react";

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

export default function Delete() {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center gap-1 w-full bg-transparent">
        <span className="text-brand-200 text-sm font-medium">
          <FormattedMessage
            id="Delete contact"
            defaultMessage="Delete contact"
            description="Delete contact button"
          />
        </span>
        <TrashIcon className="w-3 h-3 text-brand-200" />
      </DrawerTrigger>
      <DrawerContent className="max-w-[375px] mx-auto bg-elevation-50">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex gap-2">
              <TriangleAlert className="w-4 h-4 text-signal-error" />
              <FormattedMessage
                id="Are you sure"
                defaultMessage="Are you sure?"
                description="Delete contact title"
              />
            </div>
          </DrawerTitle>
          <DrawerDescription>
            <FormattedMessage
              id="You can always re-add a contact later"
              defaultMessage="You can always re-add a contact later"
              description="Confirm delete contact description"
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button className="w-full" size="md">
            <FormattedMessage
              id="Delete contact"
              defaultMessage="Delete"
              description="Delete contact button"
            />
          </Button>
          <DrawerClose>
            <Button className="w-full" size="md" variant="outline" asChild>
              <FormattedMessage
                id="Cancel"
                defaultMessage="Cancel"
                description="Cancel button"
              />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
