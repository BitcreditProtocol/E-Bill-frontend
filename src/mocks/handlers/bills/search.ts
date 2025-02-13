import { http, HttpResponse } from "msw";
import { SEARCH_BILLS } from "@/constants/endpoints";
import type { Bill } from "@/types/bill";
import { matchesSearchTerm } from "../utils";

type SearchBillsResponse = Pick<
  Bill,
  | "bill_name"
  | "role"
  | "payer"
  | "holder"
  | "payee"
  | "drawer"
  | "sum"
  | "issue_date"
>;

const data: SearchBillsResponse[] = [
  {
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
  },
];

type SearchBillsFilter = {
  search_term?: string;
  date_range?: {
    from: string;
    to: string;
  };
  role?: string;
  currency?: string;
};

const filterBills = (
  data: SearchBillsResponse[],
  filter: SearchBillsFilter
): SearchBillsResponse[] => {
  return data.filter((bill) => {
    const { search_term, date_range, role, currency } = filter;

    const matchesTerm = matchesSearchTerm(bill, search_term);

    const matchesDateRange =
      date_range && date_range.from !== "" && date_range.to !== ""
        ? new Date(bill.issue_date) >= new Date(date_range.from) &&
          new Date(bill.issue_date) <= new Date(date_range.to)
        : true;

    const matchesRole = role && role !== "all" ? bill.role === role : true;

    const matchesCurrency = currency ? bill.sum.currency === currency : true;

    return (
      matchesTerm && matchesDateRange && matchesRole && matchesCurrency
    );
  });
};

export const searchBills = http.post<
  never,
  never,
  SearchBillsResponse[],
  typeof SEARCH_BILLS
>(SEARCH_BILLS, async ({ request }) => {
  const { filter } = await request.json();

  const filteredData = filterBills(data, filter);

  return HttpResponse.json(filteredData);
});
