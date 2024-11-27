import { IntlProvider } from "react-intl";
import { useState } from "react";
import { detectBrowserLanguage } from "@/utils";
import en from "@/i18n/source.json";
import { DEFAULT_LOCALE, LanguageContext } from "./LanguageContext";

const translations: { [key: string]: typeof en } = {
  en,
};

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(detectBrowserLanguage());

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        defaultLocale={DEFAULT_LOCALE}
        locale={locale}
        messages={translations[locale]}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
