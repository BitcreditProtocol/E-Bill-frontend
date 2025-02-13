import { getBillsAll } from "@/services/bills";

const WILDCAT_ONE = {
  node_id: "02f34e23724d06d8ed1bafa990886da40972c229e3f4e2881091fa31d16709b7a4",
  name: "Wildcat One",
  restart_timestamp: 1731920651384,
};

const OTHER_MINTS: {name: string, node_id: string, enabled: boolean}[] = [
  //{ name: "Fishermans Mint", node_id: "1", enabled: false },
  //{ name: "Whalers Mint", node_id: "2", enabled: false },
];

export type MintConfig = {
  __dev_mintViewEnabled?: boolean;
  wildcatOne: typeof WILDCAT_ONE;
};

const DEFAULT_MINT_CONFIG: MintConfig = {
  wildcatOne: WILDCAT_ONE,
};


export const readMintList = () => {
  const config = readMintConfig();
  return [
    { ...config.wildcatOne, enabled: true },
    ...OTHER_MINTS
  ]
};

export const readMintConfig = () => {
  const raw = localStorage.getItem("bitcr-mint-config");
  return raw
    ? ({ ...DEFAULT_MINT_CONFIG, ...JSON.parse(raw) } as MintConfig)
    : DEFAULT_MINT_CONFIG;
};

export const writeMintConfig = (value: Partial<MintConfig>) => {
  const config = { ...readMintConfig(), ...value };
  localStorage.setItem("bitcr-mint-config", JSON.stringify(config));
};

export const resetMintConfig = () => {
  localStorage.setItem(
    "bitcr-mint-config",
    JSON.stringify(DEFAULT_MINT_CONFIG)
  );
};

export const __dev_findInListAllIfMintViewIsEnabledOrThrow = (
  id: string,
  mintConfig: MintConfig,
  err: unknown
) => {
  if (!mintConfig.__dev_mintViewEnabled) {
    throw err;
  } else {
     
    return getBillsAll().then((res) => {
       
      const filtered = res.bills.filter((it) => it.id === id);
       
      if (filtered.length === 1) {
         
        return filtered[0];
      }
      throw err;
    });
  }
};
