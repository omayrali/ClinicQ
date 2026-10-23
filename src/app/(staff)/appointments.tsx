import { AppText } from "@/components/ui/AppText";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function StaffAppointments() {
  return (
    <Screen header={<Header title="Appointments" showBack={false} />} edges={["top"]}>
      <AppText className="pt-md">Appointments screen</AppText>
    </Screen>
  );
}
