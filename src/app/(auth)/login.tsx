import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Login() {
  return (
    <Screen header={<Header title="Login" />}>
      <AppText className="pt-md">Login screen</AppText>
    </Screen>
  );
}
