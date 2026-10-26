import { getClinicById } from "@/data/repositories/clinic.repo";
import { getDoctorById } from "@/data/repositories/doctor.repo";
import { getSlotById } from "@/data/repositories/slot.repo";
import type {
  Appointment,
  AppointmentStatus,
} from "@/models/appointment.model";

export interface AppointmentView {
  id: string;
  status: AppointmentStatus;
  createdAt: string;
  doctorId: string;
  doctorName: string;
  doctorPhotoKey?: number;
  specialty: string;
  consultationFee: number; 
  clinicName: string;
  clinicAddress: string;
  clinicPhone?: string;
  date: string;
  startTime: string;
  endTime: string;
}

export async function getAppointmentView(
  appointment: Appointment,
): Promise<AppointmentView> {
  const slot = await getSlotById(appointment.slotId);
  const doctor = await getDoctorById(slot.doctorId);
  const clinic = await getClinicById(doctor.clinicId);

  return {
    id: appointment.id,
    status: appointment.status,
    createdAt: appointment.createdAt,
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorPhotoKey: doctor.photoKey,
    specialty: doctor.specialty,
    consultationFee: doctor.consultationFee,
    clinicName: clinic.name,
    clinicAddress: clinic.address,
    clinicPhone: clinic.phone,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  };
}
