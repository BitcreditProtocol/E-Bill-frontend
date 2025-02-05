
export default {
  devModeEnabled: import.meta.env.DEV,
  apiMocksEnabled: import.meta.env.VITE_BITCR_API_MOCK_ENABLE === "true",
};
