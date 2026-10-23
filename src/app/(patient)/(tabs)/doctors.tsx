import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Doctors() {
  return (
    <Screen header={<Header title="Doctors" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Doctors screen</Text>
    </Screen>
  );
}
