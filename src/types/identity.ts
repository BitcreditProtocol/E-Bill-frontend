export type Identity = {
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
  profile_picture_file: {
    name: string;
    hash: string;
  };
  identity_document_file: {
    name: string;
    hash: string;
  };
};
