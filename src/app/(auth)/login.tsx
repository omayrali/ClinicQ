import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Login() {
  return (
    <Screen header={<Header title="Login" />}>
      <Text className="pt-md">Login screen</Text>
    </Screen>
  );
}
