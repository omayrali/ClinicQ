import { useSession } from "@/context/SessionContext";
import { getDoctors } from "@/data/repositories/doctor.repo";
import { getNotifications } from "@/data/repositories/notification.repo";
import { getAppointmentsByPatient } from "@/data/repositories/appointment.repo";
import {
  getAppointmentView,
  type AppointmentView,
} from "@/features/appointments/viewmodels/appointmentView";
import type { Doctor } from "@/models/doctor.model";
import type { Notification } from "@/models/notification.model";
import { useEffect, useState } from "react";

export function useHome() {
  const { user } = useSession();
  const userId = user?.id ?? "";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<AppointmentView[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setDoctors(await getDoctors());
        const patientAppointments = await getAppointmentsByPatient(userId);
        setAppointments(await Promise.all(patientAppointments.map(getAppointmentView)));
        setNotifications(await getNotifications(userId));
      } catch {
        setError(true);
      }
      setLoading(false);
    }

    loadData();
  }, [userId]);

  const categories = doctors
    .map((doctor) => doctor.specialty)
    .filter((specialty, index, all) => all.indexOf(specialty) === index);

  const topDoctors = [...doctors]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 5);

  const nextAppointment = appointments.find((a) => a.status === "upcoming");
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    userName: user?.name ?? "",
    loading,
    error,
    categories,
    topDoctors,
    nextAppointment,
    unreadCount,
  };
}
