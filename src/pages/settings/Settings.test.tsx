import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, beforeEach, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import Settings from ".";
import LanguageProvider from "@/context/language/LanguageProvider";

describe("Settings", () => {

  afterEach(cleanup);

  beforeEach(() => {
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  const render = ({locale = "en-US", ...props}: { locale?: string }) => reactRender(
    <LanguageProvider defaultLocale={locale}>
      <Settings {...props} />
    </LanguageProvider>
  );

  it("should render correctly", () => {
    render({});

    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(1);
    expect(headings[0].innerHTML).toBe("Settings");
  });

  it("should have ability to change locale", async () => {
    render({
      locale: "es-AR",
    });

    const localeInput = screen.getByLabelText("Locale");
    expect(localeInput).toBeInTheDocument();
    expect(localeInput).toHaveTextContent("es-AR");
    
    const localeDropdownTriggerBtn = screen.getByTestId("localeInputTestId");
    expect(localeDropdownTriggerBtn).toBeInTheDocument();

    await userEvent.click(localeDropdownTriggerBtn);

    const trTRSelectItem = screen.getByText("tr-TR");
    expect(trTRSelectItem).toBeInTheDocument();

    await userEvent.click(trTRSelectItem);

    expect(localeInput).toHaveTextContent("tr-TR");
  });
});
