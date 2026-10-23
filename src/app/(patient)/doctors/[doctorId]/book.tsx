import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";

export default function BookAppointment() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  return (
    <Screen header={<Header title="Book Appointment" />}>
      <Text className="pt-md">Book Appointment screen: {doctorId}</Text>
    </Screen>
  );
}
