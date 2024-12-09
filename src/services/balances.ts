type BalancesResponse = {
  balances: {
    payee: {
      amount: string;
      currency: string;
    };
    payer: {
      amount: string;
      currency: string;
    };
    contingent: {
      amount: string;
      currency: string;
    };
  };
};

export const getBalances = async (currency: string) => {
  const response = await fetch(`/overview?currency=${currency}`);

  if (!response.ok) {
    throw new Error("Failed to fetch balances");
  }

  return response.json() as Promise<BalancesResponse>;
};
