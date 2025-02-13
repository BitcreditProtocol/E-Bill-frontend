const ROOT = "/";
const LOGIN = "/login";
const UNLOCK = "/unlock";
const RESTORE_WITH_PRIVATE_KEY = "/private-key";
const RESTORE_WITH_SEED_PHRASE = "/seed-phrase";
const HOME = "/home";
const REQUIRED_INFORMATION = "/required-information";
const EMAIL_VERIFICATION = "/email-verification";
const OPTIONAL_INFORMATION = "/optional-information";
const NOTIFICATIONS = "/notifications";
const CASHFLOW = "/cashflow";
const SIGNUP = "/signup";

const BILLS = "/bills";
const VIEW_BILL = "/bill/:id";
const ISSUE_BILL = "/issue-bill";
const CREATE_BILL = "/bill/create";
const PREVIEW_BILL = "/preview-bill";
const MINT_BILL = "/mint-bill";

const CONTACTS = "/contacts";
const CREATE_CONTACT = "new";
const VIEW_CONTACT = ":nodeId";
const EDIT_CONTACT = ":nodeId/edit";
const SETTINGS = "/settings";
const ONBOARDING = "/get-started";

const CREATE_IDENTITY = "/create-identity";
const IDENTITY_CATEGORY = "/category";
const BILL_ISSUER = "/bill-issuer";
const AUTHORIZED_SIGNER = "/authorized-signer";
const SUCCESS = "/success";

const VIEW_IDENTITY = "/identity";
const EDIT_IDENTITY = "/identity/edit";
const IDENTITY_LIST = "/identity/list";

const CREATE_COMPANY = "/company/create";
const COMPANY_SIGNERS = "/company/signers";
const EDIT_COMPANY = "/company/edit";
const VIEW_COMPANY = "/company";

const CREATE_COMPANY_SUCCESS = "success";
const AUTHORIZED_SIGNERS = "/authorized-signers";
const ENDORSEMENTS = "/bill/:id/endorsements";
const ENDORSE = "/bill/:id/endorse";
const PAYMENT = "/bill/:id/payment";
const PAY = "/bill/:id/pay";
const SELL_BILL = "/bill/:id/sell";
const OFFER = "/bill/:id/offer";
const RECOURSE = "/bill/:id/recourse";

const REQUEST_MINT = "/bill/:id/request-mint";
const SELECT_QUOTE = "/bill/:id/select-quote";
const PREVIEW_MINT = "/bill/:id/preview-mint";
const MINT_RECEIVED = "/bill/:id/mint-received";
const MINT_REQUEST = "/bill/:id/mint-request";
const ABOUT = "/about";
const NOTIFICATIONS_SETTINGS = "/notifications-settings";
const SECURITY_SETTINGS = "/security-settings";
const MINT_SETTINGS = "/mint-settings";
const RECOVERY_SEED_PHRASE = "/recovery-phrase";

const NON_ACCEPTANCE = "/non-acceptance";
const NON_PAYMENT = "/non-payment";

export default {
  ROOT,
  LOGIN,
  UNLOCK,
  HOME,
  CASHFLOW,
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
  OFFER,
  RECOURSE,

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
  RECOVERY_SEED_PHRASE,

  NON_ACCEPTANCE,
  NON_PAYMENT,

  IDENTITY_LIST,
  COMPANY_SIGNERS,
  EDIT_COMPANY,
  VIEW_COMPANY,
};
