import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Confirmation() {
  return (
    <Screen header={<Header title="Confirmation" showBack={false} />}>
      <AppText className="pt-md">Confirmation screen</AppText>
    </Screen>
  );
}
