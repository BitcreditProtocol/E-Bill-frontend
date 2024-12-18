import { GET_CONTACTS } from "@/constants/endpoints";
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
