import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Register() {
  return (
    <Screen header={<Header title="Register" />}>
      <AppText className="pt-md">Register screen</AppText>
    </Screen>
  );
}
