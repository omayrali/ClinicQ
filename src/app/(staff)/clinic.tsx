import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Clinic() {
  return (
    <Screen header={<Header title="ClinicQ" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">ClinicQ screen</Text>
    </Screen>
  );
}
