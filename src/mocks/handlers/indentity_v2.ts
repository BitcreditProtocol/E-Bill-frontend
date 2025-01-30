import { http, delay, HttpResponse } from "msw";
import { EDIT_IDENTITY, GET_IDENTITY_DETAILS } from "@/constants/endpoints";
import type { EditIdentityPayload } from "@/services/identity_v2";
import { db } from "../db";

export const getIdentityDetails = http.get(GET_IDENTITY_DETAILS, async () => {
  await delay(1000);

  const identity = db.identity.findFirst({
    where: { node_id: { equals: "1" } },
  });

  return HttpResponse.json({
    ...identity,
  });
});

type EditIdentityInformationPayload = EditIdentityPayload;

export const editIdentityInformation = http.put<
  never,
  EditIdentityInformationPayload
>(EDIT_IDENTITY, async ({ request }) => {
  const data = await request.json();

  await delay(1000);

  const identity = db.identity.update({
    where: { node_id: { equals: "1" } },
    data,
  });

  console.log("identity", identity);

  return HttpResponse.json({
    ...identity,
  });
});
