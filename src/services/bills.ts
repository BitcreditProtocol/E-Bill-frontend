import {
  CREATE_BILL,
  UPLOAD_BILL_FILES,
  GET_BILLS_LIGHT,
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

export async function getBillDetails() {}
