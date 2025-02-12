import { http, HttpResponse } from "msw";
import { SEARCH } from "@/constants/endpoints";

import * as bills from "@/mocks/handlers/bills/list";
import * as contacts from "@/mocks/handlers/contacts/data";
import { matchesSearchTerm } from "../utils";
import type { SearchPayload, SearchResponse } from "@/services/search";

const data: SearchResponse = {
  bills: bills.data,
  // TODO: use mocked company data once it exists
  companies: [{
    "id": "C5Pjn2jmz7W9xqty3qZ9V9SKBAxqoirRaibF1zqp2abX",
    "name": "Hayek Ltd.",
    "country_of_registration": "AT",
    "city_of_registration": "Vienna",
    "country": "AT",
    "city": "Vienna",
    "zip": "1030",
    "address": "Smithstreet 34",
    "email": "hayek_ltd@example.com",
    "registration_number": "1234 555 4321",
    "registration_date": "2011-08-22",
    "proof_of_registration_file": {
      "name": "",
      "hash": "",
    },
    "logo_file": {
      "name": "",
      "hash": "",
    },
    "signatories": [],
  }],
  contacts: contacts.data,
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

  return HttpResponse.json(filteredData);
});
