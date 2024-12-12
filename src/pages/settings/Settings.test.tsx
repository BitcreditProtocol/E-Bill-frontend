import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { IntlProvider } from "react-intl";
import Settings from ".";

describe("Settings", () => {

  afterEach(cleanup);

  const render = ({locale = "en", ...props}: { locale?: string }) => reactRender(
    <IntlProvider locale={locale}>
      <Settings {...props} />
    </IntlProvider>
  );

  it("should render correctly", () => {
    render({});

    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(1);
    expect(headings[0].innerHTML).toBe("Settings");
  });
});
