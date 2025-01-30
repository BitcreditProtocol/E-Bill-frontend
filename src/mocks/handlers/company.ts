import { http, delay, HttpResponse } from "msw";
import {
  EDIT_COMPANY,
  GET_COMPANIES,
  GET_COMPANY_DETAILS,
  GET_COMPANY_SIGNERS,
  REMOVE_COMPANY_SIGNER,
} from "@/constants/endpoints";
import type {
  EditCompanyPayload,
  RemoveSignatoryPayload,
} from "@/services/company";
import { db } from "../db";

export const getCompaniesList = http.get(GET_COMPANIES, async () => {
  await delay(1000);

  const companies = db.company.getAll();

  return HttpResponse.json({
    companies,
  });
});

export const getCompanyDetails = http.get(
  `${GET_COMPANY_DETAILS}/:companyId`,
  async ({ params }) => {
    const { companyId } = params;

    await delay(1000);

    if (!companyId) {
      return HttpResponse.json(
        { error: "Company ID is required" },
        { status: 500 }
      );
    }

    const company = db.company.findFirst({
      where: { id: { equals: companyId as string } },
    });

    return HttpResponse.json({
      ...company,
    });
  }
);

type EditCompanyInformationPayload = EditCompanyPayload;

export const editCompanyInformation = http.put<
  never,
  EditCompanyInformationPayload
>(EDIT_COMPANY, async ({ request }) => {
  const data = await request.json();

  await delay(1000);

  if (!data.id) {
    return HttpResponse.json(
      { error: "Company ID is required" },
      { status: 500 }
    );
  }

  db.company.update({
    where: { id: { equals: data.id } },
    data: {
      ...data,
    },
  });

  return HttpResponse.json({}, { status: 200 });
});

export const getSignersList = http.get(
  `${GET_COMPANY_SIGNERS}/:companyId`,
  async ({ params }) => {
    const { companyId } = params;

    await delay(1000);

    if (!companyId) {
      return HttpResponse.json(
        { error: "Company ID is required" },
        { status: 500 }
      );
    }

    const signers = db.company.findFirst({
      where: { id: { equals: companyId as string } },
    })?.signatories;

    return HttpResponse.json({
      signatories: signers,
    });
  }
);

export const addSigner = () => {};

type RemoveSignerPayload = RemoveSignatoryPayload;

export const removeSigner = http.put<never, RemoveSignerPayload>(
  REMOVE_COMPANY_SIGNER,
  async ({ request }) => {
    const data = await request.json();

    await delay(1000);

    if (!data.id || !data.signatory_node_id) {
      return HttpResponse.json(
        { error: "Company ID and Signer ID are required" },
        { status: 500 }
      );
    }

    db.company.update({
      where: { id: { equals: data.id } },
      data: {
        signatories: (signers) =>
          signers.filter((signer) => signer.node_id !== data.signatory_node_id),
      },
    });

    return HttpResponse.json({}, { status: 200 });
  }
);
