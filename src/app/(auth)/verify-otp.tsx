import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function VerifyOtp() {
  return (
    <Screen header={<Header title="Verify OTP" />}>
      <Text className="pt-md">Verify OTP screen</Text>
    </Screen>
  );
}
