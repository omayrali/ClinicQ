import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function DoctorProfileManage() {
  return (
    <Screen header={<Header title="Doctor Profile" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Doctor Profile screen</Text>
    </Screen>
  );
}
