import {
  CREATE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACT_DETAILS,
  GET_CONTACTS,
  REMOVE_CONTACT,
  UPLOAD_CONTACT_FILE,
} from "@/constants/endpoints";
import type { Contact } from "@/types/contact";

type UploadFileResponse = {
  file_upload_id: string;
};

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_CONTACT_FILE, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<UploadFileResponse>;
}

export type CreateContactPayload = Partial<Contact>;

type CreateContactResponse = Contact;

export async function createContact(
  data: CreateContactPayload
): Promise<CreateContactResponse> {
  const response = await fetch(CREATE_CONTACT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<CreateContactResponse>;
}

export type EditContactPayload = Partial<Contact>;

type EditContactResponse = Contact;

export async function editContact(
  data: EditContactPayload
): Promise<EditContactResponse> {
  const response = await fetch(EDIT_CONTACT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<EditContactResponse>;
}

type GetContactsResponse = {
  contacts: Contact[];
};

export async function getContacts(): Promise<GetContactsResponse> {
  const response = await fetch(GET_CONTACTS);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetContactsResponse>;
}

type GetContactDetailsResponse = Contact;

export async function getContactDetails(
  id: string
): Promise<GetContactDetailsResponse> {
  const response = await fetch(`${GET_CONTACT_DETAILS}/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<GetContactDetailsResponse>;
}

export async function removeContact(id: string): Promise<void> {
  const response = await fetch(`${REMOVE_CONTACT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
}
