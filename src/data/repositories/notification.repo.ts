import { notifications } from "@/data/mock/notifications.mock";
import type { Notification } from "@/models/notification.model";

export async function getNotifications(
  userId: string,
): Promise<Notification[]> {
  return notifications
    .filter((n) => n.userId === userId)
    .map((n) => ({ ...n }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function markAsRead(id: string): Promise<void> {
  const notification = notifications.find((n) => n.id === id);
  if (!notification) throw new Error("Notification not found");
  notification.isRead = true;
}

export async function createNotification(
  data: Omit<Notification, "id" | "isRead" | "createdAt">,
): Promise<Notification> {
  const notification: Notification = {
    ...data,
    id: `n${Date.now()}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(notification);
  return { ...notification };
}
