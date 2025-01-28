import { emptyBillsList } from "./handlers/bills/list";
import { emptyContactsList } from "./handlers/contacts/get";

export const scenarios = {
  empty: [emptyBillsList, emptyContactsList],
};
