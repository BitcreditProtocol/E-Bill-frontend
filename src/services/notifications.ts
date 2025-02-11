import {
  LIST_ACTIVE_NOTIFICATIONS,
  RESOLVE_NOTIFICATION,
} from "@/constants/endpoints";
import { apiFetch } from "@/utils/api";
import type { Notification } from "@/types/notification";

type GetNotificationsResponse = Notification[];

export async function getNotifications(): Promise<GetNotificationsResponse> {
  return apiFetch(LIST_ACTIVE_NOTIFICATIONS, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function resolveNotification(id: string) {
  return apiFetch(RESOLVE_NOTIFICATION.replace(":notification_id", id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
