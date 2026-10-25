import { useSession } from "@/context/SessionContext";
import { getAppointmentsByPatient } from "@/data/repositories/appointment.repo";
import type { AppointmentStatus } from "@/models/appointment.model";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getAppointmentView, type AppointmentView } from "./appointmentView";

async function getAppointmentViews(
  patientId: string,
): Promise<AppointmentView[]> {
  const appointments = await getAppointmentsByPatient(patientId);
  return Promise.all(appointments.map(getAppointmentView));
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
