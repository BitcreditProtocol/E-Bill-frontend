import { useState, ReactNode, useEffect } from "react";
import { IdentityContext } from "./IdentityContext";
import {
  getActiveIdentity,
  getIdentityDetails,
  switchIdentity,
} from "@/services/identity_v2";
import { API_URL } from "@/constants/api";
import { getCompanyDetails } from "@/services/company";

export default function IdentityProvider({
  children,
}: {
  children: ReactNode;
}) {
  // todo: change this logic. not looking good/maintainable
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeIdentityType, setActiveIdentityType] = useState<
    "personal" | "company" | null
  >(null);
  const [identityDetails, setIdentityDetails] = useState<{
    name: string;
    avatar: string;
    address: string;
    country: string | null;
    city: string | null;
    zip: string | null;
  } | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const { type, node_id } = await getActiveIdentity();

      setActiveIdentityType(type === 0 ? "personal" : "company");
      setActiveNodeId(node_id);

      try {
        await getIdentityDetails();
      } catch {
        setIsAuthenticated(false);

        return;
      }
    };

    void initialize();
  }, []);

  useEffect(() => {
    const fetchIdentityDetails = async () => {
      if (!activeNodeId || !activeIdentityType) return;

      const isCompany = activeIdentityType === "company";

      if (isCompany) {
        const company = await getCompanyDetails(activeNodeId);

        const companyAvatar =
          company.logo_file !== null
            ? `${API_URL}/company/file/${company.id}/${company.logo_file.name}`
            : "";

        setIdentityDetails({
          name: company.name,
          address: company.address,
          // todo: fix logo file returned from the API
          // avatar: company.logo_file.name,
          avatar: companyAvatar,
          city: company.city,
          country: company.country,
          zip: company.zip,
        });

        return;
      } else {
        const personalIdentity = await getIdentityDetails();

        const personalAvatar =
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          personalIdentity.profile_picture_file !== null
            ? `${API_URL}/identity/file/${personalIdentity.profile_picture_file.name}`
            : "";

        setIdentityDetails({
          name: personalIdentity.name,
          address: personalIdentity.address,
          avatar: personalAvatar,
          city: personalIdentity.city,
          country: personalIdentity.country,
          zip: personalIdentity.zip,
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
        isAuthenticated,
        activeIdentity: {
          type: activeIdentityType,
          node_id: activeNodeId ?? "",
          name: identityDetails?.name ?? "",
          avatar: identityDetails?.avatar ?? "",
          address: identityDetails?.address ?? null,
          country: identityDetails?.country ?? null,
          city: identityDetails?.city ?? null,
          zip: identityDetails?.zip ?? null,
        },
        switchActiveIdentity,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
}
