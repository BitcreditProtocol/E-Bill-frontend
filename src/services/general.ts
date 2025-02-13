import { EXIT } from "@/constants/endpoints";
import { apiFetch } from "@/utils/api";

export const exit = async () => {
  return apiFetch(EXIT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};
