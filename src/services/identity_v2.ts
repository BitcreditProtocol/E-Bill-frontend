import {
  CREATE_IDENTITY,
  EDIT_IDENTITY,
  GET_ACTIVE_IDENTITY,
  GET_IDENTITY_DETAILS,
  UPLOAD_IDENTITY_FILE,
  SWITCH_IDENTITY,
} from "@/constants/endpoints";
import type { Identity } from "@/types/identity";
import { apiFetch } from "@/utils/api";

type UploadFileResponse = {
  file_upload_id: string;
};

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_IDENTITY_FILE, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<UploadFileResponse>;
}

type CreateIdentityPayload = Pick<
  Identity,
  | "name"
  | "email"
  | "country"
  | "city"
  | "zip"
  | "address"
  | "date_of_birth"
  | "country_of_birth"
  | "city_of_birth"
  | "identification_number"
> & {
  profile_picture_file_upload_id: string;
  identity_document_file_upload_id: string;
};

type CreateIdentityResponse = Identity;

export async function createIdentity(
  data: CreateIdentityPayload
): Promise<CreateIdentityResponse> {
  const response = await fetch(CREATE_IDENTITY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<CreateIdentityResponse>;
}

export type EditIdentityPayload = Partial<CreateIdentityPayload>;

export async function editIdentity(data: EditIdentityPayload): Promise<Identity> {
  return apiFetch<CreateIdentityResponse>(EDIT_IDENTITY, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

type GetActiveIdentityResponse = {
  node_id: string;
};

export async function getActiveIdentity(): Promise<GetActiveIdentityResponse> {
  return await apiFetch<GetActiveIdentityResponse>(GET_ACTIVE_IDENTITY);
}

type GetIdentityDetailsResponse = Identity;

export async function getIdentityDetails(): Promise<GetIdentityDetailsResponse> {
  return await apiFetch<GetIdentityDetailsResponse>(GET_IDENTITY_DETAILS);
}

export async function switchIdentity(node_id: string): Promise<void> {
  await apiFetch(SWITCH_IDENTITY, {
    method: "PUT",
    body: JSON.stringify({ node_id }),
  });
}
