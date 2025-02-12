
import { BillFull, Peer } from "@/types/bill";

export const findHolder = (
  bill: BillFull
): Peer => {
  return bill.endorsed && bill.endorsee ? bill.endorsee : bill.payee;
};
