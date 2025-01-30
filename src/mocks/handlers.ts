import { balances } from "./handlers/home/balances";
import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";
import { searchContacts } from "./handlers/contacts/search";
import {
  getCompaniesList,
  getSignersList,
  addSigner,
  removeSigner,
  getCompanyDetails,
  editCompanyInformation,
} from "./handlers/company";
import {
  getIdentityDetails,
  editIdentityInformation,
} from "./handlers/indentity_v2";
import {
  getContactDetails,
  getContactsList,
  createContact,
  editContact,
  removeContact,
} from "./handlers/contacts_v2";

export const handlers = [
  recentBills,
  balances,
  billsList,
  searchBills,
  searchContacts,
  editContact,
  getCompaniesList,
  getSignersList,
  addSigner,
  removeSigner,
  getCompanyDetails,
  editCompanyInformation,
  getIdentityDetails,
  editIdentityInformation,
  // contact
  getContactDetails,
  getContactsList,
  createContact,
  editContact,
  removeContact,
];
