import { getClinicById } from "@/data/repositories/clinic.repo";
import { getDoctorById } from "@/data/repositories/doctor.repo";
import type { Clinic } from "@/models/clinic.model";
import type { Doctor } from "@/models/doctor.model";
import { useCallback, useEffect, useState } from "react";

export function useDoctorProfile(doctorId: string) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );

  const load = useCallback(async () => {
    setStatus("loading");

    try {
      const loadedDoctor = await getDoctorById(doctorId);
      const loadedClinic = await getClinicById(loadedDoctor.clinicId);

      setDoctor(loadedDoctor);
      setClinic(loadedClinic);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [doctorId]);

  useEffect(() => {
    load();
  }, [load]);

  return { status, doctor, clinic, reload: load };
}
