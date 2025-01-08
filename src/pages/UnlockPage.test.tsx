import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Unlock from "@/pages/Unlock";
import routes from "@/constants/routes";

// Mock the `useNavigate` hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn() };
});

describe("Unlock Component", () => {
  const navigate = vi.fn();
  beforeEach(() => {
    vi.resetAllMocks();
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
        <IntlProvider locale="en">
          <Unlock />
        </IntlProvider>
      </MemoryRouter>
    );

  beforeEach(renderComponent);

  afterEach(cleanup);

  it("should navigate back to login when Go Back button is clicked", () => {
    const backButton = screen.getAllByRole("button", { name: "" })[0];

    fireEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("should navigate to identity restoration page when 'Recover with seed phrase' button is clicked", () => {
    const recoveryButton = screen.getByRole("button", {
      name: "Recover with seed phrase",
    });

    fireEvent.click(recoveryButton);

    expect(navigate).toHaveBeenCalledWith('/' + routes.RESTORE_WITH_SEED_PHRASE);
  });

  it("should add digits to the PIN and display them as filled dots", () => {
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));

    const filledDots = screen.getAllByLabelText("filled dot");
    expect(filledDots).toHaveLength(3);

    const emptyDots = screen.getAllByLabelText("empty dot");
    expect(emptyDots).toHaveLength(3);
  });

  it("should delete digits from the PIN and update filled dots accordingly", () => {
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));

    const deleteButton = screen.getByRole("button", { name: "delete" });
    fireEvent.click(deleteButton);

    const filledDots = screen.getAllByLabelText("filled dot");
    expect(filledDots).toHaveLength(2);

    const emptyDots = screen.getAllByLabelText("empty dot");
    expect(emptyDots).toHaveLength(4);
  });

  it("should not allow more than 6 digits in the PIN", () => {
    ["1", "2", "3", "4", "5", "6", "7"].forEach((digit) =>
      fireEvent.click(screen.getByRole("button", { name: digit }))
    );

    const filledDots = screen.getAllByLabelText("filled dot");
    expect(filledDots).toHaveLength(6);
  });
});
