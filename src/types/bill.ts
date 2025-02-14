import { Notification } from "./notification";

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
  endorsements_count: number;
  active_notification: Notification | null;
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

export type Peer = {
  type: number;
  node_id: string;
  name: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  email: string;
  nostr_relay: string;
};

export type Block = {
  data: string;
  hash: string;
  id: number;
  label: string;
  op_code: string;
  previous_hash: string;
  signature: string;
  timestamp: number;
};

export type BillFull = {
  id: string;
  time_of_drawing: number;
  country_of_issuing: string;
  city_of_issuing: string;
  drawee: Peer;
  drawer: Peer;
  payee: Peer;
  endorsee: Peer | null;
  currency: string;
  sum: string;
  maturity_date: string;
  issue_date: string;
  country_of_payment: string;
  city_of_payment: string;
  language: string;
  accepted: boolean;
  endorsed: boolean;
  requested_to_pay: boolean;
  requested_to_accept: boolean;
  paid: boolean;
  waiting_for_payment: boolean;
  buyer: Peer | null;
  seller: Peer | null;
  link_for_buy: string;
  link_to_pay: string;
  address_to_pay: string;
  mempool_link_for_address_to_pay: string;
  files: {
    name: string;
    hash: string;
  }[];
  chain_of_blocks: {
    blocks: Block[];
  };
  endorsements_count: number;
  active_notification: Notification | null;
  time_of_maturity: number;
};

export type BillLight = {
  id: BillFull["id"];
  drawee: Pick<Peer, "name" | "node_id">;
  drawer: Pick<Peer, "name" | "node_id">;
  payee: Pick<Peer, "name" | "node_id">;
  endorsee: Pick<Peer, "name" | "node_id"> | null;
  sum: BillFull["sum"];
  currency: BillFull["currency"];
  issue_date: BillFull["issue_date"];
  active_notification: BillFull["active_notification"];
  time_of_drawing: BillFull["time_of_drawing"];
}

// for bill creation
export const BILL_TYPE = {
  DRAFT: 2,
  SELF_DRAFTED: 1,
  PROMISSORY_NOTE: 0,
};
