import { balances } from "./handlers/home/balances";
import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";
import { searchContacts } from "./handlers/contacts/search";
import { getContact, getContacts } from "./handlers/contacts/get";
import { editContact } from "./handlers/contacts/edit";

export const handlers = [
  recentBills,
  balances,
  billsList,
  searchBills,
  searchContacts,
  getContact,
  getContacts,
  editContact,
];
