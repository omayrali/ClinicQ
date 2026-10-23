import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Doctors() {
  return (
    <Screen header={<Header title="Doctors" showBack={false} />} edges={["top"]}>
      <AppText className="pt-md">Doctors screen</AppText>
    </Screen>
  );
}
