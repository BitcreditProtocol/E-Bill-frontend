import { apiFetch } from "@/utils/api";
import {
  GET_QUOTE,
  ACCEPT_QUOTE
} from "@/constants/endpoints";
import type { BillFull, Peer } from "@/types/bill";

type GetQuoteResponse = {
  bill_id: BillFull["id"];
  quote_id: string;
  sum: BillFull["sum"];
  mint_node_id: Peer["node_id"];
  mint_url: string;
  accepted: boolean;
  token: string; // can be empty if "accepted := false"
};
export async function getQuote(
  id: BillFull["id"]
): Promise<GetQuoteResponse> {
  return apiFetch<GetQuoteResponse>(GET_QUOTE.replace(":id", id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function acceptQuote(
  id: BillFull["id"]
): Promise<GetQuoteResponse> {
  return apiFetch(ACCEPT_QUOTE.replace(":id", id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
