import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";

export default function BookAppointment() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  return (
    <Screen header={<Header title="Book Appointment" />}>
      <AppText className="pt-md">Book Appointment screen: {doctorId}</AppText>
    </Screen>
  );
}
