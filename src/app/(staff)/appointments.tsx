import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function StaffAppointments() {
  return (
    <Screen header={<Header title="Appointments" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Appointments screen</Text>
    </Screen>
  );
}
