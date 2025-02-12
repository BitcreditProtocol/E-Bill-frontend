import { SEARCH } from "@/constants/endpoints";
import type { Bill } from "@/types/bill";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";

export type SearchResponse = {
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


export type SearchPayload = {
  filter: {
    search_term?: string;
    item_types?: string[];
  };
};

export const search = async (payload: SearchPayload) => {
  const response = await fetch(SEARCH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to search: ${response.statusText}`);
  }

  const data = (await response.json()) as Promise<SearchResponse>;

  return data;
};
