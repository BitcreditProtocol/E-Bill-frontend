type Balance = {
  sum: string;
};

export type Balances = {
  currency: string;
  balances: {
    payee: Balance;
    payer: Balance;
    contingent: Balance;
  };
};
