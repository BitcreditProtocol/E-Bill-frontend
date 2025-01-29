const ROOT = "/";
const LOGIN = "login";
const UNLOCK = "unlock";
const RESTORE_WITH_PRIVATE_KEY = "private-key";
const RESTORE_WITH_SEED_PHRASE = "seed-phrase";
const HOME = "home";
const REQUIRED_INFORMATION = "required-information";
const EMAIL_VERIFICATION = "email-verification";
const OPTIONAL_INFORMATION = "optional-information";
const NOTIFICATIONS = "notifications";
const BILLS = "/bills";
// todo: replace by /bills/:id once we integrate the api

const SIGNUP = "signup";
const VIEW_BILL = "bill";
const ISSUE_BILL = "issue-bill";
const CREATE_BILL = "create-bill";
const PREVIEW_BILL = "preview-bill";
const MINT_BILL = "mint-bill";
const SELL_BILL = "sell-bill";
const CONTACTS = "contacts";
const CREATE_CONTACT = "new";
const VIEW_CONTACT = ":node_id";
const EDIT_CONTACT = ":node_id/edit";
const SETTINGS = "settings";
const ONBOARDING = "get-started";

const CREATE_IDENTITY = "/create-identity";
const IDENTITY_CATEGORY = "category";
const BILL_ISSUER = "bill-issuer";
const AUTHORIZED_SIGNER = "authorized-signer";
const SUCCESS = "success";

const VIEW_IDENTITY = "/identity";
const EDIT_IDENTITY = "/identity/edit";
const IDENTITY_LIST = "/identity/list";

const CREATE_COMPANY = "/company/create";

const CREATE_COMPANY_SUCCESS = "success";
const AUTHORIZED_SIGNERS = "/authorized-signers";
const ENDORSEMENTS = "/endorsements";
const ENDORSE = "/endorse";
const PAYMENT = "/payment";
const PAY = "/pay";

const REQUEST_MINT = "/request-mint";
const SELECT_QUOTE = "/select-quote";
const PREVIEW_MINT = "/preview-mint";
const MINT_RECEIVED = "/mint-received";
const MINT_REQUEST = "/mint-request";
const ABOUT = "/about";
const NOTIFICATIONS_SETTINGS = "/notifications-settings";
const SECURITY_SETTINGS = "/security-settings";
const MINT_SETTINGS = "/mint-settings";

const NON_ACCEPTANCE = "/non-acceptance";
const NON_PAYMENT = "/non-payment";

export default {
  ROOT,
  LOGIN,
  UNLOCK,
  HOME,
  RESTORE_WITH_PRIVATE_KEY,
  RESTORE_WITH_SEED_PHRASE,
  REQUIRED_INFORMATION,
  EMAIL_VERIFICATION,
  OPTIONAL_INFORMATION,
  NOTIFICATIONS,
  BILLS,
  VIEW_BILL,
  ISSUE_BILL,
  CREATE_BILL,
  PREVIEW_BILL,
  MINT_BILL,
  SELL_BILL,
  CONTACTS,
  CREATE_CONTACT,
  SIGNUP,
  SETTINGS,
  CREATE_COMPANY,
  CREATE_COMPANY_SUCCESS,
  CREATE_IDENTITY,
  IDENTITY_CATEGORY,
  BILL_ISSUER,
  AUTHORIZED_SIGNER,
  SUCCESS,
  VIEW_CONTACT,
  EDIT_CONTACT,
  VIEW_IDENTITY,
  EDIT_IDENTITY,
  AUTHORIZED_SIGNERS,
  ENDORSEMENTS,
  ENDORSE,
  PAYMENT,
  PAY,
  REQUEST_MINT,
  SELECT_QUOTE,
  PREVIEW_MINT,
  MINT_RECEIVED,
  MINT_REQUEST,
  ONBOARDING,
  ABOUT,
  NOTIFICATIONS_SETTINGS,
  SECURITY_SETTINGS,
  MINT_SETTINGS,
  NON_ACCEPTANCE,
  NON_PAYMENT,

  IDENTITY_LIST,
};
