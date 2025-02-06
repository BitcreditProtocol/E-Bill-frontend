import { apiFetch } from "@/utils/api";
import {
  ADD_COMPANY_SIGNER,
  CREATE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANIES,
  GET_COMPANY_DETAILS,
  GET_COMPANY_SIGNERS,
  REMOVE_COMPANY_SIGNER,
  UPLOAD_COMPANY_FILE,
} from "@/constants/endpoints";
import type { Company, Signer } from "@/types/company";

type UploadFileResponse = {
  file_upload_id: string;
};

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_COMPANY_FILE, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<UploadFileResponse>;
}

type CreateCompanyPayload = Pick<
  Company,
  | "name"
  | "email"
  | "country"
  | "city"
  | "zip"
  | "address"
  | "registration_date"
  | "country_of_registration"
  | "city_of_registration"
  | "registration_number"
> & {
  proof_of_registration_file_upload_id: string;
  logo_file_upload_id: string;
};

type CreateCompanyResponse = Company;

export async function createCompany(
  data: CreateCompanyPayload
): Promise<CreateCompanyResponse> {
  const response = await fetch(CREATE_COMPANY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<CreateCompanyResponse>;
}

export type EditCompanyPayload = Partial<CreateCompanyPayload> & {
  id: string;
};

export async function editCompany(data: EditCompanyPayload): Promise<void> {
  return apiFetch(EDIT_COMPANY, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

type GetCompaniesResponse = {
  companies: Company[];
};

export async function getCompanies(): Promise<GetCompaniesResponse> {
  return apiFetch<GetCompaniesResponse>(GET_COMPANIES);
}

type GetCompanyDetailsResponse = Company;

export async function getCompanyDetails(
  id: string
): Promise<GetCompanyDetailsResponse> {
  return apiFetch<GetCompanyDetailsResponse>(`${GET_COMPANY_DETAILS}/${id}`);
}

type GetCompanySignersResponse = {
  signatories: Signer[];
};

export async function getCompanySigners(
  id: string
): Promise<GetCompanySignersResponse> {
  return apiFetch<GetCompanySignersResponse>(`${GET_COMPANY_SIGNERS}/${id}`);
}

type AddSignatoryPayload = {
  id: string;
  signatory_node_id: string;
};

export async function addSignatory(data: AddSignatoryPayload): Promise<void> {
  return apiFetch(ADD_COMPANY_SIGNER, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export type RemoveSignatoryPayload = {
  id: string;
  signatory_node_id: string;
};

export async function removeSignatory(
  data: RemoveSignatoryPayload
): Promise<void> {
  return apiFetch(REMOVE_COMPANY_SIGNER, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
