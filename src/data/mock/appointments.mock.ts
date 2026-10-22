import type { Appointment } from "@/models/appointment.model";

export const appointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    slotId: "d1_2026-11-22_09:00",
    status: "upcoming",
    createdAt: "2026-10-20T10:15:00Z",
  },
  {
    id: "a2",
    patientId: "p1",
    slotId: "d2_2026-11-23_10:30",
    status: "upcoming",
    createdAt: "2026-10-21T08:40:00Z",
  },
  {
    id: "a3",
    patientId: "p2",
    slotId: "d1_2026-11-24_10:00",
    status: "upcoming",
    createdAt: "2026-10-21T14:05:00Z",
  },
  {
    id: "a4",
    patientId: "p1",
    slotId: "d1_2026-10-18_09:00",
    status: "completed",
    createdAt: "2026-10-10T09:00:00Z",
  },
  {
    id: "a5",
    patientId: "p2",
    slotId: "d2_2026-10-19_10:00",
    status: "cancelled",
    createdAt: "2026-10-12T11:30:00Z",
  },
];
