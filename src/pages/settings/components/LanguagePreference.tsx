import { PropsWithChildren, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import UsFlag from "@/assets/icons/flags/US.svg";
import EsFlag from "@/assets/icons/flags/ES.svg";
import UkFlag from "@/assets/icons/flags/UK.svg";

import { Description, Label } from "./Typography";


type LanguagePreferenceProps = PropsWithChildren<{
  value: string;
  values: string[];
  onChange: (value: string) => void;
}>;

export default function LanguagePreference({
  children,
  onChange,
}: LanguagePreferenceProps) {
  const [open, setOpen] = useState(false);

  const _onChange = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        {children}
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
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => { _onChange("en-US"); }}>
              <img src={UsFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>American English</Label>
                <Description>en-US</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4 cursor-pointer" onClick={() => { _onChange("es-ES"); }}>
              <img src={EsFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>Spanish</Label>
                <Description>es-ES</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4 cursor-pointer" onClick={() => { _onChange("en-GB"); }}>
              <img src={UkFlag} alt="UK Flag" className="h-8 w-8" />

              <div className="flex flex-col gap-0.5">
                <Label>British English</Label>
                <Description>en-GB</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
