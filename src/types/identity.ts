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
