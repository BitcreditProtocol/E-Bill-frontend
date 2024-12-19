import { http, HttpResponse } from "msw";
import { SEARCH } from "@/constants/endpoints";
import type { Bill } from "@/types/bill";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";

const matchesSearchTerm = (it: Record<string, unknown>, search_term: string | undefined) => {
  return !search_term ? true : Object.entries(it).some(([, value]) => {
    if (value !== null && typeof value === "object") {
      return Object.values(value).some(
        (innerValue) =>
          typeof innerValue === "string" &&
          innerValue.toLowerCase().includes(search_term.toLowerCase())
      );
    }
    return (
      typeof value === "string" &&
      value.toLowerCase().includes(search_term.toLowerCase())
    );
  });
};

type SearchResponse = {
  bills: Pick<Bill,
  | "bill_name"
  | "role"
  | "payer"
  | "holder"
  | "payee"
  | "drawer"
  | "sum"
  | "issue_date"
  >[];
  companies: Company[];
  contacts: Contact[];
};

const data: SearchResponse = {
  bills: [{
    bill_name: "xxs1",
    role: "payee",
    payer: {
      name: "Mises Inc.",
    },
    holder: {
      name: "Rothbard Corp.",
    },
    payee: {
      name: "Rayek Ltd.",
    },
    drawer: {
      name: "Mises 2 Inc.",
    },
    sum: {
      amount: "100",
      currency: "USD",
    },
    issue_date: "2021-01-01",
  },
  {
    bill_name: "xxs",
    role: "payer",
    payer: {
      name: "Rothbard Corp.",
    },
    holder: {
      name: "Hayek Ltd.",
    },
    payee: {
      name: "Mises Corp",
    },
    drawer: {
      name: "Rothbard Corp.",
    },
    sum: {
      amount: "50",
      currency: "USD",
    },
    issue_date: "2021-01-02",
  },
  {
    bill_name: "axs",
    role: "drawer",
    payer: {
      name: "Hayek Ltd.",
    },
    holder: {
      name: "Mises Inc.",
    },
    payee: {
      name: "Mises Corp",
    },
    drawer: {
      name: "Hayek Ltd.",
    },
    sum: {
      amount: "1075.9",
      currency: "USD",
    },
    issue_date: "2021-01-03",
  }],
  companies: [],
  contacts: [],
};

type SearchFilter = {
  search_term?: string;
  item_types?: string[];
};

const filterSearchResponse = (
  data: SearchResponse,
  { search_term, item_types }: SearchFilter
): SearchResponse => {
  const filteredData: SearchResponse = {
    bills: [],
    companies: [],
    contacts: [],
  };

  const allItemTypes = item_types === undefined || item_types.length === 0;

  filteredData.bills = (!allItemTypes && !item_types.includes("bills")) ? [] : data.bills.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.companies = (!allItemTypes && !item_types.includes("companies")) ? [] : data.companies.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.contacts = (!allItemTypes && !item_types.includes("contacts")) ? [] : data.contacts.filter((it) => matchesSearchTerm(it, search_term));
  return filteredData;
};

export const search = http.post<
  never,
  never,
  SearchResponse,
  typeof SEARCH
>(SEARCH, async ({ request }) => {
  const { filter } = await request.json();

  const filteredData = filterSearchResponse(data, filter);

  return HttpResponse.json(filteredData);
});
