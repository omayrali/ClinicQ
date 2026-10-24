import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Welcome() {
  return (
    <Screen header={<Header title="Welcome" showBack={false} />}>
      <Text className="pt-md">Splash Screen</Text>
    </Screen>
  );
}
