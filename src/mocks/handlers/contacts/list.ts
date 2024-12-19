import { http, delay, HttpResponse } from "msw";
import { Contact } from "@/types/contact";

const ALICE = {
  name: "Alice White",
  type: 0,
  email: "alice@example.com",
  postal_address: "1650 Rinehart Road, Miami, FL 33179",
  public_key: "0x1234567890abcdef00000000",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
  proof_document: "passport1.pdf",
};

const ADA = {
  name: "Ada Purple".toLocaleLowerCase("en-US"),
  type: 0,
  email: "ada@example.com",
  postal_address: "1650 Rinehart Road, Miami, FL 33179",
  public_key: "0x1234567890abcdef00000001",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
  //proof_document: "passport2.pdf",
};

const APPLE = {
  name: "Apple",
  type: 1,
  email: "apple@example.com",
  postal_address: "165 University Avenue",
  public_key: "0x1234567890abcdef00000002",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Palo Alto, CA",
  identification_number: "1234567890",
  proof_document: "registration3.pdf",
};

const AMAZON = {
  name: "Amazon",
  type: 1,
  email: "amazon@example.com",
  postal_address: "165 University Avenue",
  public_key: "0x1234567890abcdef00000003",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Palo Alto, CA",
  identification_number: "1234567890",
  proof_document: "registration4.pdf",
};

const BOB = {
  name: "Bob Black",
  type: 0,
  email: "bob@example.com",
  postal_address: "1650 Rinehart Road, Miami, FL 33179",
  public_key: "0x1234567890abcdef11111111",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
  proof_document: "passport5.pdf",
};

const TERRY = {
  name: "Terry Green",
  type: 0,
  email: "terry@example.com",
  postal_address: "1650 Rinehart Road, Miami, FL 33179",
  public_key: "0x1234567890abcdef22222222",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
  proof_document: "passport6.pdf",
};

const BARNEY = {
  name: "Barney Yellow",
  type: 0,
  email: "barney@example.com",
  postal_address: "1650 Rinehart Road, Miami, FL 33179",
  public_key: "0x1234567890abcdef3333333",
  date_of_birth_or_registration: "1970-01-01",
  country: "United States",
  city: "Miami",
  identification_number: "1234567890",
  proof_document: "passport7.pdf",
};

export const data: Contact[] = [AMAZON, BOB, APPLE, TERRY, ALICE, BARNEY, ADA];

type ContactsResponse = {
  contacts: Contact[];
}

export const contactList = http.get<never, never, ContactsResponse, "/contacts/list">(
  "/contacts/list",
  async () => {
    await delay(2_000);

    return HttpResponse.json({
      contacts: data
    });
  }
);

export const emptyContactsList = http.get<never, never, ContactsResponse, "/contacts/list">(
  "/contacts/list",
  async () => {
    await delay(1_000);

    return HttpResponse.json({
      contacts: []
    });
  }
);
