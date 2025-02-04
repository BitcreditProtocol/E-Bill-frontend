import { createContext, useContext } from "react";

type IdentityContextType = {
  activeIdentity: {
    type: "personal" | "company" | null;
    node_id: string | null;
    name: string;
    avatar: string;
    address: string;
  };
  switchActiveIdentity: (node_id: string) => Promise<void>;
};

export const IdentityContext = createContext<IdentityContextType>(
  {} as IdentityContextType
);

export const useIdentity = () => useContext(IdentityContext);
