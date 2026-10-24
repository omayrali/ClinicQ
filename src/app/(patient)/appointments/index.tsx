import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Appointments() {
  return (
    <Screen header={<Header title="My Appointments" />}>
      <Text className="pt-md">Appointments screen</Text>
    </Screen>
  );
}
