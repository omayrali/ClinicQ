import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function DoctorProfileManage() {
  return (
    <Screen header={<Header title="Doctor Profile" showBack={false} />} edges={["top"]}>
      <AppText className="pt-md">Doctor Profile screen</AppText>
    </Screen>
  );
}
