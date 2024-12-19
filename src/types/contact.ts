


export const ContactTypes = {
  Person: 0,
  Company: 1,
  Mint: 2,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ContactType = typeof ContactTypes.Person | typeof ContactTypes.Company | typeof ContactTypes.Mint | number;

/*
{
    "type": 0,
    "node_id": "12D3KooWBN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKYGuR77cy3",
    "name": "John Smith",
    "email": "johnny_smith@example.com",
    "country": "AT",
    "city": "Vienna",
    "zip": "1020",
    "address": "Smithstreet 15, Top 22",
    "public_key": "12D3KooWBN48JhNXAKhKxbUVM1YXRrHTfPYxjWiGpcKYGuR77cy3",
    "date_of_birth_or_registration": "1998-10-17",
    "country_of_birth_or_registration": "AT",
    "city_of_birth_or_registration": "Vienna",
    "identification_number": "12315412312",
    "avatar": "face_123252423432423.png",
    "proof_document": "passport1423523423.pdf"
}
*/
export type Contact = {
  type: ContactType;
  // TODO: `node_id` is mandatory
  //node_id: string;
  node_id?: string;
  name: string;
  email: string;
  country: string;
  city: string;
  // TODO: remove `postal_address` in favor of `zip`, `address`
  //zip: string;
  //address: string;
  postal_address: string;
  public_key: string;
  date_of_birth_or_registration: string;
  city_of_birth_or_registration?: string;
  identification_number: string;
  avatar?: string;
  proof_document?: string;
};
