import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Notifications() {
  return (
    <Screen header={<Header title="Notifications" />}>
      <AppText className="pt-md">Notifications screen</AppText>
    </Screen>
  );
}
