import { render as reactRender, cleanup, screen } from "@testing-library/react";
import { describe, it, afterEach, expect} from "vitest";
import List, { ListProps } from "./List";
import LanguageProvider from "@/context/language/LanguageProvider";
import { MemoryRouter } from "react-router-dom";

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
    render({ 
      values: [{
        name: "Alice",
        type: 0,
        email: "alice@example.com",
        postal_address: "",
        public_key: "0x01",
        date_of_birth_or_registration: "1970-01-01",
        country: "United States",
        city: "Miami",
        identification_number: "1234567890",
      }]
    });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(1);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryContainerA = screen.getByTestId("contact-category-container-A");
    expect(categoryContainerA.childNodes).toHaveLength(1);
  });

  it("should render list correctly (2 values, 1 category)", async () => {
    render({ 
      values: [{
        name: "Alice",
        type: 0,
        email: "alice@example.com",
        postal_address: "",
        public_key: "0x01",
        date_of_birth_or_registration: "1970-01-01",
        country: "United States",
        city: "Miami",
        identification_number: "1234567890",
      }, {
        name: "Ada",
        type: 0,
        email: "alice@example.com",
        postal_address: "",
        public_key: "0x01",
        date_of_birth_or_registration: "1970-01-01",
        country: "United States",
        city: "Miami",
        identification_number: "1234567890",
      }]
    });

    const container = screen.getByTestId("contact-list-container");
    expect(container.childNodes).toHaveLength(1);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryContainerA = screen.getByTestId("contact-category-container-A");
    expect(categoryContainerA.childNodes).toHaveLength(2);
  });

  it("should render list correctly (2 values, 2 categories)", async () => {
    render({ 
      values: [{
        name: "Alice",
        type: 0,
        email: "alice@example.com",
        postal_address: "",
        public_key: "0x01",
        date_of_birth_or_registration: "1970-01-01",
        country: "United States",
        city: "Miami",
        identification_number: "1234567890",
      }, {
        name: "Bob",
        type: 0,
        email: "alice@example.com",
        postal_address: "",
        public_key: "0x01",
        date_of_birth_or_registration: "1970-01-01",
        country: "United States",
        city: "Miami",
        identification_number: "1234567890",
      }]
    });

    const container = screen.getByTestId("contact-list-container");
    expect(container).toBeInTheDocument();
    expect(container.childNodes).toHaveLength(2);

    const categoryTitleA = screen.getByTestId("contact-category-title-A");
    expect(categoryTitleA).toHaveTextContent("A");

    const categoryContainerA = screen.getByTestId("contact-category-container-A");
    expect(categoryContainerA.childNodes).toHaveLength(1);

    const categoryTitleB = screen.getByTestId("contact-category-title-B");
    expect(categoryTitleB).toHaveTextContent("B");

    const categoryContainerB = screen.getByTestId("contact-category-container-B");
    expect(categoryContainerB.childNodes).toHaveLength(1);
  });
});
