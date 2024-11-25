import { IntlProvider } from "react-intl";
import { createContext, useContext, useState } from "react";
import { detectBrowserLanguage } from "@/utils";

const DEFAULT_LOCALE = "en";

type TranslationMessages = Record<string, string>;

const modules = import.meta.glob<Record<string, TranslationMessages>>(
  "@/i18n/**/**/*.json",
  {
    eager: true,
  }
);

const translations: { [key: string]: Record<string, string> } = {};

for (const path in modules) {
  const match = path.match(/\/i18n\/(\w+)\/.*\.json$/);

  if (match) {
    const locale = match[1];
    translations[locale] = translations[locale] || {};

    const fileContent = modules[path];
    const content = fileContent.default || fileContent;

    if (content && typeof content === "object") {
      Object.assign(translations[locale], content);
    } else {
      console.warn(`Invalid JSON in file: ${path}`);
    }
  }
}

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
  const [locale, setLocale] = useState(
    detectBrowserLanguage() || DEFAULT_LOCALE
  );

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
