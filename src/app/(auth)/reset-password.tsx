import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function ResetPassword() {
  return (
    <Screen header={<Header title="Reset Password" />}>
      <Text className="pt-md">Reset Password screen</Text>
    </Screen>
  );
}
