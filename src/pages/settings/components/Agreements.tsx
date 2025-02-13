import { useIntl, FormattedMessage } from "react-intl";
import { ChevronRightIcon, FileDownIcon, ScaleIcon } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import MenuOption from "./MenuOption";
import { Label } from "./Typography";

export default function Agreements() {
  const intl = useIntl();

  return (
    <Drawer>
      <DrawerTrigger>
        <MenuOption
          icon={<ScaleIcon className="text-text-300 h-6 w-6 stroke-1" />}
          label={intl.formatMessage({
            id: "settings.legal",
            defaultMessage: "Legal",
          })}
          defaultValue="Agreements"
        />
      </DrawerTrigger>

      <DrawerContent className="max-w-[375px] bg-elevation-50 py-4 px-5 mx-auto">
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-lg font-medium leading-[28px]">
            <FormattedMessage
              id="settings.agreements.title"
              defaultMessage="Agreements"
              description="Agreement documents title"
            />
          </span>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileDownIcon className="text-text-300 h-6 w-6 stroke-1" />
                <Label>User agreement</Label>
              </div>

              <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileDownIcon className="text-text-300 h-6 w-6 stroke-1" />
                <Label>Bill agreement</Label>
              </div>

              <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileDownIcon className="text-text-300 h-6 w-6 stroke-1" />
                <Label>Privacy policy</Label>
              </div>

              <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
