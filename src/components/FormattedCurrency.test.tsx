import { render as reactRender, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { IntlProvider } from "react-intl";
import { FormattedCurrency, type FormattedCurrencyProps } from "./FormattedCurrency";

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

  describe("font color", () => {
    it("should verify zero value color", () => {
      const { container } = render({ value: 0 });
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });

    it("should verify positive value color", () => {
      const { container } = render({ value: 21 });
      expect(container.firstElementChild!.classList).toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });

    it("should verify negative value color", () => {
      const { container } = render({ value: -21 });
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).toContain("text-signal-error");
    });

    it("should verify disabling font color", () => {
      const { container } = render({ value: -21, color: "none" });
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });

    it("should verify customizing font color", () => {
      const { container } = render({ value: 21, color: "none", className: "text-text-300" });
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
      expect(container.firstElementChild!.classList).toContain("text-text-300");
    });

    it("should verify displaying positive value as debit", () => {
      const { container } = render({ value: 21, type: "debit" });
      expect(container.firstElementChild!.classList).not.toContain("text-signal-success");
      expect(container.firstElementChild!.classList).toContain("text-signal-error");
    });

    it("should verify displaying negative value as credit", () => {
      const { container } = render({ value: -21, type: "credit" });
      expect(container.firstElementChild!.classList).toContain("text-signal-success");
      expect(container.firstElementChild!.classList).not.toContain("text-signal-error");
    });
  });

  describe("sign display", () => {
    it("should verify disabling sign", () => {
      const { container } = render({ value: 21, signDisplay: "never" });
      expect(container.firstElementChild!.textContent).toBe("21.00");
    });

    it("should verify adding sign to zero", () => {
      const { container } = render({ value: 0, signDisplay: "always"});
      expect(container.firstElementChild!.textContent).toBe("+0.00");
    });
  });

});
