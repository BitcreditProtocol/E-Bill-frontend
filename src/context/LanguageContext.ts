import { createContext, useContext } from "react";

const DEFAULT_LOCALE = "en";

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

const useLanguage = () => useContext(LanguageContext);

export { LanguageContext, useLanguage, DEFAULT_LOCALE };
