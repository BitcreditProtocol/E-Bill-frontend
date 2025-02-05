import { API_URL } from "@/constants/api";

export const apiFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
