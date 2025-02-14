import { SEARCH_BILLS } from "@/constants/endpoints";
import type { Bill } from "@/types/bill";

type BillsResponse = Bill[];

export const getRecentBills = async () => {
  const response = await fetch("/recent-bills");

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  return response.json() as Promise<BillsResponse>;
};

export const getBills = async () => {
  const response = await fetch("/bills");

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  return response.json() as Promise<BillsResponse>;
};

type SearchBillsPayload = {
  filter: {
    search_term?: string;
    date_range?: {
      from: string;
      to: string;
    };
    role?: string;
    currency?: string;
  };
};

type SearchBillsResponse = Pick<
  Bill,
  "bill_name" | "role" | "drawer" | "sum" | "issue_date"
>[];

// REMOVE?
export const searchBills = async (payload: SearchBillsPayload) => {
  const response = await fetch(SEARCH_BILLS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to search bills: ${response.statusText}`);
  }

  const data = (await response.json()) as Promise<SearchBillsResponse>;

  return data;
};
