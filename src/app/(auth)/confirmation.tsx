import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Confirmation() {
  return (
    <Screen header={<Header title="Confirmation" showBack={false} />}>
      <Text className="pt-md">Confirmation screen</Text>
    </Screen>
  );
}
