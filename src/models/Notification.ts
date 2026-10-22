export type NotificationType =
  | "confirmation"
  | "reminder"
  | "cancellation"
  | "reschedule"
  | "general";

export interface Notification {
  id: string;
  userId: string;
  appointmentId?: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}