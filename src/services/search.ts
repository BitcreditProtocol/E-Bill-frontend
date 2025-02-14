import { SEARCH } from "@/constants/endpoints";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import { apiFetch } from "@/utils/api";
import { BillLight } from "@/types/bill";

export type SearchResponse = {
  bills: BillLight[];
  companies: Pick<Company,
  | "id"
  | "name"
  | "country_of_registration"
  | "city_of_registration"
  | "email"
  | "country"
  | "city"
  | "zip"
  | "address"
  | "registration_number"
  | "registration_date"
  | "signatories"
  | "logo_file"
  | "proof_of_registration_file"
  >[];
  contacts: Contact[];
};
export type SearchItemType = "Bill" | "Company" | "Contact" 

export type SearchPayload = {
  filter: {
    search_term: string;
    currency: string;
    item_types: SearchItemType[];
  };
};

export const SEARCH_ITEMS_ALL: SearchItemType[] = ["Bill", "Company", "Contact"];

export const search = async (payload: SearchPayload) => {
  return apiFetch<SearchResponse>(SEARCH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const searchContacts = async ({ search_term }: { search_term: string }) => {
  return search({
    filter: {
      search_term,
      currency: "sat",
      item_types: ["Contact"]
    }
  }).then((it) => it.contacts);
};
