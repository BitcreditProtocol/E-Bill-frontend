import { render as reactRender, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { FormattedCurrency, type FormattedCurrencyProps } from "./FormattedCurrency";
import { IntlProvider } from "react-intl";

describe("FormattedCurrency", () => {

  afterEach(cleanup);

  const render = ({locale = "en", ...props}: FormattedCurrencyProps & { locale?: string }) => reactRender(
    <IntlProvider locale={locale}>
      <FormattedCurrency {...props} />
    </IntlProvider>
  );

  describe("should display zero value correctly", () => {
    it("en", () => {
      const { container } = render({ value: 0 })
      expect(container.firstElementChild!.textContent).toBe("0.00");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });

    it("es", () => {
      const { container } = render({ value: 0, locale: "es" });
      expect(container.firstElementChild!.textContent).toBe("0,00");
    });

    it("fr", () => {
      const { container } = render({ value: 0, locale: "fr" });
      expect(container.firstElementChild!.textContent).toBe("0,00");
    });

    it("zh", () => {
      const { container } = render({ value: 0, locale: "zh" });
      expect(container.firstElementChild!.textContent).toBe("0.00");
    });
  });

  describe("should display positive value correctly", () => {
    it("en", () => {
      const { container } = render({ value: 21000001.23456789 });
      expect(container.firstElementChild!.textContent).toBe("+21,000,001.23456789");
      expect(container.firstElementChild!.classList).toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });

    it("es", () => {
      const { container } = render({ value: 21000001.23456789, locale: "es" });
      expect(container.firstElementChild!.textContent).toBe("+21.000.001,23456789");
    });

    it("fr", () => {
      const { container } = render({ value: 21000001.23456789, locale: "fr" });
      expect(container.firstElementChild!.textContent).toBe("+21 000 001,23456789");
    });

    it("zh", () => {
      const { container } = render({ value: 21000001.23456789, locale: "zh" });
      expect(container.firstElementChild!.textContent).toBe("+21,000,001.23456789");
    });
  });

  describe("should display negative value correctly", () => {
    it("en", () => {
      const { container } = render({ value: -1337.42 });
      expect(container.firstElementChild!.textContent).toBe("-1,337.42");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).toContain("text-signal-error");
    });

    it("es", () => {
      const { container } = render({ value: -1337.42, locale: "es" });
      expect(container.firstElementChild!.textContent).toBe("-1337,42");
    });

    it("fr", () => {
      const { container } = render({ value: -1337.42, locale: "fr" });
      expect(container.firstElementChild!.textContent).toBe("-1 337,42");
    });

    it("zh", () => {
      const { container } = render({ value: -1337.42, locale: "zh" });
      expect(container.firstElementChild!.textContent).toBe("-1,337.42");
    });
  });
});
