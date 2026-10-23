import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";

export default function AppointmentDetails() {
  const { appointmentId } = useLocalSearchParams<{ appointmentId: string }>();

  return (
    <Screen header={<Header title="Appointment" />}>
      <Text className="pt-md">Appointment screen: {appointmentId}</Text>
    </Screen>
  );
}
