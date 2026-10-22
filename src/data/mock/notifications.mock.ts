import type { Notification } from "@/models/notification.model";

export const notifications: Notification[] = [
  {
    id: "n1",
    userId: "p1",
    appointmentId: "a1",
    type: "confirmation",
    title: "Appointment confirmed",
    message:
      "Your appointment with Dr. Ahmed Hassan on 22 Nov at 09:00 is confirmed.",
    isRead: true,
    createdAt: "2026-10-20T10:15:00Z",
  },
  {
    id: "n2",
    userId: "p1",
    appointmentId: "a2",
    type: "reschedule",
    title: "Appointment rescheduled",
    message:
      "Your appointment with Dr. Mona Farouk was moved to 23 Nov at 10:30.",
    isRead: false,
    createdAt: "2026-10-21T08:40:00Z",
  },
  {
    id: "n3",
    userId: "p1",
    appointmentId: "a1",
    type: "reminder",
    title: "Upcoming appointment",
    message: "Reminder: Dr. Ahmed Hassan tomorrow at 09:00, Maadi.",
    isRead: false,
    createdAt: "2026-11-21T09:00:00Z",
  },
  {
    id: "n4",
    userId: "p1",
    type: "general",
    title: "Welcome to ClinicQ",
    message: "Browse doctors and book your first appointment.",
    isRead: true,
    createdAt: "2026-10-01T12:00:00Z",
  },
  {
    id: "n5",
    userId: "p2",
    appointmentId: "a5",
    type: "cancellation",
    title: "Appointment cancelled",
    message:
      "Your appointment with Dr. Mona Farouk on 19 Oct at 10:00 was cancelled.",
    isRead: false,
    createdAt: "2026-10-15T16:20:00Z",
  },
  {
    id: "n6",
    userId: "p2",
    appointmentId: "a3",
    type: "confirmation",
    title: "Appointment confirmed",
    message:
      "Your appointment with Dr. Ahmed Hassan on 24 Nov at 10:00 is confirmed.",
    isRead: false,
    createdAt: "2026-10-21T14:05:00Z",
  },
];
