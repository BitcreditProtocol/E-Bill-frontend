import { http, delay, HttpResponse } from "msw";
import { SEARCH_CONTACTS } from "@/constants/endpoints";
import type { Contact } from "@/types/contact";
import * as contacts from "@/mocks/handlers/contacts/list";

type SearchContactsResponse = {
  contacts: Contact[];
}

export const data: SearchContactsResponse = {
  contacts: contacts.data
};

type SearchContactsFilter = {
  search_term?: string;
  types?: Contact['type'][];
};

const filterContacts = (
  data: SearchContactsResponse,
  { search_term, types }: SearchContactsFilter
): SearchContactsResponse => {
  return {
    contacts: data.contacts.filter((it) => {
      const matchesSearchTerm = !search_term ? true : Object.entries(it).some(([, value]) => {
        if (typeof value === "object") {
          return Object.values(it).some(
            (innerValue) =>
              typeof innerValue === "string" &&
              innerValue.toLowerCase().includes(search_term.toLowerCase())
          );
        }
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(search_term.toLowerCase())
        );
      });

      const matchesTypes = types === undefined || types.includes(it.type);

      return (
        matchesSearchTerm && matchesTypes
      );
    })
  };
};

export const searchContacts = http.post<
  never,
  never,
  SearchContactsResponse,
  typeof SEARCH_CONTACTS
>(SEARCH_CONTACTS, async ({ request }) => {

  await delay(500);

  const { filter } = await request.json();

  const filteredData = filterContacts(data, filter);

  return HttpResponse.json(filteredData);
});
