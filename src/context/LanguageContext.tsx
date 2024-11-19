import { IntlProvider } from "react-intl";
import { createContext, useContext, useState } from "react";
import { detectBrowserLanguage } from "@/utils";

import en from "@/i18n/en.json";

const DEFAULT_LOCALE = "en";

const translations: { [key: string]: typeof en } = {
  en,
};

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

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
