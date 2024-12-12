export type Bill = {
  bill_name: string;
  role?: "payee" | "payer" | "drawer" | "holder" | "endorsee";
  payer: {
    name: string;
  };
  holder: {
    name: string;
  };
  payee: {
    name: string;
  };
  drawer: {
    name: string;
  };
  drawee: {
    name: string;
  };
  endorsee: {
    name: string;
  };
  sum: {
    amount: string;
    currency: string;
  };
  issue_date: string;
  time_of_drawing?: number;
  maturity_date?: string;
  country_of_issuing?: string;
  city_of_issuing?: string;
  country_of_payment?: string;
  city_of_payment?: string;
  accepted?: boolean;
  endorsed?: boolean;
  paid?: boolean;
  files?: {
    file_name: string;
  }[];
};

export type SearchBillsFilter = {
  search_term?: string;
  date_range?: {
    from: string;
    to: string;
  };
  role?: string;
  currency?: string;
};
