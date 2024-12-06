import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, expect, vi } from "vitest";
import { IntlProvider } from "react-intl";
import { DiscountForm, DiscountFormProps } from "./DiscountForm";
import userEvent from "@testing-library/user-event";
import Big from "big.js";

describe("DiscountForm", () => {

  afterEach(cleanup);

  const render = ({locale = "en", ...props}: DiscountFormProps & { locale?: string }) => reactRender(
    <IntlProvider locale={locale}>
      <DiscountForm {...props} />
    </IntlProvider>
  );

  it("should render correctly", () => {
    render({
      startDate: new Date(2009, 0, 1),
      endDate: new Date(2009, 0, 31),
      onSubmit: () => {}
    });

    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(1);

    const daysInput = screen.getByLabelText("Days");
    expect(daysInput).toBeInTheDocument();
    expect((daysInput as HTMLInputElement).value).toBe("30")

    const discountRateInput = screen.getByLabelText("Discount rate");
    expect(discountRateInput).toBeInTheDocument();

    const netAmountInput = screen.getByLabelText("Net amount");
    expect(netAmountInput).toBeInTheDocument();

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeInTheDocument();
  });

  it("should calculate gross amount correctly (0)", async () => {
    const onSubmit = vi.fn();

    render({
      startDate: new Date(2009, 0, 3),
      endDate: new Date(2009, 2, 3),
      onSubmit
    });

    await userEvent.clear(screen.getByLabelText("Days"));
    await userEvent.type(screen.getByLabelText("Days"), "365");
    await userEvent.type(screen.getByLabelText("Discount rate"), "100");
    await userEvent.type(screen.getByLabelText("Net amount"), "1");
    await userEvent.click(screen.getByText("Confirm"));

    expect(onSubmit).toHaveBeenCalledWith({
      days: "365",
      discountRate: "100",
      gross: {
        "currency": "BTC",
        "value": new Big("-71.99999999999999999424"),
      },
      net: {
        "currency": "BTC",
        "value": new Big("1"),
      },
    });
  });

  it("should calculate gross amount correctly (1)", async () => {
    const onSubmit = vi.fn();

    render({
      startDate: new Date(2009, 0, 3),
      endDate: new Date(2009, 2, 3),
      onSubmit
    });

    await userEvent.clear(screen.getByLabelText("Days"));
    await userEvent.type(screen.getByLabelText("Days"), "90");
    await userEvent.type(screen.getByLabelText("Discount rate"), "4.5");
    await userEvent.type(screen.getByLabelText("Net amount"), "1");
    await userEvent.click(screen.getByText("Confirm"));

    expect(onSubmit).toHaveBeenCalledWith({
      days: "90",
      discountRate: "4.5",
      gross: {
        "currency": "BTC",
        "value": new Big("1.01137800252844500632"),
      },
      net: {
        "currency": "BTC",
        "value": new Big("1"),
      },
    });
  });
});
