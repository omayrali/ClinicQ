import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Register() {
  return (
    <Screen header={<Header title="Register" />}>
      <Text className="pt-md">Register screen</Text>
    </Screen>
  );
}
