const LOGIN = "/login";
const UNLOCK = "/unlock";
const RESTORE_WITH_PRIVATE_KEY = "/private-key";
const RESTORE_WITH_SEED_PHRASE = "/seed-phrase";
const CREATE_IDENTITY = "/create-identity";
const HOME = "/home";
const REQUIRED_INFORMATION = "/required-information";
const EMAIL_VERIFICATION = "/email-verification";
const OPTIONAL_INFORMATION = "/optional-information";
const NOTIFICATIONS = "/notifications";
const BILLS = "/bills";
// todo: replace by /bills/:id once we integrate the api
const VIEW_BILL = "/bill";

export default {
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
};
