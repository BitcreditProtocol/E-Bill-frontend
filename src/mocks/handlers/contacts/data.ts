import { Contact, ContactTypes } from "@/types/contact";

const ALICE = {
  type: ContactTypes.Person,
  node_id: "11111111BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY11111111",
  name: "Alice White",
  email: "alice@example.com",
  country: "US",
  city: "Miami",
  zip: "33179",
  address: "1650 Rinehart Road, Miami, FL 33179",
  date_of_birth_or_registration: "1970-01-01",
  country_of_birth_or_registration: "US",
  city_of_birth_or_registration: "Miami",
  identification_number: "1234567890",
};

const BOB = {
  type: ContactTypes.Person,
  node_id: "22222222BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY22222222",
  name: "Bob White",
  email: "bob@example.com",
  country: "US",
  city: "Miami",
  zip: "33179",
  address: "1650 Rinehart Road, Miami, FL 33179",
  date_of_birth_or_registration: "1970-01-01",
  country_of_birth_or_registration: "US",
  city_of_birth_or_registration: "Miami",
  identification_number: "1234567890",
};

const DAVID = {
  type: ContactTypes.Person,
  node_id: "44444444BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY44444444",
  name: "David Brown",
  email: "david.brown@example.org",
  country: "UK",
  city: "London",
  zip: "SW1A 1AA",
  address: "10 Downing Street, London, SW1A 1AA",
  date_of_birth_or_registration: "1990-12-25",
  country_of_birth_or_registration: "UK",
  city_of_birth_or_registration: "London",
  identification_number: "AB123456C",
};

const EMILY = {
  type: ContactTypes.Person,
  node_id: "55555555BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY55555555",
  name: "Emily Davis",
  email: "emily.davis@example.net",
  country: "AU",
  city: "Sydney",
  zip: "2000",
  address: "300 George Street, Sydney, NSW 2000",
  date_of_birth_or_registration: "1992-03-14",
  country_of_birth_or_registration: "AU",
  city_of_birth_or_registration: "Sydney",
  identification_number: "7890123456",
};

const FIONA = {
  type: ContactTypes.Person,
  node_id: "66666666BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY66666666",
  name: "Fiona Green",
  email: "fiona.green@example.co.uk",
  country: "IE",
  city: "Dublin",
  zip: "D02 X285",
  address: "1 Grand Canal Quay, Dublin, D02 X285",
  date_of_birth_or_registration: "1980-11-05",
  country_of_birth_or_registration: "IE",
  city_of_birth_or_registration: "Dublin",
  identification_number: "IR987654321",
};

const GEORGE = {
  type: ContactTypes.Person,
  node_id: "77777777BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY77777777",
  name: "George Miller",
  email: "george.miller@example.edu",
  country: "NZ",
  city: "Wellington",
  zip: "6011",
  address: "55 Lambton Quay, Wellington 6011",
  date_of_birth_or_registration: "1988-09-30",
  country_of_birth_or_registration: "NZ",
  city_of_birth_or_registration: "Wellington",
  identification_number: "NZ123450987",
};

export const data: Contact[] = [ALICE, BOB, DAVID, EMILY, FIONA, GEORGE];