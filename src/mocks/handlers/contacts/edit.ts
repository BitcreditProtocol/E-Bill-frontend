import { EDIT_CONTACT } from "@/constants/endpoints";
import { http, delay, HttpResponse } from "msw";

export const editContact = http.put<never, never, never, typeof EDIT_CONTACT>(
  EDIT_CONTACT,
  async ({ request }) => {
    await delay(1500);

    return HttpResponse.json(await request.json());
  }
);
