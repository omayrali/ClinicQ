import { doctors } from "@/data/mock/doctors.mock";
import type { Doctor } from "@/models/doctor.model";

function findDoctor(id: string): Doctor {
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
}

export async function getDoctors(): Promise<Doctor[]> {
  return doctors.map((d) => ({ ...d }));
}

export async function getDoctorById(id: string): Promise<Doctor> {
  return { ...findDoctor(id) };
}

export async function getDoctorByClinicId(clinicId: string): Promise<Doctor> {
  const doctor = doctors.find((d) => d.clinicId === clinicId);

  if (!doctor) {
    throw new Error("No doctor found for this clinic");
  }

  return { ...doctor };
}

export async function updateDoctor(
  id: string,
  changes: Partial<Omit<Doctor, "id" | "clinicId">>,
): Promise<Doctor> {
  const doctor = findDoctor(id);
  Object.assign(doctor, changes);
  return { ...doctor };
}
