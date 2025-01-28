import { http, delay, HttpResponse } from "msw";
import { Contact } from "@/types/contact";
import { data } from "./data";

type ContactsListResponse = {
  contacts: Contact[];
};

export const getContacts = http.get<
  never,
  never,
  ContactsListResponse,
  "/contacts/list"
>("/contacts/list", async () => {
  await delay(2_000);

  return HttpResponse.json({
    contacts: data,
  });
});

export const getContact = http.get<
  never,
  never,
  Contact | null,
  "/contacts/details/:node_id"
>("/contacts/details/:node_id", async ({ params }) => {
  const { node_id } = params;
  const contact = data.find((it) => it.node_id === node_id);

  await delay(2_000);

  if (!contact) {
    return HttpResponse.json(null, { status: 404 });
  }

  return HttpResponse.json({
    ...contact,
  });
});

export const emptyContactsList = http.get<
  never,
  never,
  ContactsListResponse,
  "/contacts/list"
>("/contacts/list", async () => {
  await delay(1_000);

  return HttpResponse.json({
    contacts: [],
  });
});
