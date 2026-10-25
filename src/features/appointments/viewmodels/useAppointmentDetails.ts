import { getAppointmentById } from "@/data/repositories/appointment.repo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getAppointmentView, type AppointmentView } from "./appointmentView";

export function useAppointmentDetails() {
  const router = useRouter();
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();

  const [appointment, setAppointment] = useState<AppointmentView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    getAppointmentById(appointmentId)
      .then(getAppointmentView)
      .then((data) => {
        setAppointment(data);
        setError("");
      })
      .catch(() => setError("Could not load appointment. Please try again."))
      .finally(() => setIsLoading(false));
  }, [appointmentId, reloadCount]);

  function reload() {
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  function openDoctorProfile() {
    if (appointment) router.push(`/doctors/${appointment.doctorId}`);
  }

  function cancel() {}

  function reschedule() {}

  function addToCalendar() {}

  return {
    appointment,
    isLoading,
    error,
    reload,
    openDoctorProfile,
    cancel,
    reschedule,
    addToCalendar,
  };
}
