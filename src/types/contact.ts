


export const ContactTypes = {
  Person: 0,
  Company: 1,
  Mint: 2,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ContactType = typeof ContactTypes.Person | typeof ContactTypes.Company | typeof ContactTypes.Mint | number;

export type Contact = {
  type: ContactType;
  name: string;
  email: string;
  postal_address: string;
  public_key: string;
  date_of_birth_or_registration: string;
  country: string;
  city: string;
  identification_number: string;
};
