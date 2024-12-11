import { IntlProvider } from "react-intl";
import { useState } from "react";
import { detectBrowserLanguage } from "@/utils";
import { DEFAULT_LOCALE, LanguageContext } from "./LanguageContext";

type TranslationMessages = Record<string, string>;

const modules = import.meta.glob<Record<string, TranslationMessages>>(
  "@/i18n/**/translation.json",
  {
    eager: true,
  }
);

const translations: { [key: string]: Record<string, string> } = {};

for (const path in modules) {
  const match = path.match(/\/i18n\/(\w+-\w+)\/.*\.json$/);

  if (match) {
    const locale = match[1];
    const fileContent = modules[path];
    const content = fileContent.default;

    if (typeof content === "object") {
      translations[locale] = content;
    } else {
      console.warn(`Invalid JSON in file: ${path}`);
    }
  }
}

export default function LanguageProvider({
  defaultLocale = DEFAULT_LOCALE,
  initWithBrowserLocale = import.meta.env.PROD,
  children,
}: {
  defaultLocale?: string
  initWithBrowserLocale?: boolean,
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(initWithBrowserLocale ? detectBrowserLanguage() || defaultLocale : defaultLocale);

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
