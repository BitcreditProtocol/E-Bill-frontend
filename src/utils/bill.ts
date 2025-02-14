
import { BillFull, BillLight, Peer } from "@/types/bill";

export const findHolder = (
  bill: Pick<BillFull, 'endorsed' | 'endorsee' | 'payee'>
): Peer => {
  return bill.endorsed && bill.endorsee ? bill.endorsee : bill.payee;
};

export const findHolderLight = (
  bill: Pick<BillLight, 'endorsee' | 'payee'>
): Pick<Peer, "name" | "node_id"> => {
  return bill.endorsee || bill.payee;
};
