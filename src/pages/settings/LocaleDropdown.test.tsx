import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, beforeEach, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { LocaleDropdown, LocaleDropdownProps } from "./LocaleDropdown";

describe("LocaleDropdown", () => {
  afterEach(cleanup);

  beforeEach(() => {
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  const dummyLocales = ["en-US", "es-AR", "tr-TR"];

  const render = ({ value, onChange }: Omit<LocaleDropdownProps, "values">) =>
    reactRender(
      <IntlProvider locale="en-US">
        <LocaleDropdown
          values={dummyLocales}
          value={value}
          onChange={onChange}
        />
      </IntlProvider>
    );

  it("should render correctly (no value)", () => {
    render({ onChange: () => {} });

    const localeInput = screen.getByLabelText("Locale");
    expect(localeInput).toBeInTheDocument();
    expect(localeInput).toHaveTextContent("");
  });

  it("should render correctly (value)", () => {
    render({ value: "tr-TR", onChange: () => {} });

    const localeInput = screen.getByLabelText("Locale");
    expect(localeInput).toBeInTheDocument();
    expect(localeInput).toHaveTextContent("tr-TR");
  });

  it("should have ability to change locale", async () => {
    const onChange = vi.fn();
    render({ value: "es-AR", onChange });

    const localeInput = screen.getByLabelText("Locale");
    expect(localeInput).toBeInTheDocument();
    expect(localeInput).toHaveTextContent("es-AR");

    const localeDropdownTriggerBtn = screen.getByTestId("localeInputTestId");
    expect(localeDropdownTriggerBtn).toBeInTheDocument();

    await userEvent.click(localeDropdownTriggerBtn);

    const enUSSelectItem = screen.getByText("en-US");
    expect(enUSSelectItem).toBeInTheDocument();

    const trTRSelectItem = screen.getByText("tr-TR");
    expect(trTRSelectItem).toBeInTheDocument();

    await userEvent.click(trTRSelectItem);

    expect(onChange).toHaveBeenCalledWith("tr-TR");
  });
});
