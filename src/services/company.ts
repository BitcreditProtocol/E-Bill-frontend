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

type EditCompanyPayload = Partial<CreateCompanyPayload> & {
  id: string;
};

export async function editCompany(data: EditCompanyPayload): Promise<void> {
  const response = await fetch(EDIT_COMPANY, {
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

type GetCompaniesResponse = {
  companies: Company[];
};

export async function getCompanies(): Promise<GetCompaniesResponse> {
  const response = await fetch(GET_COMPANIES);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetCompaniesResponse>;
}

type GetCompanyDetailsResponse = Company;

export async function getCompanyDetails(
  id: string
): Promise<GetCompanyDetailsResponse> {
  const response = await fetch(`${GET_COMPANY_DETAILS}/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetCompanyDetailsResponse>;
}

type GetCompanySignersResponse = {
  signatories: Signer[];
};

export async function getCompanySigners(
  id: string
): Promise<GetCompanySignersResponse> {
  const response = await fetch(`${GET_COMPANY_SIGNERS}/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetCompanySignersResponse>;
}

type AddSignatoryPayload = {
  id: string;
  signatory_node_id: string;
};

export async function addSignatory(data: AddSignatoryPayload): Promise<void> {
  const response = await fetch(ADD_COMPANY_SIGNER, {
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

type RemoveSignatoryPayload = {
  id: string;
  signatory_node_id: string;
};

export async function removeSignatory(
  data: RemoveSignatoryPayload
): Promise<void> {
  const response = await fetch(REMOVE_COMPANY_SIGNER, {
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
