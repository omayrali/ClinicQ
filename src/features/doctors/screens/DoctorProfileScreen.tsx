import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { DoctorStat } from "@/features/doctors/components/DoctorStat";
import { useDoctorProfile } from "@/features/doctors/viewmodels/useDoctorProfile";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function DoctorProfileScreen({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const { status, doctor, clinic, reload } = useDoctorProfile(doctorId);

  const header = (
    <Header
      title="Doctor Profile"
      right={
        <Pressable
          onPress={() => router.push("/notifications")}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.text}
          />
        </Pressable>
      }
    />
  );

  if (status === "loading") {
    return (
      <Screen header={header}>
        <ScreenState type="loading" message="Loading doctor..." />
      </Screen>
    );
  }

  if (status === "error" || !doctor || !clinic) {
    return (
      <Screen header={header}>
        <ScreenState
          type="error"
          title="Something went wrong"
          message="Could not load this doctor"
          actionLabel="Try again"
          onAction={reload}
        />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      header={header}
      footer={
        <Button
          size="lg"
          className="h-12"
          onPress={() =>
            router.push({
              pathname: "/doctors/[doctorId]/book",
              params: { doctorId: doctor.id },
            })
          }
        >
          <Text className="font-inter-semibold text-lg">Book Appointment</Text>
        </Button>
      }
    >
      <View className="gap-lg pt-md">
        <View className="overflow-hidden rounded-sm bg-surface shadow-sm shadow-black/10">
          <View className="h-48 items-center justify-center bg-accent">
            <Ionicons name="person" size={96} color={colors.primary} />
          </View>

          <View className="gap-md p-md">
            <View className="gap-xs">
              <View className="flex-row items-center justify-between gap-sm">
                <Text className="flex-1 font-inter-semibold text-lg">
                  {doctor.name}
                </Text>
                <View className="rounded-pill bg-accent px-sm py-xs">
                  <Text className="font-inter-medium text-sm text-primaryDark">
                    {doctor.specialty}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-xs">
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={colors.muted}
                />
                <Text className="flex-1 text-md text-muted">
                  {clinic.name}, {clinic.address}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <DoctorStat
                icon="ribbon-outline"
                value={`${doctor.yearsOfExperience}Y`}
                label="Experience"
              />
              <DoctorStat
                icon="star-outline"
                value={doctor.rating !== undefined ? `${doctor.rating}` : "New"}
                label="Rate"
              />
              <DoctorStat
                icon="cash-outline"
                value={`${doctor.consultationFee}`}
                label="EGP / visit"
              />
            </View>
          </View>
        </View>

        <View className="gap-sm">
          <Text className="font-inter-medium text-lg">About</Text>
          <Text className="text-md text-subtext">{doctor.bio}</Text>
        </View>
      </View>
    </Screen>
  );
}
