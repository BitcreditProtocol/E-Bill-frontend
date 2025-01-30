export type IdentityType = "personal" | "company";

export type PersonalIdentity = {
  node_id: string;
  name: string;
  email: string;
  bitcoin_public_key: string;
  npub: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  date_of_birth: string;
  country_of_birth: string;
  city_of_birth: string;
  identification_number: string;
  profile_picture_file: string;
  identity_document_file: string;
};

export type Identity = {
  node_id: string;
  type: "personal" | "company";
  name: string;
  company: string;
  date_of_birth: string;
  city_of_birth: string;
  country_of_birth: string;
  email: string;
  postal_address: string;
  registration_number: string;
  proof_of_registration: string;
  bitcoin_public_key: string;
};
