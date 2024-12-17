import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, expect} from "vitest";
import List, { ListProps } from "./List";
import LanguageProvider from "@/context/language/LanguageProvider";
import { MemoryRouter } from "react-router-dom";

const ALICE = {
  name: "Alice",
  type: 0,
  email: "alice@example.com",
  postal_address: "",
  public_key: "0x01",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
};

const ADA = {
  name: "Ada".toLocaleLowerCase(),
  type: 0,
  email: "ada@example.com",
  postal_address: "",
  public_key: "0x02",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
};

const BOB = {
  name: "Bob",
  type: 0,
  email: "bob@example.com",
  postal_address: "",
  public_key: "0x03",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
};

const CHARLIE = {
  name: "Charlie",
  type: 0,
  email: "charlie@example.com",
  postal_address: "",
  public_key: "0x04",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
};

describe("List", () => {

  afterEach(cleanup);

  const render = ({...props}: ListProps) => reactRender(
    <LanguageProvider defaultLocale="en-US">
      <MemoryRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <List {...props} />
      </MemoryRouter>
    </LanguageProvider>
  );

  it("should render empty list correctly", () => {
    render({ values: [] });

    const container = screen.getByTestId("contact-list-container");
    expect(container).toBeInTheDocument();
    expect(container.childNodes).toHaveLength(0);
    expect(container.innerHTML).toBe("");

    const categoryTitles = screen.queryAllByTestId(/contact-category-title-.*/);
    expect(categoryTitles).toHaveLength(0);
  });

  it("should render list correctly (1 value, 1 category)", async () => {
    render({ values: [ALICE] });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(1);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryItemsA = screen.getByTestId("contact-category-items-A");
    expect(categoryItemsA.childNodes).toHaveLength(1);
  });

  it("should render list correctly (2 values, 1 category)", async () => {
    render({ values: [ALICE, ADA] });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(1);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryItemsA = screen.getByTestId("contact-category-items-A");
    expect(categoryItemsA.childNodes).toHaveLength(2);
  });

  it("should render list correctly (2 values, 2 categories)", async () => {
    render({ values: [BOB, ALICE] });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(2);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryItemsA = screen.getByTestId("contact-category-items-A");
    expect(categoryItemsA.childNodes).toHaveLength(1);

    const categoryTitleB = screen.getByTestId("contact-category-title-B");
    expect(categoryTitleB).toHaveTextContent("B");

    const categoryItemsB = screen.getByTestId("contact-category-items-B");
    expect(categoryItemsB.childNodes).toHaveLength(1);
  });

  it("should verify sort order", async () => {
    render({ values: [CHARLIE, ADA, BOB, ALICE] });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(3);

    const categoryContainerA = screen.getByTestId("contact-category-container-A");
    const categoryContainerB = screen.getByTestId("contact-category-container-B");
    const categoryContainerC = screen.getByTestId("contact-category-container-C");

    expect(categoryContainerA.previousSibling).toBe(null);
    expect(categoryContainerA.nextSibling).toBe(categoryContainerB);
    expect(categoryContainerB.previousSibling).toBe(categoryContainerA);
    expect(categoryContainerB.nextSibling).toBe(categoryContainerC);
    expect(categoryContainerC.previousSibling).toBe(categoryContainerB);
    expect(categoryContainerC.nextSibling).toBe(null);
  });
});
