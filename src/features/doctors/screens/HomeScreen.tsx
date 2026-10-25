import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { NextAppointmentCard } from "@/features/appointments/components/NextAppointmentCard";
import { DoctorCard } from "@/features/doctors/components/DoctorCard";
import { useHome } from "@/features/doctors/viewmodels/useHome";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

const quickActions = [
  { label: "Appointments", icon: "calendar-outline", path: "/appointments" },
  { label: "Find a Doctor", icon: "search-outline", path: "/search" },
  { label: "Notifications", icon: "notifications-outline", path: "/notifications" },
] as const;

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomeScreen() {
  const router = useRouter();
  const {
    userName,
    loading,
    error,
    categories,
    topDoctors,
    nextAppointment,
    unreadCount,
  } = useHome();

  if (loading) {
    return (
      <Screen edges={["top"]}>
        <ScreenState type="loading" message="Loading..." />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen edges={["top"]}>
        <ScreenState
          type="error"
          title="Something went wrong"
          message="Could not load the home screen"
        />
      </Screen>
    );
  }

  return (
    <Screen scroll edges={["top"]}>
      <View className="gap-lg pt-md">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.navigate("/profile")}
            className="flex-row items-center gap-md"
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-primaryDark">
              <Text className="font-inter-semibold text-lg text-white">
                {userName.charAt(0)}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-muted">{getGreeting()}</Text>
              <Text className="font-inter-semibold text-xl">{userName}</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/notifications")}>
            <Ionicons
              name="notifications-outline"
              size={26}
              color={colors.text}
            />
            {unreadCount > 0 && (
              <View className="absolute -right-1 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-danger px-xs">
                <Text className="text-[10px] text-white">{unreadCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/search")}
          className="h-11 flex-row items-center gap-sm rounded-sm border border-border bg-surface px-md"
        >
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <Text className="text-md text-muted">
            Search doctors or specialties
          </Text>
        </Pressable>

        <View className="gap-sm">
          <View className="flex-row items-center justify-between">
            <Text className="font-inter-semibold text-lg">
              Next appointment
            </Text>
            <Pressable onPress={() => router.push("/appointments")}>
              <Text className="text-md text-primary">All appointments</Text>
            </Pressable>
          </View>

          <NextAppointmentCard
            appointment={nextAppointment}
            onPress={() =>
              nextAppointment
                ? router.push(`/appointments/${nextAppointment.id}`)
                : router.push("/search")
            }
          />
        </View>

        <View className="flex-row gap-md">
          {quickActions.map((action) => (
            <Pressable
              key={action.label}
              onPress={() => router.push(action.path)}
              className="flex-1 items-center gap-sm rounded-sm border border-border bg-surface py-md active:opacity-70"
            >
              <Ionicons name={action.icon} size={22} color={colors.primary} />
              <Text className="text-sm">{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-sm">
          <Text className="font-inter-semibold text-lg">Specialties</Text>

          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
            >
              {categories.map((specialty) => (
                <Pressable
                  key={specialty}
                  onPress={() => router.push(`/search?specialty=${specialty}`)}
                  className="rounded-sm border border-border bg-surface px-md py-sm"
                >
                  <Text className="text-md">{specialty}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="gap-sm">
          <View className="flex-row items-center justify-between">
            <Text className="font-inter-semibold text-lg">Top doctors</Text>
            <Pressable onPress={() => router.push("/search")}>
              <Text className="text-md text-primary">See all</Text>
            </Pressable>
          </View>

          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
            >
              {topDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onPress={() => router.push(`/doctors/${doctor.id}`)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Screen>
  );
}
