import { appointments } from "@/data/mock/appointments.mock";
import type { Appointment } from "@/models/appointment.model";
import { findSlot, setSlotStatus } from "./slot.repo";

function findAppointment(id: string): Appointment {
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
}

function sortByTime(list: Appointment[]): Appointment[] {
  const key = (a: Appointment) => {
    const slot = findSlot(a.slotId);
    return slot.date + slot.startTime;
  };

  return list.sort((a, b) => key(a).localeCompare(key(b)));
}

function checkSlotAvailable(slotId: string): void {
  if (findSlot(slotId).status !== "available") {
    throw new Error("Slot is no longer available");
  }
}

export async function getAppointmentsByPatient(
  patientId: string,
): Promise<Appointment[]> {
  return sortByTime(
    appointments
      .filter((a) => a.patientId === patientId)
      .map((a) => ({ ...a })),
  );
}

export async function getAppointmentsByDoctor(
  doctorId: string,
  date?: string,
): Promise<Appointment[]> {
  return sortByTime(
    appointments
      .filter((a) => {
        const slot = findSlot(a.slotId);
        return slot.doctorId === doctorId && (!date || slot.date === date);
      })
      .map((a) => ({ ...a })),
  );
}

export async function getAppointmentById(id: string): Promise<Appointment> {
  return { ...findAppointment(id) };
}


export async function getAllAppointments(): Promise<Appointment[]> {
  return [...appointments].map((appointments) => ({ ...appointments }));
}


export async function bookAppointment(
  patientId: string,
  slotId: string,
): Promise<Appointment> {
  checkSlotAvailable(slotId);

  const appointment: Appointment = {
    id: `a${Date.now()}`,
    patientId,
    slotId,
    status: "upcoming",
    createdAt: new Date().toISOString(),
  };

  appointments.push(appointment);
  await setSlotStatus(slotId, "booked");

  return { ...appointment };
}

export async function cancelAppointment(id: string): Promise<void> {
  const appointment = findAppointment(id);

  if (appointment.status !== "upcoming") {
    throw new Error("Only upcoming appointments can be cancelled");
  }

  appointment.status = "cancelled";
  await setSlotStatus(appointment.slotId, "available");
}

export async function rescheduleAppointment(
  id: string,
  newSlotId: string,
): Promise<void> {
  const appointment = findAppointment(id);

  if (appointment.status !== "upcoming") {
    throw new Error("Only upcoming appointments can be rescheduled");
  }

  checkSlotAvailable(newSlotId);
  await setSlotStatus(appointment.slotId, "available");
  await setSlotStatus(newSlotId, "booked");
  appointment.slotId = newSlotId;
}

export async function completeAppointment(id: string): Promise<void> {
  const appointment = findAppointment(id);

  if (appointment.status !== "upcoming") {
    throw new Error("Only upcoming appointments can be completed");
  }

  appointment.status = "completed";
}
