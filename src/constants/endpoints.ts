// bill endpoints
const UPLOAD_BILL_FILES = "/bill/upload_files";
const CREATE_BILL = "/bill/issue";
const GET_BILLS = "/bills";
const GET_BILLS_LIGHT = "/bill/list/light";
const GET_BILLS_ALL = "/bill/list_all";
const GET_BILL_DETAILS = "/bill/detail";
const GET_BILL_ENDORSEMENTS = "/bill/past_endorsees";
const SEARCH_BILLS = "/bill/search";
const ENDORSE_BILL = "/bill/endorse";
const MINT_BILL = "/bill/mint";
const OFFER_TO_SELL_BILL = "/bill/offer_to_sell";
const REJECT_TO_BUY_BILL = "/bill/reject_to_buy";
const REQUEST_TO_MINT_BILL = "/bill/request_to_mint";
const ACCEPT_MINT_BILL = "/bill/accept_mint";
const REQUEST_TO_ACCEPT_BILL = "/bill/request_to_accept";
const REJECT_TO_ACCEPT_BILL = "/bill/reject_to_accept";
const ACCEPT_BILL = "/bill/accept";
const REQUEST_TO_PAY_BILL = "/bill/request_to_pay";
const REJECT_TO_PAY_BILL = "/bill/reject_to_pay";
const REQUEST_BILL_PAYMENT_RECOURSE = "/bill/request_recourse_for_payment";
const REQUEST_BILL_ACCEPTANCE_RECOURSE =
  "/bill/request_recourse_for_acceptance";
const REJECT_BILL_PAYMENT_RECOURSE = "/bill/reject_recourse_for_payment";
const GET_BILL_PRIVATE_KEY = "/bill/bitcoin_key";
const GET_BILL_PAST_ENDORSEES = "/bill/past_endorsees/:id";
const CHECK_BILLS_IN_DHT = "/bill/dht";
const CHECK_BILL_IN_DHT = "/bill/dht/:id";
const CHECK_BILL_PAYMENT_STATUS = "/bill/check_payment";
const GET_BILL_ATTACHMENT = "/bill/attachment";

// quote endpoints
const GET_QUOTE = "/quote/return/:id";
const ACCEPT_QUOTE = "/quote/accept/:id";

// identity endpoints
const GET_ACTIVE_IDENTITY = "/identity/active";
const GET_IDENTITY_DETAILS = "/identity/detail";
const CREATE_IDENTITY = "/identity/create";
const UPLOAD_IDENTITY_FILE = "/identity/upload_file";
const EDIT_IDENTITY = "/identity/change";
const SWITCH_IDENTITY = "/identity/switch";
const RESTORE_SEED_PHRASE = "/identity/seed/recover";
const BACKUP_SEED_PHRASE = "/identity/seed/backup";
const RESTORE_BACKUP_FILE = "/identity/restore";
const DOWNLOAD_BACKUP = "/identity/backup";

// company endpoints
const GET_COMPANIES = "/company/list";
const GET_COMPANY_DETAILS = "/company";
const GET_COMPANY_SIGNERS = "/company/signatories";
const CREATE_COMPANY = "/company/create";
const UPLOAD_COMPANY_FILE = "/company/upload_file";
const EDIT_COMPANY = "/company/edit";
const ADD_COMPANY_SIGNER = "/company/add_signatory";
const REMOVE_COMPANY_SIGNER = "/company/remove_signatory";
const CHECK_COMPANIES_IN_DHT = "/company/check_dht";
const GET_COMPANY_FILE = "/company/file/:node_id/:name";

// contacts endpoints
const GET_CONTACTS = "/contacts/list";
const GET_CONTACT_DETAILS = "/contacts/detail";
const CREATE_CONTACT = "/contacts/create";
const UPLOAD_CONTACT_FILE = "/contacts/upload_file";
const EDIT_CONTACT = "/contacts/edit";
const REMOVE_CONTACT = "/contacts/remove";
const SEARCH_CONTACTS = "/contacts/search";
const GET_CONTACT_FILE = "contacts/file/:node_id/:name";

// other endpoints
const BALANCES_OVERVIEW = "/overview?currency=";
const LIST_ACTIVE_NOTIFICATIONS = "/notifications";
const SEARCH = "/search";
const EXIT = "/exit";
const RESOLVE_NOTIFICATION = "/notifications/:notification_id/done";
const GET_TEMP_FILE = "/temp_file/:file_id";

export {
  // bill
  UPLOAD_BILL_FILES,
  CREATE_BILL,
  GET_BILLS,
  SEARCH_BILLS,
  GET_BILLS_LIGHT,
  GET_BILLS_ALL,
  GET_BILL_DETAILS,
  GET_BILL_ENDORSEMENTS,
  ENDORSE_BILL,
  MINT_BILL,
  OFFER_TO_SELL_BILL,
  REJECT_TO_BUY_BILL,
  REQUEST_TO_MINT_BILL,
  ACCEPT_MINT_BILL,
  REQUEST_TO_ACCEPT_BILL,
  REJECT_TO_ACCEPT_BILL,
  ACCEPT_BILL,
  REQUEST_TO_PAY_BILL,
  REJECT_TO_PAY_BILL,
  REQUEST_BILL_PAYMENT_RECOURSE,
  REQUEST_BILL_ACCEPTANCE_RECOURSE,
  REJECT_BILL_PAYMENT_RECOURSE,
  GET_BILL_PRIVATE_KEY,
  GET_BILL_PAST_ENDORSEES,
  CHECK_BILLS_IN_DHT,
  CHECK_BILL_IN_DHT,
  CHECK_BILL_PAYMENT_STATUS,
  GET_BILL_ATTACHMENT,

  // quote
  GET_QUOTE,
  ACCEPT_QUOTE,

  // identity
  GET_ACTIVE_IDENTITY,
  GET_IDENTITY_DETAILS,
  CREATE_IDENTITY,
  UPLOAD_IDENTITY_FILE,
  EDIT_IDENTITY,
  SWITCH_IDENTITY,
  RESTORE_SEED_PHRASE,
  BACKUP_SEED_PHRASE,
  RESTORE_BACKUP_FILE,
  DOWNLOAD_BACKUP,

  // company
  GET_COMPANIES,
  GET_COMPANY_DETAILS,
  CREATE_COMPANY,
  UPLOAD_COMPANY_FILE,
  EDIT_COMPANY,
  GET_COMPANY_SIGNERS,
  ADD_COMPANY_SIGNER,
  REMOVE_COMPANY_SIGNER,
  CHECK_COMPANIES_IN_DHT,
  GET_COMPANY_FILE,

  // contacts
  SEARCH_CONTACTS,
  GET_CONTACTS,
  GET_CONTACT_DETAILS,
  CREATE_CONTACT,
  UPLOAD_CONTACT_FILE,
  EDIT_CONTACT,
  REMOVE_CONTACT,
  GET_CONTACT_FILE,

  // other
  BALANCES_OVERVIEW,
  LIST_ACTIVE_NOTIFICATIONS,
  SEARCH,
  EXIT,
  RESOLVE_NOTIFICATION,
  GET_TEMP_FILE,
};
