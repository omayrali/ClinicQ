export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patientId: string;
  slotId: string;
  status: AppointmentStatus;
  createdAt: string;
}