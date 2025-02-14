export type Company = {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  registration_date: string;
  country_of_registration: string;
  city_of_registration: string;
  registration_number: string;
  proof_of_registration_file: {
    name: string;
    hash: string;
  } | null;
  logo_file: {
    name: string;
    hash: string;
  } | null;
  signatories: Signer[];
};

export type Signer = {
  node_id: string;
  name: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  avatar_file: {
    name: string;
    hash: string;
  } | null;
};
