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

  const response = await fetch(UPLOAD_BILL_FILES, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<UploadFileResponse>;
}

type CreateBillPayload = Pick<
  BillFull,
  | "country_of_issuing"
  | "city_of_issuing"
  | "issue_date"
  | "maturity_date"
  | "payee"
  | "drawee"
  | "sum"
  | "currency"
  | "country_of_payment"
  | "city_of_payment"
  | "language"
> & {
  file_upload_id: string | null;
};

type CreateBillResponse = { id: string };

export async function createBill(
  data: CreateBillPayload
): Promise<CreateBillResponse> {
  const response = await fetch(CREATE_BILL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<CreateBillResponse>;
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
  }[];
};

export async function getBillsLight(): Promise<GetBillsLightResponse> {
  const response = await fetch(GET_BILLS_LIGHT);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetBillsLightResponse>;
}

export async function getBillsWithDetails() {}

type GetBillDetailsResponse = BillFull;

export async function getBillDetails(
  id: string
): Promise<GetBillDetailsResponse> {
  const response = await fetch(
    `http://127.0.0.1:8000${GET_BILL_DETAILS}/${id}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetBillDetailsResponse>;
}

type EndorsePayload = {
  bill_id: string;
  endorsee: string;
};

export async function endorse(data: EndorsePayload): Promise<void> {
  const response = await fetch(ENDORSE_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type MintPayload = {
  bill_id: string;
  endorsee: string;
  sum: string;
  currency: string;
};

export async function mint(data: MintPayload): Promise<void> {
  const response = await fetch(MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type OfferToSellPayload = {
  bill_id: string;
  buyer: string;
  sum: string;
  currency: string;
};

export async function offerToSell(data: OfferToSellPayload): Promise<void> {
  const response = await fetch(OFFER_TO_SELL_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function rejectToBuy(bill_id: string): Promise<void> {
  const response = await fetch(REJECT_TO_BUY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type RequestToMintPayload = {
  bill_id: string;
  mint_node: string;
  sum: string;
  currency: string;
};

export async function requestToMint(data: RequestToMintPayload): Promise<void> {
  const response = await fetch(REQUEST_TO_MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type AcceptMintPayload = {
  bill_id: string;
  sum: string;
};

export async function acceptMint(data: AcceptMintPayload): Promise<void> {
  const response = await fetch(ACCEPT_MINT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function requestToAccept(bill_id: string): Promise<void> {
  const response = await fetch(REQUEST_TO_ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function rejectToAccept(bill_id: string): Promise<void> {
  const response = await fetch(REJECT_TO_ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function accept(bill_id: string): Promise<void> {
  const response = await fetch(ACCEPT_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type RequestToPayPayload = {
  bill_id: string;
  sum: string;
};

export async function requestToPay(data: RequestToPayPayload): Promise<void> {
  const response = await fetch(REQUEST_TO_PAY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function rejectToPay(bill_id: string): Promise<void> {
  const response = await fetch(REJECT_TO_PAY_BILL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type RequestPaymentRecoursePayload = {
  bill_id: string;
  recoursee: string;
  sum: string;
  currency: string;
};

export async function requestPaymentRecourse(
  data: RequestPaymentRecoursePayload
): Promise<void> {
  const response = await fetch(REQUEST_BILL_PAYMENT_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

type RequestAcceptanceRecoursePayload = {
  bill_id: string;
  recoursee: string;
};

export async function requestAcceptanceRecourse(
  data: RequestAcceptanceRecoursePayload
): Promise<void> {
  const response = await fetch(REQUEST_BILL_ACCEPTANCE_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}

export async function rejectToPayRecourse(bill_id: string): Promise<void> {
  const response = await fetch(REJECT_BILL_PAYMENT_RECOURSE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}
