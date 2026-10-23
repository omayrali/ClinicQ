import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Profile() {
  return (
    <Screen header={<Header title="Profile" showBack={false} />} edges={["top"]}>
      <AppText className="pt-md">Profile screen</AppText>
    </Screen>
  );
}
