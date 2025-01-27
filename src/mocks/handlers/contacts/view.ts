import { http, delay, HttpResponse } from "msw";

const ALICE = {
  type: 0,
  node_id: "11111111BN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKY11111111",
  name: "Alice White",
  email: "alice@example.com",
  country: "United States",
  city: "Miami",
  zip: "33179",
  address: "1650 Rinehart Road, Miami, FL 33179",
  date_of_birth_or_registration: "1970-01-01",
  country_of_birth_or_registration: "US",
  city_of_birth_or_registration: "Miamis",
  identification_number: "1234567890",
};

type Contact = {
  type: number;
  node_id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  date_of_birth_or_registration: string;
  country_of_birth_or_registration: string;
  city_of_birth_or_registration: string;
  identification_number: string;
};

export const viewContact = http.get<
  never,
  never,
  Contact,
  "/contacts/details/:node_id"
>("/contacts/details/:node_id", async () => {
  await delay(2_000);

  console.log("hit");

  return HttpResponse.json({
    ...ALICE,
  });
});
