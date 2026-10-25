import { BookingScreen } from "@/features/booking/screens/BookingScreen";
import { useLocalSearchParams } from "expo-router";

export default function BookAppointment() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  return <BookingScreen doctorId={doctorId} />;
}
