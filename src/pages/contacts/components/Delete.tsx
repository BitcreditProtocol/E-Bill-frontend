import { FormattedMessage } from "react-intl";
import { TrashIcon, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Delete() {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center gap-1 w-full bg-transparent">
        <span className="text-brand-200 text-sm font-medium">
          <FormattedMessage
            id="contact.delete"
            defaultMessage="Delete contact"
            description="Delete contact button"
          />
        </span>
        <TrashIcon className="w-3 h-3 text-brand-200" />
      </DrawerTrigger>
      <DrawerContent className="max-w-[375px] mx-auto bg-elevation-50">
        <div className="flex gap-2 pt-8 px-5">
          <TriangleAlert className="text-signal-error h-5 w-5 stroke-1" />

          <div className="flex flex-col gap-1.5">
            <span className="text-text-300 text-[18px] font-medium leading-[28px]">
              <FormattedMessage
                id="Are you sure"
                defaultMessage="Are you sure?"
                description="Delete contact title"
              />
            </span>
            <span className="text-text-200 text-xs font-normal leading-[18px]">
              <FormattedMessage
                id="You can always re-add a contact later"
                defaultMessage="You can always re-add a contact later"
                description="Confirm delete contact description"
              />
            </span>
          </div>
        </div>

        <DrawerFooter>
          <Button className="w-full" size="md">
            <FormattedMessage
              id="contact.action.delete.confirm"
              defaultMessage="Delete"
              description="Delete contact button"
            />
          </Button>
          <DrawerClose>
            <Button className="w-full" size="md" variant="outline">
              <FormattedMessage
                id="contact.action.delete.cancel"
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
