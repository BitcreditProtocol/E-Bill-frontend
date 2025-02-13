import { apiFetch } from "@/utils/api";
import {
  CREATE_BILL,
  UPLOAD_BILL_FILES,
  GET_BILLS_LIGHT,
  GET_BILL_DETAILS,
  ENDORSE_BILL,
  MINT_BILL,
  OFFER_TO_SELL_BILL,
  REJECT_TO_BUY_BILL,
  REQUEST_TO_MINT_BILL,
  ACCEPT_MINT_BILL,
  REQUEST_TO_ACCEPT_BILL,
  REJECT_TO_ACCEPT_BILL,
  ACCEPT_BILL,
  REQUEST_TO_PAY_BILL,
  REJECT_TO_PAY_BILL,
  REQUEST_BILL_PAYMENT_RECOURSE,
  REQUEST_BILL_ACCEPTANCE_RECOURSE,
  REJECT_BILL_PAYMENT_RECOURSE,
  GET_BILL_ENDORSEMENTS,
  GET_BILL_PRIVATE_KEY,
  GET_BILL_PAST_ENDORSEES,
  CHECK_BILLS_IN_DHT,
  CHECK_BILL_PAYMENT_STATUS,
  GET_BILLS_ALL,
  CHECK_BILL_IN_DHT,
} from "@/constants/endpoints";
import type { BillFull, Peer } from "@/types/bill";

type UploadFileResponse = {
  file_upload_id: string;
};

export async function uploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return apiFetch<UploadFileResponse>(UPLOAD_BILL_FILES, {
    method: "POST",
    body: formData,
  });
}

type CreateBillPayload = Pick<
  BillFull,
  | "country_of_issuing"
  | "city_of_issuing"
  | "issue_date"
  | "maturity_date"
  | "sum"
  | "currency"
  | "country_of_payment"
  | "city_of_payment"
  | "language"
> & {
  payee: string;
  drawee: string;
  type: number;
  file_upload_id: string | null;
};

type CreateBillResponse = { id: string };

export async function createBill(
  data: CreateBillPayload
): Promise<CreateBillResponse> {
  return apiFetch<CreateBillResponse>(CREATE_BILL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type GetBillsLightResponse = {
  bills: {
    id: BillFull["id"];
    drawee: Pick<Peer, "name" | "node_id">;
    drawer: Pick<Peer, "name" | "node_id">;
    payee: Pick<Peer, "name" | "node_id">;
    endorsee: Pick<Peer, "name" | "node_id"> | null;
    sum: BillFull["sum"];
    currency: BillFull["currency"];
    issue_date: BillFull["issue_date"];
    active_notification: BillFull["active_notification"];
  }[];
};

export async function getBillsLight(): Promise<GetBillsLightResponse> {
  return apiFetch<GetBillsLightResponse>(GET_BILLS_LIGHT, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetBillsAllResponse = {
  bills: BillFull[];
};

export async function getBillsAll(): Promise<GetBillsAllResponse> {
  return apiFetch<GetBillsAllResponse>(GET_BILLS_ALL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getBillsWithDetails() {}

type GetBillDetailsResponse = BillFull;

export async function getBillDetails(
  id: BillFull["id"]
): Promise<GetBillDetailsResponse> {
  return apiFetch<GetBillDetailsResponse>(`${GET_BILL_DETAILS}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetPrivateKeyResponse = {
  private_key: string;
};

export async function getPrivateKey(
  id: BillFull["id"]
): Promise<GetPrivateKeyResponse> {
  return apiFetch<GetPrivateKeyResponse>(`${GET_BILL_PRIVATE_KEY}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetBillEndorsementsResponse = {
  past_endorsees: {
    pay_to_the_order_of: {
      name: string;
      node_id: string;
    };
    signed: {
      name: string;
      node_id: string;
      signatory: {
        name: string;
        node_id: string;
      };
    };
    signing_timestamp: number;
  }[];
};

export async function getEndorsements(
  id: BillFull["id"]
): Promise<GetBillEndorsementsResponse> {
  return apiFetch(`${GET_BILL_ENDORSEMENTS}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type EndorsePayload = {
  bill_id: BillFull["id"];
  endorsee: string;
};

export async function endorse(data: EndorsePayload): Promise<void> {
  return apiFetch(ENDORSE_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type MintPayload = {
  bill_id: BillFull["id"];
  endorsee: string;
  sum: string;
  currency: string;
};

export async function mint(data: MintPayload): Promise<void> {
  return apiFetch(MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type OfferToSellPayload = {
  bill_id: BillFull["id"];
  buyer: string;
  sum: string;
  currency: string;
};

export async function offerToSell(data: OfferToSellPayload): Promise<void> {
  return apiFetch(OFFER_TO_SELL_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function rejectToBuy(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(REJECT_TO_BUY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

type RequestToMintPayload = {
  bill_id: BillFull["id"];
  mint_node: string;
  sum: string;
  currency: string;
};

export async function requestToMint(data: RequestToMintPayload): Promise<void> {
  return apiFetch(REQUEST_TO_MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type AcceptMintPayload = {
  bill_id: BillFull["id"];
  sum: string;
};

export async function acceptMint(data: AcceptMintPayload): Promise<void> {
  return apiFetch(ACCEPT_MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function requestToAccept(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(REQUEST_TO_ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

export async function rejectToAccept(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(REJECT_TO_ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

export async function accept(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

type RequestToPayPayload = {
  bill_id: BillFull["id"];
  currency: string;
};

export async function requestToPay(data: RequestToPayPayload): Promise<void> {
  return apiFetch(REQUEST_TO_PAY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function rejectToPay(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(REJECT_TO_PAY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

type GetPastEndorseesResponse = {
  past_endorsees: {
    pay_to_the_order_of: {
      node_id: string;
      name: string;
    };
    signed: {
      node_id: string;
      name: string;
      signatory: {
        node_id: string;
        name: string;
      };
    };
    signing_timestamp: number;
    signing_address: {
      country: string;
      city: string;
      zip: string;
      address: string;
    };
  }[];
};

export async function getPastEndorsees(
  id: BillFull["id"]
): Promise<GetPastEndorseesResponse> {
  return apiFetch(GET_BILL_PAST_ENDORSEES.replace(":id", id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type RequestPaymentRecoursePayload = {
  bill_id: BillFull["id"];
  recoursee: string;
  sum: string;
  currency: string;
};

export async function requestPaymentRecourse(
  data: RequestPaymentRecoursePayload
): Promise<void> {
  return apiFetch(REQUEST_BILL_PAYMENT_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type RequestAcceptanceRecoursePayload = {
  bill_id: BillFull["id"];
  recoursee: string;
};

export async function requestAcceptanceRecourse(
  data: RequestAcceptanceRecoursePayload
): Promise<void> {
  return apiFetch(REQUEST_BILL_ACCEPTANCE_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function rejectToPayRecourse(
  bill_id: BillFull["id"]
): Promise<void> {
  return apiFetch(REJECT_BILL_PAYMENT_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });
}

export async function checkBillsInDHT(): Promise<void> {
  return apiFetch(CHECK_BILLS_IN_DHT, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function checkBillInDHT(bill_id: BillFull["id"]): Promise<void> {
  return apiFetch(CHECK_BILL_IN_DHT.replace(":id", bill_id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function checkBillPaymentStatus(): Promise<void> {
  return apiFetch(CHECK_BILL_PAYMENT_STATUS, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
