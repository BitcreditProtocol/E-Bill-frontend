export const ContactTypes = {
  Person: 0,
  Company: 1,
  Mint: 2,
} as const;

export type ContactType =
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | typeof ContactTypes.Person
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | typeof ContactTypes.Company
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | typeof ContactTypes.Mint
  | number;

export type Contact = {
  type: ContactType;
  node_id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  avatar_file: string | null;
  date_of_birth_or_registration: string;
  country_of_birth_or_registration: string;
  city_of_birth_or_registration: string;
  identification_number: string;
};
