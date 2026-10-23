import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Welcome() {
  return (
    <Screen header={<Header title="Welcome" showBack={false} />}>
      <AppText className="pt-md">Splash Screen</AppText>
    </Screen>
  );
}
