const ROOT = "/";
const LOGIN = "login";
const UNLOCK = "unlock";
const RESTORE_WITH_PRIVATE_KEY = "private-key";
const RESTORE_WITH_SEED_PHRASE = "seed-phrase";
const CREATE_IDENTITY = "create-identity";
const HOME = "home";
const REQUIRED_INFORMATION = "required-information";
const EMAIL_VERIFICATION = "email-verification";
const OPTIONAL_INFORMATION = "optional-information";
const NOTIFICATIONS = "notifications";
const BILLS = "/bills";
// todo: replace by /bills/:id once we integrate the api
const VIEW_BILL = "bill";
const ISSUE_BILL = "issue-bill";
const CREATE_BILL = "create-bill";
const PREVIEW_BILL = "preview-bill";
const MINT_BILL = "mint-bill";
const SELL_BILL = "sell-bill";
const CONTACTS = "contacts";
const CREATE_CONTACT = "create-contact";
const SETTINGS = "settings";
const VIEW_CONTACT = "/view-contact";
const EDIT_CONTACT = "/edit-contact";

const ENDORSEMENTS = "/endorsements";
const ENDORSE = "/endorse";
const PAYMENT = "/payment";
const PAY = "/pay";

const REQUEST_MINT = "/request-mint";

export default {
  ROOT,
  LOGIN,
  UNLOCK,
  HOME,
  RESTORE_WITH_PRIVATE_KEY,
  RESTORE_WITH_SEED_PHRASE,
  CREATE_IDENTITY,
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
  SETTINGS,
  VIEW_CONTACT,
  EDIT_CONTACT,
  ENDORSEMENTS,
  ENDORSE,
  PAYMENT,
  PAY,
  REQUEST_MINT,
};
