import { http, HttpResponse } from "msw";
import { SEARCH } from "@/constants/endpoints";
import type { Bill } from "@/types/bill";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";

import * as bills from "@/mocks/handlers/bills/list";

const matchesSearchTerm = (it: Record<string, unknown>, search_term: string | undefined) => {
  return !search_term ? true : Object.entries(it).some(([, value]) => {
    if (value !== null && typeof value === "object") {
      return Object.values(value).some(
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
};

type SearchResponse = {
  bills: Pick<Bill,
  | "bill_name"
  | "role"
  | "payer"
  | "holder"
  | "payee"
  | "drawer"
  | "sum"
  | "issue_date"
  >[];
  companies: Pick<Company,
  | "id"
  | "name"
  | "country_of_registration"
  | "city_of_registration"
  | "postal_address"
  | "email"
  | "registration_number"
  | "registration_date"
  | "public_key"
  | "signatories"
  | "logo_file"
  | "proof_of_registration_file"
  >[];
  contacts: Pick<Contact,
  | "type"
  | "name"
  | "country"
  | "city"
  // TODO: add these fields once #211 is merged
  //| "node_id"
  //| "avatar"
  //| "zip"
  //| "address"
  >[];
};

const data: SearchResponse = {
  bills: bills.data,
  // TODO: use mocked company data once it exists
  companies: [{
    "id": "C5Pjn2jmz7W9xqty3qZ9V9SKBAxqoirRaibF1zqp2abX",
    "name": "Hayek Ltd.",
    "country_of_registration": "AT",
    "city_of_registration": "Vienna",
    "postal_address": "Smithstreet 34, 1030 Vienna",
    "email": "hayek_ltd@example.com",
    "registration_number": "1234 555 4321",
    "registration_date": "2011-08-22",
    "proof_of_registration_file": null,
    "logo_file": null,
    "signatories": [
        "16Uiu2HAm2dEM2YBqhvMyRCiFrRWbU35yDzfKNd9EwmW71vECKXk2"
    ],
    "public_key": "0249dff13e8c97e6a2633386b2322b17d0a3b319affff1b92ef31d0b18f56abf37"
  }],
  // TODO: use mocked contacts data once #211 is merged
  contacts: [{
    "type": 0,
    //"node_id": "12D3KooWBN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKYGuR77cy3",
    "name": "John Smith",
    //"avatar": "face_123252423432423.png",
    "country": "AT",
    "city": "Vienna",
    //"zip": "1020",
    //"address": "Smithstreet 15, Top 22"
}],
};

type SearchFilter = {
  search_term?: string;
  item_types?: string[];
};

const filterSearchResponse = (
  data: SearchResponse,
  { search_term, item_types }: SearchFilter
): SearchResponse => {
  const filteredData: SearchResponse = {
    bills: [],
    companies: [],
    contacts: [],
  };

  const allItemTypes = item_types === undefined || item_types.length === 0;

  filteredData.bills = (!allItemTypes && !item_types.includes("bills")) ? [] : data.bills.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.companies = (!allItemTypes && !item_types.includes("companies")) ? [] : data.companies.filter((it) => matchesSearchTerm(it, search_term));
  filteredData.contacts = (!allItemTypes && !item_types.includes("contacts")) ? [] : data.contacts.filter((it) => matchesSearchTerm(it, search_term));
  return filteredData;
};

export const search = http.post<
  never,
  never,
  SearchResponse,
  typeof SEARCH
>(SEARCH, async ({ request }) => {
  const { filter } = await request.json();

  const filteredData = filterSearchResponse(data, filter);

  return HttpResponse.json(filteredData);
});
