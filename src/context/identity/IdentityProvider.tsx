import { useState, ReactNode, useEffect } from "react";
import { IdentityContext } from "./IdentityContext";
import {
  getActiveIdentity,
  getIdentityDetails,
  switchIdentity,
} from "@/services/identity_v2";
import { getCompanies } from "@/services/company";

export default function IdentityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeIdentityType, setActiveIdentityType] = useState<
    "personal" | "company" | null
  >(null);
  const [identityDetails, setIdentityDetails] = useState<{
    name: string;
    address: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const { node_id } = await getActiveIdentity();

      setActiveNodeId(node_id);
      console.log(node_id);
    };

    void initialize();
  }, []);

  useEffect(() => {
    const fetchIdentityDetails = async () => {
      if (!activeNodeId) return;

      const companies = await getCompanies();

      const isCompany = companies.companies.some(
        (company) => company.id === activeNodeId
      );
      const company = companies.companies.find(
        (company) => company.id === activeNodeId
      );

      if (isCompany) {
        setActiveIdentityType("company");
        setIdentityDetails({
          name: company?.name ?? "",
          address: company?.address ?? "",
          // avatar: company?.logo_file.name ?? "",
          avatar: "",
        });

        return;
      }

      const personalIdentity = await getIdentityDetails();

      setActiveIdentityType("personal");
      setIdentityDetails({
        name: personalIdentity.name,
        address: personalIdentity.address,
        avatar: "",
      });
    };

    void fetchIdentityDetails();
  }, [activeNodeId]);

  const switchActiveIdentity = async (node_id: string) => {
    setActiveNodeId(null);
    await switchIdentity(node_id);
    setActiveNodeId(node_id);
  };

  return (
    <IdentityContext.Provider
      value={{
        activeIdentity: {
          type: activeIdentityType,
          node_id: activeNodeId,
          name: identityDetails?.name ?? "",
          avatar: identityDetails?.avatar ?? "",
          address: identityDetails?.address ?? "",
        },
        switchActiveIdentity,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
}
