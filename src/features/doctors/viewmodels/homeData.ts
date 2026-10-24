import type { AppointmentView } from "@/features/appointments/viewmodels/getAppointmentViews";
import type { Doctor } from "@/models/doctor.model";
import type { Notification } from "@/models/notification.model";

const TOP_DOCTORS_COUNT = 5;

export function getHomeData(
  doctors: Doctor[],
  appointments: AppointmentView[],
  notifications: Notification[],
) {
  const categories = [...new Set(doctors.map((d) => d.specialty))];

  const topDoctors = [...doctors]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, TOP_DOCTORS_COUNT);

  // Appointments come sorted by time, so the first upcoming one is the next.
  const nextAppointment =
    appointments.find((a) => a.status === "upcoming") ?? null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { categories, topDoctors, nextAppointment, unreadCount };
}
