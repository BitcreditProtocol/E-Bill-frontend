import { balances } from "./handlers/home/balances";
import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";
import { contactList } from "./handlers/contacts/list";
import { searchContacts } from "./handlers/contacts/search";
import { viewContact } from "./handlers/contacts/view";

export const handlers = [
  recentBills,
  balances,
  billsList,
  searchBills,
  contactList,
  searchContacts,
  viewContact,
];
