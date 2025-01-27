import { GET_CONTACTS, SEARCH_CONTACTS } from "@/constants/endpoints";
import type { Contact } from "@/types/contact";

type ContactsResponse = {
  contacts: Contact[];
};

export const getContacts = async () => {
  const response = await fetch(GET_CONTACTS);

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json() as Promise<ContactsResponse>;
};

type GetContactResponse = {
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

export const getContact = async (node_id: string) => {
  const response = await fetch(`/contacts/details/${node_id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch contact");
  }

  return response.json() as Promise<GetContactResponse>;
};

type SearchContactsPayload = {
  filter: {
    search_term?: string;
    types?: Contact["type"][];
  };
};

type SearchContactsResponse = {
  contacts: Contact[];
};

export const searchContacts = async (payload: SearchContactsPayload) => {
  const response = await fetch(SEARCH_CONTACTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to search contacts: ${response.statusText}`);
  }

  const data = (await response.json()) as Promise<SearchContactsResponse>;

  return data;
};
