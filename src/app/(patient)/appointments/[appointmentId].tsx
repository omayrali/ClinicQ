import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";

export default function AppointmentDetails() {
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();

  return (
    <Screen header={<Header title="Appointment" />}>
      <AppText className="pt-md">Appointment screen: {appointmentId}</AppText>
    </Screen>
  );
}
