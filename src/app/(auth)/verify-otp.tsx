import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function VerifyOtp() {
  return (
    <Screen header={<Header title="Verify OTP" />}>
      <AppText className="pt-md">Verify OTP screen</AppText>
    </Screen>
  );
}
