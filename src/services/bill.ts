import { Bill } from "@/types/bill";

type BillsResponse = Bill[];

export const getRecentBills = async () => {
  const response = await fetch("/bills");

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  return response.json() as Promise<BillsResponse>;
};
