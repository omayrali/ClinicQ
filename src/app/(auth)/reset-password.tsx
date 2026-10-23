import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function ResetPassword() {
  return (
    <Screen header={<Header title="Reset Password" />}>
      <AppText className="pt-md">Reset Password screen</AppText>
    </Screen>
  );
}
