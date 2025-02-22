import { apiFetch } from "@/utils/api";
import {
  ADD_COMPANY_SIGNER,
  CHECK_COMPANIES_IN_DHT,
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
  formData.append("file", file, file.name);

  return apiFetch<UploadFileResponse>(UPLOAD_COMPANY_FILE, {
    method: "POST",
    body: formData,
  });
}

type CreateCompanyPayload = Pick<
  Company,
  "name" | "email" | "country" | "city" | "address"
> & {
  registration_date: string | null;
  country_of_registration: string | null;
  city_of_registration: string | null;
  registration_number: string | null;
  zip: string | null;
  proof_of_registration_file_upload_id?: string | null;
  logo_file_upload_id?: string | null;
};

type CreateCompanyResponse = Company;

export async function createCompany(
  data: CreateCompanyPayload
): Promise<CreateCompanyResponse> {
  return apiFetch<CreateCompanyResponse>(CREATE_COMPANY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export type EditCompanyPayload = Partial<CreateCompanyPayload> & {
  id: string;
};

export async function editCompany(data: EditCompanyPayload): Promise<void> {
  return apiFetch(EDIT_COMPANY, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetCompaniesResponse = {
  companies: Company[];
};

export async function getCompanies(): Promise<GetCompaniesResponse> {
  return apiFetch<GetCompaniesResponse>(GET_COMPANIES, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetCompanyDetailsResponse = Company;

export async function getCompanyDetails(
  id: string
): Promise<GetCompanyDetailsResponse> {
  return apiFetch<GetCompanyDetailsResponse>(`${GET_COMPANY_DETAILS}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetCompanySignersResponse = {
  signatories: Signer[];
};

export async function getCompanySigners(
  id: string
): Promise<GetCompanySignersResponse> {
  return apiFetch<GetCompanySignersResponse>(`${GET_COMPANY_SIGNERS}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type AddSignatoryPayload = {
  id: string;
  signatory_node_id: string;
};

export async function addSignatory(data: AddSignatoryPayload): Promise<void> {
  return apiFetch(ADD_COMPANY_SIGNER, {
    method: "PUT",
    body: JSON.stringify(data),

    headers: {
      "Content-Type": "application/json",
    },
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

    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function checkCompaniesInDHT(): Promise<void> {
  return apiFetch(CHECK_COMPANIES_IN_DHT, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
