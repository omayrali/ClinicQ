import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function NewPassword() {
  return (
    <Screen header={<Header title="New Password" />}>
      <AppText className="pt-md">New Password screen</AppText>
    </Screen>
  );
}
