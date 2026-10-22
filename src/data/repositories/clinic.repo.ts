import { clinics } from "@/data/mock/clinics.mock";
import { doctors } from "@/data/mock/doctors.mock";
import type { Clinic } from "@/models/clinic.model";

function findClinic(id: string): Clinic {
  const clinic = clinics.find((c) => c.id === id);

  if (!clinic) {
    throw new Error("Clinic not found");
  }

  return clinic;
}

export async function getClinics(): Promise<Clinic[]> {
  return clinics.map((clinic) => ({ ...clinic }));
}

export async function getClinicById(id: string): Promise<Clinic> {
  return { ...findClinic(id) };
}

export async function getClinicByDoctorId(doctorId: string): Promise<Clinic> {
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return { ...findClinic(doctor.clinicId) };
}
