import { GET_CONTACTS, SEARCH_CONTACTS } from "@/constants/endpoints";
import type { Contact } from "@/types/contact";

type ContactsResponse = {
  contacts: Contact[];
}

export const getContacts = async () => {
  const response = await fetch(GET_CONTACTS);

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json() as Promise<ContactsResponse>;
};

type SearchContactsPayload = {
  filter: {
    search_term?: string;
    types?: Contact['type'][];
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
