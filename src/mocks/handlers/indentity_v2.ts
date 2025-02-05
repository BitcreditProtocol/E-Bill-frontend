import { http, delay, HttpResponse } from "msw";
import {
  EDIT_IDENTITY,
  GET_ACTIVE_IDENTITY,
  GET_IDENTITY_DETAILS,
  SWITCH_IDENTITY,
} from "@/constants/endpoints";
import type { EditIdentityPayload } from "@/services/identity_v2";
import { db } from "../db";

export const getActiveIdentity = http.get(GET_ACTIVE_IDENTITY, async () => {
  await delay(1000);

  const activeIdentity = db.active_identity.findFirst({
    where: {},
  });

  const node_id =
    activeIdentity?.type === "personal"
      ? db.identity.findFirst({
          where: { node_id: { equals: activeIdentity.node_id } },
        })?.node_id
      : db.company.findFirst({
          where: { id: { equals: activeIdentity?.node_id } },
        })?.id;

  return HttpResponse.json({
    node_id,
  });
});

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

  return HttpResponse.json({
    ...identity,
  });
});

export const switchIdentity = http.put(SWITCH_IDENTITY, async ({ request }) => {
  const { node_id } = (await request.json()) as { node_id: string };

  const type = db.company.findFirst({
    where: { id: { equals: node_id } },
  })
    ? "company"
    : "personal";

  db.active_identity.update({
    where: {},
    data: {
      node_id,
      type,
    },
  });

  await delay(1000);

  return HttpResponse.json({}, { status: 200 });
});
