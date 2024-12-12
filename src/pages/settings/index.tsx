import { useLanguage } from "@/context/language/LanguageContext";
import { ChevronLeftIcon } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { LocaleDropdown } from "./LocaleDropdown";

export default function Settings() {
  const lang = useLanguage();

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-sans font-medium text-2xl tracking-tight mb-0">
          <FormattedMessage
            id="Settings"
            defaultMessage="Settings"
            description="Header copy for Settings page"
          />
        </h1>
      </div>

      <LocaleDropdown value={lang.locale} values={lang.availableLocales()} onChange={lang.setLocale} />
    </div>
  );
}
