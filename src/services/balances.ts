import { BALANCES_OVERVIEW } from "@/constants/endpoints";
import type { Balances } from "@/types/balances";

type GetBalancesResponse = Balances;

export const getBalances = async (
  currency: string
): Promise<GetBalancesResponse> => {
  const response = await fetch(`${BALANCES_OVERVIEW}${currency}`);

  if (!response.ok) {
    throw new Error("Failed to fetch balances");
  }

  return response.json() as Promise<GetBalancesResponse>;
};
