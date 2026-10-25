import { DoctorProfileScreen } from "@/features/doctors/screens/DoctorProfileScreen";
import { useLocalSearchParams } from "expo-router";

export default function DoctorProfile() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();

  return <DoctorProfileScreen doctorId={doctorId} />;
}
