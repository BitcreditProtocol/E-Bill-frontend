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

  return apiFetch<UploadFileResponse>(UPLOAD_IDENTITY_FILE, {
    method: "POST",
    body: formData,
  });
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
  return apiFetch<CreateIdentityResponse>(CREATE_IDENTITY, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export type EditIdentityPayload = Partial<CreateIdentityPayload>;

export async function editIdentity(
  data: EditIdentityPayload
): Promise<Identity> {
  return apiFetch<CreateIdentityResponse>(EDIT_IDENTITY, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetActiveIdentityResponse = {
  type: number;
  node_id: string;
};

export async function getActiveIdentity(): Promise<GetActiveIdentityResponse> {
  return apiFetch<GetActiveIdentityResponse>(GET_ACTIVE_IDENTITY, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type GetIdentityDetailsResponse = Identity;

export async function getIdentityDetails(): Promise<GetIdentityDetailsResponse> {
  return apiFetch<GetIdentityDetailsResponse>(GET_IDENTITY_DETAILS, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function switchIdentity(node_id: string) {
  return apiFetch(SWITCH_IDENTITY, {
    method: "PUT",
    body: JSON.stringify({ node_id, type: 0 }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
