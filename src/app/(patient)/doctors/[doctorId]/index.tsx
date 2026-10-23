import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";

export default function DoctorProfile() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  return (
    <Screen header={<Header title="Doctor Profile" />}>
      <Text className="pt-md">Doctor Profile screen: {doctorId}</Text>
    </Screen>
  );
}
