import { useState, ReactNode } from "react";
import type { Identity } from "@/types/identity";
import { IdentityContext } from "./IdentityContext";

export default function IdentityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const personalIdentity: Identity = {
    node_id: "1",
    type: "personal",
    name: "John Doey",
    company: "Company",
    date_of_birth: "01/01/2000",
    city_of_birth: "City",
    country_of_birth: "Country",
    email: "ex@ample.com",
    postal_address: "example 1",
    registration_number: "842309431",
    proof_of_registration: "registration.pdf",
    bitcoin_public_key: "Bitcr1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  };

  const companyIdentitiesData: Identity[] = [
    {
      node_id: "2",
      type: "company",
      name: "Company A",
      company: "Company",
      date_of_birth: "01/01/2000",
      city_of_birth: "City",
      country_of_birth: "Country",
      email: "comp@any.com",
      postal_address: "example 2",
      registration_number: "909812111",
      proof_of_registration: "proof.pdf",
      bitcoin_public_key: "Bitcr1eP5QGefi2DMPTfTL5SLmv7Daa02b",
    },
    {
      node_id: "3",
      type: "company",
      name: "Company B",
      company: "Company",
      date_of_birth: "01/01/2000",
      city_of_birth: "City",
      country_of_birth: "Country",
      email: "any@comp.com",
      postal_address: "example 3",
      registration_number: "4437810921",
      proof_of_registration: "certificate.pdf",
      bitcoin_public_key: "Bitcr1eP5QGefi2DMPTfTL5SLmv7Dib341",
    },
  ];

  const [identity, setIdentity] = useState<Identity>(personalIdentity);
  const [companyIdentities, setCompanyIdentities] = useState<Identity[]>(
    companyIdentitiesData
  );

  const addCompanyIdentity = (newIdentity: Identity) => {
    setCompanyIdentities((prev) => [...prev, newIdentity]);
  };

  const selectIdentity = (node_id: string) => {
    const availableIdentities = [...companyIdentities, personalIdentity];

    const selectedIdentity = availableIdentities.find(
      (identity) => identity.node_id === node_id
    );

    if (selectedIdentity) {
      setIdentity(selectedIdentity);
    }
  };

  return (
    <IdentityContext.Provider
      value={{
        identity,
        setIdentity: selectIdentity,
        personalIdentity,
        companyIdentities,
        setCompanyIdentities,
        addCompanyIdentity,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
}
