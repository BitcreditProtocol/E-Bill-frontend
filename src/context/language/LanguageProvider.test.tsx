import { render as reactRender, cleanup} from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import LanguageProvider from "./LanguageProvider";
import { useLanguage, type LanguageContextType } from "./LanguageContext";
import { useEffect } from "react";

describe("LanguageProvider", () => {

  afterEach(cleanup);

  type TestComponentProps = {
    onLocaleChange?: (context: LanguageContextType) => void
  };

  const TestComponent = ({ onLocaleChange = () => {} }: TestComponentProps) => {
    const ctx = useLanguage();

    useEffect(() => {
      onLocaleChange(ctx);
    }, [ctx, onLocaleChange]);

    return <>{ctx.locale}</>;
  };

  const mockNavigation = (config: Partial<typeof global.navigator>) => {
    global.navigator = { ...global.navigator, ...config};
  };

  const render = ({ onLocaleChange }: TestComponentProps) => reactRender(
    <LanguageProvider initWithBrowserLocale={true}>
      <TestComponent onLocaleChange={onLocaleChange} />
    </LanguageProvider>
  );

  describe("should initialize locale correctly", () => {
    it("en", () => {
      mockNavigation({ language: "en-US" });

      const { container } = render({});
      expect(container).toHaveTextContent("en-US");
    });

    it("es", () => {
      mockNavigation({ language: "es-ES" });

      const { container } = render({});
      expect(container).toHaveTextContent("es-ES");
    });

    it("fr", () => {
      mockNavigation({ language: "fr-FR" });

      const { container } = render({});
      expect(container).toHaveTextContent("fr-FR");
    });

    it("zh", () => {
      mockNavigation({ language: "zh-CN" });

      const { container } = render({});
      expect(container).toHaveTextContent("zh-CN");
    });
  });

  describe("should change locale successfully", () => {
    beforeEach(() => vi.useFakeTimers());

    it("en", async () => {
      mockNavigation({ language: "en-US" });

      const { container } = render({ 
        onLocaleChange: (ctx) => {
          if (ctx.locale !== "it-IT") {
            setTimeout(() => ctx.setLocale("it-IT"), 1);
          }
        }
      });

      expect(container).toHaveTextContent("en-US");

      await vi.runAllTimersAsync();

      expect(container).toHaveTextContent("it-IT");
    });
  });

  describe("available locales", () => {
    beforeEach(() => vi.useFakeTimers());

    it("should return available locales", async () => {
      let availableLocales: string[] = [];
      render({
        onLocaleChange: (ctx) => {
          availableLocales = ctx.availableLocales();
        }
      });

      await vi.runAllTimersAsync();

      expect(availableLocales).toContain('ach-UG');
      expect(availableLocales).toContain('en-US');
      expect(availableLocales).toContain('es-AR');
      expect(availableLocales).toContain('tr-TR');
    });
  });

});
