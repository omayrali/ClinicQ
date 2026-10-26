import { BookingScreen } from "@/features/booking/screens/BookingScreen";
import { useLocalSearchParams } from "expo-router";

export default function BookAppointment() {
  const { doctorId, appointmentId } = useLocalSearchParams<{
    doctorId: string;
    appointmentId?: string;
  }>();

  return <BookingScreen doctorId={doctorId} appointmentId={appointmentId} />;
}
