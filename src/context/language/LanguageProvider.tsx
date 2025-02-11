import { IntlProvider } from "react-intl";
import { useMemo, useState } from "react";
import { detectBrowserLanguage } from "@/utils";
import { DEFAULT_LOCALE, LanguageContext } from "./LanguageContext";
import meta from "@/constants/meta";

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

const availableLocales = Object.keys(translations);

export default function LanguageProvider({
  defaultLocale = DEFAULT_LOCALE,
  initWithBrowserLocale = !meta.devModeEnabled,
  children,
}: {
  defaultLocale?: string
  initWithBrowserLocale?: boolean,
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(initWithBrowserLocale ? detectBrowserLanguage() || defaultLocale : defaultLocale);
  const messages = useMemo(() => translations[locale], [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, availableLocales: () => (availableLocales) }}>
      <IntlProvider
        defaultLocale={DEFAULT_LOCALE}
        locale={locale}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
