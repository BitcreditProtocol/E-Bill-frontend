import {
  CREATE_IDENTITY,
  EDIT_IDENTITY,
  GET_ACTIVE_IDENTITY,
  GET_IDENTITY_DETAILS,
  UPLOAD_IDENTITY_FILE,
  SWITCH_IDENTITY,
} from "@/constants/endpoints";
import type { Identity } from "@/types/identity";

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

export async function editIdentity(
  data: EditIdentityPayload
): Promise<Identity> {
  const response = await fetch(EDIT_IDENTITY, {
    method: "PUT",
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

type GetActiveIdentityResponse = {
  node_id: string;
};

export async function getActiveIdentity(): Promise<GetActiveIdentityResponse> {
  const response = await fetch(GET_ACTIVE_IDENTITY);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetActiveIdentityResponse>;
}

type GetIdentityDetailsResponse = Identity;

export async function getIdentityDetails(): Promise<GetIdentityDetailsResponse> {
  const response = await fetch(GET_IDENTITY_DETAILS);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetIdentityDetailsResponse>;
}

export async function switchIdentity(node_id: string): Promise<void> {
  const response = await fetch(SWITCH_IDENTITY, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ node_id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}
