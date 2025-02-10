import { http, delay, HttpResponse } from "msw";
import {
  CREATE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACT_DETAILS,
  GET_CONTACTS,
  REMOVE_CONTACT,
} from "@/constants/endpoints";
import type {
  CreateContactPayload,
  EditContactPayload,
} from "@/services/contact_v2";
import { db } from "../db";

export const getContactsList = http.get(GET_CONTACTS, async () => {
  await delay(1000);

  const contacts = db.contact.findMany({});

  return HttpResponse.json({
    contacts,
  });
});

export const getContactDetails = http.get(
  `${GET_CONTACT_DETAILS}/:contactId`,
  async ({ params }) => {
    const { contactId } = params;

    await delay(1000);

    if (!contactId) {
      return HttpResponse.json(
        { error: "Contact ID is required" },
        { status: 500 }
      );
    }

    const contact = db.contact.findFirst({
      where: { node_id: { equals: contactId as string } },
    });

    return HttpResponse.json({
      ...contact,
    });
  }
);

export const createContact = http.post<never, CreateContactPayload>(
  CREATE_CONTACT,
  async ({ request }) => {
    const data = await request.json();

    await delay(1000);

    const contact = db.contact.create({
      ...data,
    });

    return HttpResponse.json({
      ...contact,
    });
  }
);

export const editContact = http.put<never, EditContactPayload>(
  EDIT_CONTACT,
  async ({ request }) => {
    const data = await request.json();

    await delay(1000);

    const contact = db.contact.update({
      where: { node_id: { equals: data.node_id } },
      data,
    });

    return HttpResponse.json({
      ...contact,
    });
  }
);

export const removeContact = http.delete(
  `${REMOVE_CONTACT}/:contactId`,
  async ({ params }) => {
    const { contactId } = params;

    await delay(1000);

    db.contact.delete({
      where: { node_id: { equals: contactId as string } },
    });

    return HttpResponse.json({});
  }
);
