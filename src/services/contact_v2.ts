import {
  CREATE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACT_DETAILS,
  GET_CONTACTS,
  REMOVE_CONTACT,
  UPLOAD_CONTACT_FILE,
} from "@/constants/endpoints";
import type { Contact } from "@/types/contact";
import { apiFetch } from "@/utils/api";

type UploadFileResponse = {
  file_upload_id: string;
};

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return await apiFetch<UploadFileResponse>(UPLOAD_CONTACT_FILE, {
    method: "POST",
    body: formData,
  });
}

export type CreateContactPayload = Partial<Contact>;

type CreateContactResponse = Contact;

export async function createContact(
  data: CreateContactPayload
): Promise<CreateContactResponse> {
  return await apiFetch<CreateContactResponse>(CREATE_CONTACT, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type EditContactPayload = Partial<Contact>;

type EditContactResponse = Contact;

export async function editContact(
  data: EditContactPayload
): Promise<EditContactResponse> {
  return await apiFetch<EditContactResponse>(EDIT_CONTACT, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

type GetContactsResponse = {
  contacts: Contact[];
};

export async function getContacts(): Promise<GetContactsResponse> {
  return await apiFetch<GetContactsResponse>(GET_CONTACTS);
}

type GetContactDetailsResponse = Contact;

export async function getContactDetails(
  id: string
): Promise<GetContactDetailsResponse> {
  return await apiFetch<GetContactDetailsResponse>(`${GET_CONTACT_DETAILS}/${id}`);
}

export async function removeContact(id: string): Promise<void> {
  await apiFetch(`${REMOVE_CONTACT}/${id}`, {
    method: "DELETE",
  });
}
