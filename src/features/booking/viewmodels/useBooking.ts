import { useSession } from "@/context/SessionContext";
import {
  bookAppointment,
  getAppointmentById,
  rescheduleAppointment,
} from "@/data/repositories/appointment.repo";
import { createNotification } from "@/data/repositories/notification.repo";
import { getSlotsByDoctor } from "@/data/repositories/slot.repo";
import { useDoctorProfile } from "@/features/doctors/viewmodels/useDoctorProfile";
import type { Appointment } from "@/models/appointment.model";
import type { Slot } from "@/models/slot.model";
import { formatDate, formatTime, todayString } from "@/utils/dateFormat";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAvailableDates, groupSlotsByPartOfDay } from "./bookingData";

export function useBooking(doctorId: string, appointmentId?: string) {
  const { user } = useSession();
  const { doctor, clinic, error } = useDoctorProfile(doctorId);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);

  const [chosenDate, setChosenDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [booked, setBooked] = useState<{
    appointment: Appointment;
    slot: Slot;
  } | null>(null);

  useEffect(() => {
    async function loadSlots() {
      setSlots(await getSlotsByDoctor(doctorId));
      setSlotsLoading(false);
    }

    loadSlots();
  }, [doctorId, reloadCount]);

  const dates = getAvailableDates(slots, todayString());
  const selectedDate = dates.includes(chosenDate) ? chosenDate : dates[0];
  const slotsOfDay = slots.filter((slot) => slot.date === selectedDate);
  const slotGroups = groupSlotsByPartOfDay(slotsOfDay);
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);

  function selectDate(date: string) {
    setChosenDate(date);
    setSelectedSlotId("");
    setBookingError("");
  }

  function selectSlot(slotId: string) {
    setSelectedSlotId(slotId);
    setBookingError("");
  }

  function confirm() {
    Alert.alert(
      "Confirm appointment",
      "Are you sure you want to confirm this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: confirmBooking,
        },
      ],
    );
  }

  async function confirmBooking() {
    if (!user || !doctor || !selectedSlot) return;

    setSubmitting(true);
    setBookingError("");

    try {
      if (appointmentId) {
        await rescheduleAppointment(appointmentId, selectedSlot.id);
        await createNotification({
          userId: user.id,
          appointmentId,
          type: "reschedule",
          title: "Appointment rescheduled",
          message:
            "Your appointment with " +
            doctor.name +
            " has been moved to " +
            formatDate(selectedSlot.date) +
            " at " +
            formatTime(selectedSlot.startTime) +
            ".",
        });
        const appointment = await getAppointmentById(appointmentId);
        setBooked({ appointment, slot: selectedSlot });
        setSubmitting(false);
        return;
      }

      const appointment = await bookAppointment(user.id, selectedSlot.id);

      await createNotification({
        userId: user.id,
        appointmentId: appointment.id,
        type: "confirmation",
        title: "Appointment confirmed",
        message:
          "Your appointment with " +
          doctor.name +
          " on " +
          formatDate(selectedSlot.date) +
          " at " +
          formatTime(selectedSlot.startTime) +
          " is confirmed.",
      });

      setBooked({ appointment, slot: selectedSlot });
    } catch (e) {
      setBookingError(e instanceof Error ? e.message : "Something went wrong");
      setSelectedSlotId("");
      setReloadCount(reloadCount + 1);
    }

    setSubmitting(false);
  }

  return {
    doctor,
    clinic,
    error,
    loading: slotsLoading,
    dates,
    selectedDate,
    selectDate,
    slotGroups,
    selectedSlot,
    selectSlot,
    confirm,
    submitting,
    bookingError,
    booked,
  };
}
