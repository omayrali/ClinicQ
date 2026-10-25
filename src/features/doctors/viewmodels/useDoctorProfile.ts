import { getClinicById } from "@/data/repositories/clinic.repo";
import { getDoctorById } from "@/data/repositories/doctor.repo";
import type { Clinic } from "@/models/clinic.model";
import type { Doctor } from "@/models/doctor.model";
import { useEffect, useState } from "react";

export function useDoctorProfile(doctorId: string) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDoctor() {
      try {
        const doctorData = await getDoctorById(doctorId);
        setDoctor(doctorData);
        setClinic(await getClinicById(doctorData.clinicId));
      } catch {
        setError(true);
      }
    }

    loadDoctor();
  }, [doctorId]);

  return { doctor, clinic, error };
}
