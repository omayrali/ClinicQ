import { useSession } from "@/context/SessionContext";
import { getAppointmentsByPatient } from "@/data/repositories/appointment.repo";
import { getClinicById } from "@/data/repositories/clinic.repo";
import { getDoctorById } from "@/data/repositories/doctor.repo";
import { getSlotById } from "@/data/repositories/slot.repo";
import type { AppointmentStatus } from "@/models/appointment.model";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export interface AppointmentView {
  id: string;
  status: AppointmentStatus;
  doctorId: string;
  doctorName: string;
  doctorPhotoKey?: string;
  specialty: string;
  clinicName: string;
  clinicAddress: string;
  date: string;
  startTime: string;
  endTime: string;
}

async function getAppointmentViews(
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
        doctorPhotoKey: doctor.photoKey,
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

export function useAppointments() {
  const router = useRouter();
  const { user } = useSession();

  const [appointments, setAppointments] = useState<AppointmentView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  useEffect(() => {
    if (!user) return;

    getAppointmentViews(user.id)
      .then((data) => {
        setAppointments(data);
        setError("");
      })
      .catch(() => setError("Could not load appointments. Please try again."))
      .finally(() => setIsLoading(false));
  }, [user, reloadCount]);

  function reload() {
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  function openAppointment(id: string) {
    router.push(`/appointments/${id}`);
  }

  const statusOrder = { upcoming: 0, completed: 1, cancelled: 2 };
  const visibleAppointments = appointments
    .filter((a) => filter === "all" || a.status === filter)
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return {
    appointments: visibleAppointments,
    filter,
    setFilter,
    isLoading,
    error,
    reload,
    openAppointment,
  };
}
