import { createContext, useContext } from "react";

/**
 * Crowdin "pseudo-language" for In-Context tooling
 * See: https://support.crowdin.com/developer/in-context-localization/
 */
const CROWDIN_PSEUDO_LOCALE = "ach-UG";

const DEFAULT_LOCALE_PROD = "en-US";
const DEFAULT_LOCALE_DEV = CROWDIN_PSEUDO_LOCALE;
const DEFAULT_LOCALE = import.meta.env.DEV ? DEFAULT_LOCALE_DEV : DEFAULT_LOCALE_PROD;

export type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

const useLanguage = () => useContext(LanguageContext);

export { 
  LanguageContext,
  useLanguage,
  DEFAULT_LOCALE
};
