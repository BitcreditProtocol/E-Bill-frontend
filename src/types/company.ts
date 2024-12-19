/* e.g.
{
    "id": "C5Pjn2jmz7W9xqty3qZ9V9SKBAxqoirRaibF1zqp2abX",
    "name": "Hayek Ltd.",
    "country_of_registration": "AT",
    "city_of_registration": "Vienna",
    "postal_address": "Smithstreet 34, 1030 Vienna",
    "email": "hayek_ltd@example.com",
    "registration_number": "1234 555 4321",
    "registration_date": "2011-08-22",
    "proof_of_registration_file": null,
    "logo_file": null,
    "signatories": [
        "16Uiu2HAm2dEM2YBqhvMyRCiFrRWbU35yDzfKNd9EwmW71vECKXk2"
    ],
    "public_key": "0249dff13e8c97e6a2633386b2322b17d0a3b319affff1b92ef31d0b18f56abf37"
}
*/
export type Company = {
  id: string;
  name: string;
  country_of_registration: string;
  city_of_registration: string;
  postal_address: string;
  email: string;
  registration_number: string;
  registration_date: string;
  proof_of_registration_file: string | null;
  logo_file: string | null;
  signatories: string[];
  public_key: string;
};
