import { apiFetch } from "@/utils/api";
import { BALANCES_OVERVIEW } from "@/constants/endpoints";
import type { Balances } from "@/types/balances";

type GetBalancesResponse = Balances;

export const getBalances = async (
  currency: string
): Promise<GetBalancesResponse> => {
  return apiFetch(`${BALANCES_OVERVIEW}${currency}`);
};
