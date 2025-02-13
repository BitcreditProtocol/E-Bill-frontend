import { SEARCH } from "@/constants/endpoints";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import { apiFetch } from "@/utils/api";
import { getBillsLight } from "./bills";

export type SearchResponse = {
  bills: Awaited<ReturnType<typeof getBillsLight>>['bills'];
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
  contacts: Pick<Contact,
  | "node_id"
  | "type"
  | "name"
  | "country"
  | "city"
  | "zip"
  | "address"
  | "avatar_file"
  >[];
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
