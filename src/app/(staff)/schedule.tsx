import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Schedule() {
  return (
    <Screen header={<Header title="Schedule" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Schedule screen</Text>
    </Screen>
  );
}
