import { http, delay, HttpResponse } from "msw";
import type { Bill } from "@/types/bill";

const data = [
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
      name: "Mises Inc.",
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

type BillsResponse = Pick<
  Bill,
  "bill_name" | "payer" | "holder" | "payee" | "drawer" | "sum" | "issue_date"
>[];

export const recentBills = http.get<
  never,
  never,
  BillsResponse,
  "/recent-bills"
>("/recent-bills", async () => {
  await delay(1000);

  return HttpResponse.json(data);
});
