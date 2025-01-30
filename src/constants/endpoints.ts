const GET_BILLS = "/bills";
const SEARCH_BILLS = "/bill/search";
const GET_CONTACTS = "/contacts/list";
const SEARCH_CONTACTS = "/contacts/search";
const EDIT_CONTACT = "/contacts/edit";

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

export {
  GET_BILLS,
  SEARCH_BILLS,
  GET_CONTACTS,
  SEARCH_CONTACTS,
  EDIT_CONTACT,
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
};
