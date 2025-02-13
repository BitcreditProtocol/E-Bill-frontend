import { createContext, useContext } from "react";

type IdentityContextType = {
  isAuthenticated: boolean;
  activeIdentity: {
    type: "personal" | "company" | null;
    node_id: string;
    name: string;
    avatar: string;
    address: string | null;
    country: string | null;
    city: string | null;
    zip: string | null;
  };
  switchActiveIdentity: ({
    node_id,
    type,
  }: {
    node_id: string;
    type: "personal" | "company";
  }) => Promise<void>;
};

export const IdentityContext = createContext<IdentityContextType>(
  {} as IdentityContextType
);

export const useIdentity = () => useContext(IdentityContext);
