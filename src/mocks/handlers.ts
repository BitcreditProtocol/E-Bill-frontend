import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";
import { searchContacts } from "./handlers/contacts/search";
import { search } from "./handlers/home/search";
import {
  getCompaniesList,
  getSignersList,
  removeSigner,
  getCompanyDetails,
  editCompanyInformation,
} from "./handlers/company";
import {
  getActiveIdentity,
  getIdentityDetails,
  editIdentityInformation,
  switchIdentity,
} from "./handlers/indentity_v2";
import {
  getContactDetails,
  getContactsList,
  createContact,
  editContact,
  removeContact,
} from "./handlers/contacts_v2";
import { getBillsLight } from "./handlers/bills_v2";
import { getBalances } from "./handlers/home";

export const handlers = [
  // home
  getBalances,
  recentBills,
  search,
  // bills
  getBillsLight,
  billsList,
  searchBills,
  searchContacts,
  editContact,
  getCompaniesList,
  getSignersList,
  removeSigner,
  getCompanyDetails,
  editCompanyInformation,
  // identity
  getActiveIdentity,
  getIdentityDetails,
  editIdentityInformation,
  switchIdentity,
  // contact
  getContactDetails,
  getContactsList,
  createContact,
  editContact,
  removeContact,
];
