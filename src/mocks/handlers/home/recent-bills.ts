import { http, delay, HttpResponse } from "msw";
import type { Bill } from "@/types/bill";

const mockedBills = [
  {
    id: "1",
    name: "Hayek Ltd.",
    amount_numbers: 100,
    currency_code: "USD",
    date_of_issue: "2021-01-01",
  },
  {
    id: "2",
    name: "Mises Inc.",
    amount_numbers: 50,
    currency_code: "USD",
    date_of_issue: "2021-01-02",
  },
  {
    id: "3",
    name: "Rothbard Corp.",
    amount_numbers: 1075.9,
    currency_code: "USD",
    date_of_issue: "2021-01-03",
  },
];

type BillsResponse = Bill[];

export const recentBills = http.get<
  never,
  never,
  BillsResponse,
  "/recent-bills"
>("/recent-bills", async () => {
  await delay(1000);

  return HttpResponse.json(mockedBills);
});
