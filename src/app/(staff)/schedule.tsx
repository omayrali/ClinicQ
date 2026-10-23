import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Schedule() {
  return (
    <Screen header={<Header title="Schedule" showBack={false} />} edges={["top"]}>
      <AppText className="pt-md">Schedule screen</AppText>
    </Screen>
  );
}
