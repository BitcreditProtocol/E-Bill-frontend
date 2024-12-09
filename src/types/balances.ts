type Balance = {
  amount: string;
  currency: string;
};

export type Balances = {
  balances: {
    payee: Balance;
    payer: Balance;
    contingent: Balance;
  };
};
