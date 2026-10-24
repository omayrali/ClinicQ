import { getDoctors } from "@/data/repositories/doctor.repo";
import { getNotifications } from "@/data/repositories/notification.repo";
import {
  getAppointmentViews,
  type AppointmentView,
} from "@/features/appointments/viewmodels/getAppointmentViews";
import { getHomeData } from "@/features/doctors/viewmodels/homeData";
import type { Doctor } from "@/models/doctor.model";
import type { Notification } from "@/models/notification.model";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useHome(userId: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<AppointmentView[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );

  const load = useCallback(async () => {
    try {
      const [doctorList, appointmentList, notificationList] =
        await Promise.all([
          getDoctors(),
          getAppointmentViews(userId),
          getNotifications(userId),
        ]);

      setDoctors(doctorList);
      setAppointments(appointmentList);
      setNotifications(notificationList);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [userId]);

  // Reload whenever the Home tab comes into view, so changes made on other
  // screens (a cancelled appointment, a read notification) show up here.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function reload() {
    setStatus("loading");
    load();
  }

  return {
    status,
    reload,
    ...getHomeData(doctors, appointments, notifications),
  };
}
