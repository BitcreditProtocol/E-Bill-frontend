import { useIntl, FormattedMessage } from "react-intl";
import { EarthIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import UsFlag from "@/assets/icons/flags/US.svg";
import EsFlag from "@/assets/icons/flags/ES.svg";
import UkFlag from "@/assets/icons/flags/UK.svg";

import MenuOption from "./MenuOption";
import { Description, Label } from "./Typography";

export default function LanguagePreference() {
  const intl = useIntl();

  return (
    <Drawer>
      <DrawerTrigger>
        <MenuOption
          icon={<EarthIcon className="text-text-300 h-6 w-6 stroke-1" />}
          label={intl.formatMessage({
            id: "settings.languagePreference",
            defaultMessage: "Language",
          })}
          defaultValue="English"
        />
      </DrawerTrigger>

      <DrawerContent className="max-w-[375px] bg-elevation-50 py-4 px-5 mx-auto">
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-lg font-medium leading-[28px]">
            <FormattedMessage
              id="settings.languagePreference.title"
              defaultMessage="Language preference"
              description="Language preference title"
            />
          </span>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <img src={UsFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>American English</Label>
                <Description>US</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4">
              <img src={EsFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>Spanish</Label>
                <Description>ES</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4">
              <img src={UkFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>British English</Label>
                <Description>UK</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
