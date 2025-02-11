
export default {
  devModeEnabled: import.meta.env.DEV,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  apiMocksEnabled: import.meta.env.VITE_API_MOCKING_ENABLED === "true",
  crowdinInContextToolingEnabled: import.meta.env.VITE_BITCR_DEV_INCLUDE_CROWDIN_IN_CONTEXT_TOOLING === "true"
};
