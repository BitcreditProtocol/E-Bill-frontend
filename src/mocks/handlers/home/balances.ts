import { http, delay, HttpResponse } from "msw";
import type { Balances } from "@/types/balances";

const mockedBalances = {
  balances: {
    payee: {
      amount: "0.06532",
      currency: "btc",
    },
    payer: {
      amount: "2.06532",
      currency: "btc",
    },
    contingent: {
      amount: "15.06532",
      currency: "btc",
    },
  },
};

type BalancesResponse = Balances;

export const balances = http.get<
  never,
  never,
  BalancesResponse,
  "/overview?currency=btc"
>("/overview?currency=btc", async () => {
  await delay(1000);

  return HttpResponse.json(mockedBalances);
});
