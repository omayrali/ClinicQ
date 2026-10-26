import { useSession } from "@/context/SessionContext";
import {
  cancelAppointment,
  getAppointmentById,
} from "@/data/repositories/appointment.repo";
import { createNotification } from "@/data/repositories/notification.repo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAppointmentView, type AppointmentView } from "./appointmentView";

export function useAppointmentDetails() {
  const router = useRouter();
  const { user } = useSession();
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

  function cancel() {
    Alert.alert(
      "Cancel appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: confirmCancel,
        },
      ],
    );
  }

  async function confirmCancel() {
    if (!appointment || !user) return;

    try {
      await cancelAppointment(appointment.id);
      await createNotification({
        userId: user.id,
        appointmentId: appointment.id,
        type: "cancellation",
        title: "Appointment cancelled",
        message: `Your appointment with ${appointment.doctorName} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.startTime} has been cancelled.`,
      });
      reload();
    } catch (e) {
      Alert.alert(
        "Could not cancel",
        e instanceof Error ? e.message : "Something went wrong",
      );
    }
  }

  function reschedule() {
    if (!appointment) return;

    router.push({
      pathname: "/doctors/[doctorId]/book",
      params: { doctorId: appointment.doctorId, appointmentId: appointment.id },
    });
  }

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
