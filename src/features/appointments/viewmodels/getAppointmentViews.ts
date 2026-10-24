import { getAppointmentsByPatient } from "@/data/repositories/appointment.repo";
import { getClinicById } from "@/data/repositories/clinic.repo";
import { getDoctorById } from "@/data/repositories/doctor.repo";
import { getSlotById } from "@/data/repositories/slot.repo";
import type { AppointmentStatus } from "@/models/appointment.model";

export interface AppointmentView {
  id: string;
  status: AppointmentStatus;
  doctorId: string;
  doctorName: string;
  specialty: string;
  clinicName: string;
  clinicAddress: string;
  date: string;
  startTime: string;
  endTime: string;
}

export async function getAppointmentViews(
  patientId: string,
): Promise<AppointmentView[]> {
  const appointments = await getAppointmentsByPatient(patientId);

  return Promise.all(
    appointments.map(async (appointment) => {
      const slot = await getSlotById(appointment.slotId);
      const doctor = await getDoctorById(slot.doctorId);
      const clinic = await getClinicById(doctor.clinicId);

      return {
        id: appointment.id,
        status: appointment.status,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        clinicName: clinic.name,
        clinicAddress: clinic.address,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    }),
  );
}
