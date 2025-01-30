import { balances } from "./handlers/home/balances";
import { recentBills } from "./handlers/home/recent-bills";
import { billsList } from "./handlers/bills/list";
import { searchBills } from "./handlers/bills/search";
import { searchContacts } from "./handlers/contacts/search";
import { getContact, getContacts } from "./handlers/contacts/get";
import { editContact } from "./handlers/contacts/edit";
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

export const handlers = [
  recentBills,
  balances,
  billsList,
  searchBills,
  searchContacts,
  getContact,
  getContacts,
  editContact,
  getCompaniesList,
  getSignersList,
  addSigner,
  removeSigner,
  getCompanyDetails,
  editCompanyInformation,
  getIdentityDetails,
  editIdentityInformation,
];
