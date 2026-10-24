import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Home() {
  return (
    <Screen header={<Header title="Home" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Home screen</Text>
    </Screen>
  );
}
