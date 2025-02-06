import { useState, ReactNode, useEffect } from "react";
import { IdentityContext } from "./IdentityContext";
import {
  getActiveIdentity,
  getIdentityDetails,
  switchIdentity,
} from "@/services/identity_v2";
import { getCompanyDetails } from "@/services/company";

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
      const { type, node_id } = await getActiveIdentity();

      setActiveIdentityType(type === 0 ? "personal" : "company");
      setActiveNodeId(node_id);
    };

    void initialize();
  }, []);

  useEffect(() => {
    const fetchIdentityDetails = async () => {
      if (!activeNodeId || !activeIdentityType) return;

      const isCompany = activeIdentityType === "company";

      if (isCompany) {
        const company = await getCompanyDetails(activeNodeId);

        setIdentityDetails({
          name: company.name,
          address: company.address,
          // todo: fix logo file returned from the API
          // avatar: company.logo_file.name,
          avatar: "",
        });

        return;
      } else {
        const personalIdentity = await getIdentityDetails();

        setIdentityDetails({
          name: personalIdentity.name,
          address: personalIdentity.address,
          avatar: "",
        });

        return;
      }
    };

    void fetchIdentityDetails();
  }, [activeNodeId, activeIdentityType]);

  const switchActiveIdentity = async ({
    node_id,
    type,
  }: {
    node_id: string;
    type: "personal" | "company";
  }) => {
    setActiveNodeId(null);

    await switchIdentity(node_id);
    setActiveNodeId(node_id);
    setActiveIdentityType(type);

    return;
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
