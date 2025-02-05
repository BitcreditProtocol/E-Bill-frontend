import { http, delay, HttpResponse } from "msw";
import { GET_BILLS_LIGHT } from "@/constants/endpoints";
import { db } from "../db";

export const getBillsLight = http.get(GET_BILLS_LIGHT, async () => {
  await delay(1000);

  const bills = db.bill.getAll();

  const billsLight = bills.map((bill) => ({
    id: bill.id,
    drawer: {
      name: bill.drawer?.name,
      node_id: bill.drawer?.node_id,
    },
    drawee: {
      name: bill.drawee?.name,
      node_id: bill.drawee?.node_id,
    },
    payee: {
      name: bill.payee?.name,
      node_id: bill.payee?.node_id,
    },
    sum: bill.sum,
    currency: bill.currency,
    issue_date: bill.issue_date,
  }));

  return HttpResponse.json({
    bills: billsLight,
  });
});
