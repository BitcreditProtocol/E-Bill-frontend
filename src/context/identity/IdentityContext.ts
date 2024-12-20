import { createContext, useContext } from "react";
import type { Identity } from "@/types/identity";

type IdentityContextType = {
  identity: Identity;
  setIdentity: (node_id: string) => void;
  personalIdentity: Identity;
  companyIdentities: Identity[];
  setCompanyIdentities: (identities: Identity[]) => void;
  addCompanyIdentity: (identity: Identity) => void;
};

export const IdentityContext = createContext<IdentityContextType>(
  {} as IdentityContextType
);

export const useIdentity = () => useContext(IdentityContext);
