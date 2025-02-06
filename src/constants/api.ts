const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const isMockingEnabled = import.meta.env.VITE_API_MOCKING_ENABLED === "true";

export const API_URL = isMockingEnabled ? "http://localhost" : API_BASE_URL;
