import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { DoctorPhoto } from "@/features/doctors/components/DoctorPhoto";
import { useDoctorProfile } from "@/features/doctors/viewmodels/useDoctorProfile";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View } from "react-native";

export function DoctorProfileScreen({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const { doctor, clinic, error } = useDoctorProfile(doctorId);

  const header = <Header title="Doctor Profile" />;

  if (!doctor || !clinic) {
    return (
      <Screen header={header}>
        {error ? (
          <ScreenState
            type="error"
            title="Something went wrong"
            message="Could not load this doctor"
          />
        ) : (
          <ScreenState type="loading" message="Loading..." />
        )}
      </Screen>
    );
  }

  const details = [
    {
      label: "Experience",
      icon: "ribbon-outline",
      value: `${doctor.yearsOfExperience} years`,
    },
    {
      label: "Rating",
      icon: "star-outline",
      value: doctor.rating ? `${doctor.rating} / 5` : "No ratings yet",
    },
    {
      label: "Consultation fee",
      icon: "cash-outline",
      value: `${doctor.consultationFee} EGP`,
    },
  ] as const;

  return (
    <Screen
      scroll
      header={header}
      footer={
        <Button
          size="lg"
          className="h-12"
          onPress={() => router.push(`/doctors/${doctor.id}/book`)}
        >
          <Text className="font-inter-semibold text-lg">Book Appointment</Text>
        </Button>
      }
    >
      <View className="gap-lg pt-md">
        <View className="rounded-md border border-border bg-surface p-sm">
          <DoctorPhoto
            doctor={doctor}
            className="aspect-square w-full rounded-sm"
            textClassName="text-xxl"
          />
        </View>

        <View className="gap-xs">
          <Text className="font-inter-semibold text-xxl">{doctor.name}</Text>
          <Text className="text-lg text-subtext">{doctor.specialty}</Text>

          <View className="flex-row items-center gap-xs pt-xs">
            <Ionicons name="location-outline" size={16} color={colors.muted} />
            <Text className="flex-1 text-md text-muted">
              {clinic.name}, {clinic.address}
            </Text>
          </View>
        </View>

        <View className="rounded-sm border border-border bg-surface px-md">
          {details.map((item, index) => (
            <View
              key={item.label}
              className={`flex-row items-center justify-between py-md ${
                index > 0 ? "border-t border-border" : ""
              }`}
            >
              <View className="flex-row items-center gap-sm">
                <Ionicons name={item.icon} size={18} color={colors.primary} />
                <Text className="text-md text-muted">{item.label}</Text>
              </View>
              <Text className="font-inter-medium text-md">{item.value}</Text>
            </View>
          ))}
        </View>

        <View className="gap-sm">
          <Text className="font-inter-semibold text-lg">About</Text>
          <Text className="text-md leading-6 text-subtext">{doctor.bio}</Text>
        </View>
      </View>
    </Screen>
  );
}
