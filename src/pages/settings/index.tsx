import { useLanguage } from "@/context/language/LanguageContext";
import { ChevronLeftIcon } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { LocaleDropdown } from "./LocaleDropdown";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

export default function Settings() {
  const navigate = useNavigate();
  const lang = useLanguage();

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="w-full">
        <button data-testid="settingsBackButton"
          onClick={() => { navigate(-1); }}
          className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
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

      <div className="flex flex-col gap-2">
        <LocaleDropdown value={lang.locale} values={lang.availableLocales()} onChange={lang.setLocale} />
      </div>

      {import.meta.env.DEV && (<div>
        <span className="font-sans font-medium text-xs tracking-tight mb-2">DEV</span>
        <div className="flex flex-col gap-2">
          <Button onClick={() => { navigate(`/${routes.ONBOARDING}`) }} size="xs">
            Onboarding
          </Button>
          <Button onClick={() => { navigate(`/${routes.LOGIN}`) }} size="xs">
            Login
          </Button>
        </div>
      </div>)}
    </div>
  );
}
