import { defineMessages } from "react-intl";
import { ContactType, ContactTypes } from "@/types/contact";

export const messages = defineMessages({
  // contact data
  "contacts.nodeId": {
    id: "contacts.nodeId",
    defaultMessage: "Node ID",
  },
  "contacts.country": {
    id: "contacts.country",
    defaultMessage: "Country",
  },
  "contacts.city": {
    id: "contacts.city",
    defaultMessage: "City",
  },
  "contacts.zipCode": {
    id: "contacts.zipCode",
    defaultMessage: "Zip code",
  },
  "contacts.address": {
    id: "contacts.address",
    defaultMessage: "Street address",
  },
  // person
  "contacts.person.name": {
    id: "contacts.person.name",
    defaultMessage: "Legal full name",
  },
  "contacts.person.email": {
    id: "contacts.person.email",
    defaultMessage: "Email address",
  },
  "contacts.person.date": {
    id: "contacts.person.date",
    defaultMessage: "Date of birth",
  },
  "contacts.person.country": {
    id: "contacts.person.country",
    defaultMessage: "Country of birth",
  },
  "contacts.person.city": {
    id: "contacts.person.city",
    defaultMessage: "City of birth",
  },
  "contacts.person.identificationNumber": {
    id: "contacts.person.identificationNumber",
    defaultMessage: "Social security number",
  },
  "contacts.person.document": {
    id: "contacts.person.document",
    defaultMessage: "Identity document",
  },
  "contacts.person.uploadDocument": {
    id: "contacts.person.uploadDocument",
    defaultMessage: "Upload identity document",
  },
  // company
  "contacts.company.name": {
    id: "contacts.company.name",
    defaultMessage: "Legal company name",
  },
  "contacts.company.email": {
    id: "contacts.company.email",
    defaultMessage: "Company email",
  },
  "contacts.company.date": {
    id: "contacts.company.date",
    defaultMessage: "Date of registration",
  },
  "contacts.company.country": {
    id: "contacts.company.country",
    defaultMessage: "Country of registration",
  },
  "contacts.company.city": {
    id: "contacts.company.city",
    defaultMessage: "City of registration",
  },
  "contacts.company.identificationNumber": {
    id: "contacts.company.identificationNumber",
    defaultMessage: "Registration number",
  },
  "contacts.company.document": {
    id: "contacts.company.document",
    defaultMessage: "Registration document",
  },
  "contacts.company.uploadDocument": {
    id: "contacts.company.uploadDocument",
    defaultMessage: "Upload registration document",
  },
});

export const getMessage = (contactType: ContactType, key: string) => {
  const isPerson = contactType === ContactTypes.Person;
  const type = isPerson ? "person" : "company";

  return messages[`contacts.${type}.${key}` as keyof typeof messages];
};
