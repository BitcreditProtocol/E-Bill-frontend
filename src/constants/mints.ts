import { getBillsAll } from "@/services/bills";

export const WILDCAT_ONE = {
  node_id: '02f34e23724d06d8ed1bafa990886da40972c229e3f4e2881091fa31d16709b7a4',
  name: "Wildcat One",
  restart_timestamp: 1731920651384
};

export const MINT_LIST = [
  { ...WILDCAT_ONE, enabled: true },
  { name: "Fishermans Mint", node_id: "1", enabled: false  },
  { name: "Whalers Mint", node_id: "2", enabled: false  },
];


export type MintConfig = {
  __dev_mintViewEnabled?: boolean
};

const DEFAULT_MINT_CONFIG: MintConfig = {}

export const readMintConfig = () => {
  const raw = localStorage.getItem('bitcr-mint-config');
  return raw ? JSON.parse(raw) as MintConfig : DEFAULT_MINT_CONFIG;
};

export const writeMintConfig = (value: Partial<MintConfig>) => {
  const config = {...readMintConfig(), ...value };
  localStorage.setItem('bitcr-mint-config', JSON.stringify(config));
};

export const __dev_findInListAllIfMintViewIsEnabledOrThrow = (id: string, mintConfig: MintConfig, err: unknown) => {
  if (!mintConfig.__dev_mintViewEnabled) {
    throw err;
  } else {
    return getBillsAll().then((res) => {
      const filtered = res.bills.filter((it) => it.id === id);
      if (filtered.length === 1) {
        return filtered[0];
      }
      throw err;
    })
  }
};
