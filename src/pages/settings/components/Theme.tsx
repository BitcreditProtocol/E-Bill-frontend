import { useIntl, FormattedMessage } from "react-intl";
import { MoonIcon, SettingsIcon, SunIcon } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import MenuOption from "./MenuOption";

export default function Theme() {
  const intl = useIntl();

  return (
    <Drawer>
      <DrawerTrigger>
        <MenuOption
          icon={<SunIcon className="text-text-300 h-6 w-6 stroke-1" />}
          label={intl.formatMessage({
            id: "settings.theme",
            defaultMessage: "Theme",
          })}
          defaultValue="System"
        />
      </DrawerTrigger>

      <DrawerContent className="bg-elevation-50 py-4 px-5">
        <span className="text-text-300 text-lg font-medium leading-[28px]">
          <FormattedMessage
            id="settings.theme.title"
            defaultMessage="Theme"
            description="Theme settings title"
          />
        </span>

        <div className="flex items-center gap-3 max-w-[300px]">
          <div className="flex-1 flex flex-col gap-4 p-4 border border-text-300 rounded-xl">
            <SettingsIcon className="text-text-300 h-6 w-6 stroke-1" />

            <span className="text-text-300 text-sm font-normal leading-5">
              <FormattedMessage
                id="settings.theme.system"
                defaultMessage="System"
                description="System theme"
              />
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-4 p-4 border border-text-200 rounded-xl">
            <SunIcon className="text-text-200 h-6 w-6 stroke-1" />

            <span className="text-text-200 text-sm font-normal leading-5">
              <FormattedMessage
                id="settings.theme.light"
                defaultMessage="Light"
                description="Light theme"
              />
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-4 p-4 border border-text-200 rounded-xl">
            <MoonIcon className="text-text-200 h-6 w-6 stroke-1" />

            <span className="text-text-200 text-sm font-normal leading-5">
              <FormattedMessage
                id="settings.theme.dark"
                defaultMessage="Dark"
                description="Dark theme"
              />
            </span>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
