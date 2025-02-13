import { delay, http, HttpResponse } from "msw";
import { SEARCH } from "@/constants/endpoints";
import { matchesSearchTerm } from "../utils";
import type { SearchPayload, SearchResponse } from "@/services/search";
import { db } from "../../db";

const data: SearchResponse = {
  bills: db.bill.getAll().map((it) => ({
    ...it,
    drawer: {
      name: it.drawer?.name || "",
      node_id: it.drawer?.node_id || "",
    },
    drawee: {
      name: it.drawee?.name || "",
      node_id: it.drawee?.node_id || "",
    },
    payee: {
      name: it.payee?.name || "",
      node_id: it.payee?.node_id || "",
    },
    endorsee: null,
  })),
  companies: db.company.getAll().map((it) => ({
    ...it,
    zip: it.zip || '',
    registration_date: it.registration_date || '',
    country_of_registration: it.country_of_registration || '',
    city_of_registration: it.city_of_registration || '',
    registration_number: it.registration_number || '',
    logo_file: {
      "name": "",
      "hash": "",
    },
    proof_of_registration_file: {
      "name": "",
      "hash": "",
    },
    signatories: [],
  })),
  contacts: db.contact.getAll().map((it) => ({
    ...it,
    zip: it.zip || '',
    avatar_file: null,
  })),
};

const filterSearchResponse = (
  data: SearchResponse,
  { filter: { search_term, item_types } }: SearchPayload
): SearchResponse => {
  const filteredData: SearchResponse = {
    bills: [],
    companies: [],
    contacts: [],
  };

  filteredData.bills = (!item_types.includes("Bill")) ? [] : data.bills.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.companies = (!item_types.includes("Company")) ? [] : data.companies.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.contacts = (!item_types.includes("Contact")) ? [] : data.contacts.filter((it) => matchesSearchTerm(it, search_term));
  return filteredData;
};

export const search = http.post<
  never,
  never,
  SearchResponse,
  typeof SEARCH
>(SEARCH, async ({ request }) => {
  const payload = await request.json();

  const filteredData = filterSearchResponse(data, payload);
  await delay(1000);

  return HttpResponse.json(filteredData);
});
