// bill endpoints
const UPLOAD_BILL_FILES = "/bill/upload_files";
const CREATE_BILL = "/bill/issue";
const GET_BILLS = "/bills";
const GET_BILLS_LIGHT = "/bills/list/light";
const SEARCH_BILLS = "/bill/search";
const SEARCH_CONTACTS = "/contacts/search";

// identity endpoints
const GET_ACTIVE_IDENTITY = "/identity/active";
const GET_IDENTITY_DETAILS = "/identity/detail";
const CREATE_IDENTITY = "/identity/create";
const UPLOAD_IDENTITY_FILE = "/identity/upload";
const EDIT_IDENTITY = "/identity/change";
const SWITCH_IDENTITY = "/identity/switch";

// company endpoints
const GET_COMPANIES = "/company/list";
const GET_COMPANY_DETAILS = "/company";
const GET_COMPANY_SIGNERS = "/company/signatories";
const CREATE_COMPANY = "/company/create";
const UPLOAD_COMPANY_FILE = "/company/upload";
const EDIT_COMPANY = "/company/edit";
const ADD_COMPANY_SIGNER = "/company/add_signatory";
const REMOVE_COMPANY_SIGNER = "/company/remove_signatory";

// contacts endpoints
const GET_CONTACTS = "/contacts/list";
const GET_CONTACT_DETAILS = "/contacts/detail";
const CREATE_CONTACT = "/contacts/create";
const UPLOAD_CONTACT_FILE = "/contacts/upload_file";
const EDIT_CONTACT = "/contacts/edit";
const REMOVE_CONTACT = "/contacts/remove";

// other endpoints
const BALANCES_OVERVIEW = "/overview?currency=";

export {
  UPLOAD_BILL_FILES,
  CREATE_BILL,
  GET_BILLS,
  SEARCH_BILLS,
  GET_BILLS_LIGHT,
  GET_ACTIVE_IDENTITY,
  GET_IDENTITY_DETAILS,
  CREATE_IDENTITY,
  UPLOAD_IDENTITY_FILE,
  EDIT_IDENTITY,
  SWITCH_IDENTITY,
  GET_COMPANIES,
  GET_COMPANY_DETAILS,
  CREATE_COMPANY,
  UPLOAD_COMPANY_FILE,
  EDIT_COMPANY,
  GET_COMPANY_SIGNERS,
  ADD_COMPANY_SIGNER,
  REMOVE_COMPANY_SIGNER,

  // contacts
  SEARCH_CONTACTS,
  GET_CONTACTS,
  GET_CONTACT_DETAILS,
  CREATE_CONTACT,
  UPLOAD_CONTACT_FILE,
  EDIT_CONTACT,
  REMOVE_CONTACT,

  // other
  BALANCES_OVERVIEW,
};
