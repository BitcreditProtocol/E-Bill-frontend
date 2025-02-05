import { http, delay, HttpResponse } from "msw";
import { BALANCES_OVERVIEW } from "@/constants/endpoints";
import { db } from "../db";

export const getBalances = http.get(BALANCES_OVERVIEW, async () => {
  await delay(1000);

  const activeIdentity = db.active_identity.findFirst({
    where: {},
  });

  const balances =
    activeIdentity?.type == "company"
      ? db.company.findFirst({
          where: {
            id: { equals: activeIdentity.node_id },
          },
        })?.balances
      : db.identity.findFirst({
          where: {
            node_id: { equals: activeIdentity?.node_id },
          },
        })?.balances;

  return HttpResponse.json({
    currency: balances?.currency ?? "sat",
    balances: {
      payee: {
        sum: balances?.payee.sum ?? 0,
      },
      payer: {
        sum: balances?.payer.sum ?? 0,
      },
      contingent: {
        sum: balances?.contingent.sum ?? 0,
      },
    },
  });
});
