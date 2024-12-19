import { emptyBillsList } from "./handlers/bills/list";
import { emptyContactsList } from "./handlers/contacts/list";

export const scenarios = {
  empty: [emptyBillsList, emptyContactsList],
};
