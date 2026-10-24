import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { useSession } from "@/context/SessionContext";
import { NextAppointmentCard } from "@/features/appointments/components/NextAppointmentCard";
import { CategoryChip } from "@/features/doctors/components/CategoryChip";
import { DoctorCard } from "@/features/doctors/components/DoctorCard";
import { QuickActions } from "@/features/doctors/components/QuickActions";
import { SectionHeader } from "@/features/doctors/components/SectionHeader";
import { useHome } from "@/features/doctors/viewmodels/useHome";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

const categoryIcons: Record<string, IconName> = {
  Cardiology: "heart-outline",
  Dermatology: "water-outline",
  Pediatrics: "happy-outline",
  Orthopedics: "body-outline",
  Dentistry: "medical-outline",
  ENT: "ear-outline",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function HomeScreen() {
  const router = useRouter();
  const { user } = useSession();
  const { status, reload, categories, topDoctors, nextAppointment, unreadCount } =
    useHome(user?.id ?? "");

  const name = user?.name ?? "";

  function goToSearch(specialty?: string) {
    router.push({
      pathname: "/search",
      params: specialty ? { specialty } : {},
    });
  }

  if (status === "loading") {
    return (
      <Screen edges={["top"]}>
        <ScreenState type="loading" message="Loading doctors..." />
      </Screen>
    );
  }

  if (status === "error") {
    return (
      <Screen edges={["top"]}>
        <ScreenState
          type="error"
          title="Something went wrong"
          message="Could not load doctors"
          actionLabel="Try again"
          onAction={reload}
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
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            className="flex-row items-center gap-sm active:opacity-80"
          >
            <Avatar alt={name} className="size-10">
              <AvatarFallback className="bg-accent">
                <Text className="font-inter-semibold text-md text-primary">
                  {getInitials(name)}
                </Text>
              </AvatarFallback>
            </Avatar>

            <View className="gap-xs">
              <Text className="text-sm text-subtext">{getGreeting()} !</Text>
              <Text className="font-inter-medium text-lg">{name}</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/notifications")}
            accessibilityRole="button"
            accessibilityLabel={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            hitSlop={8}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text}
            />
            {unreadCount > 0 ? (
              <View className="absolute -right-1 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-danger px-xs">
                <Text className="font-inter-semibold text-[10px] text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <View className="flex-row items-center gap-md">
          <Pressable
            onPress={() => goToSearch()}
            accessibilityRole="search"
            accessibilityLabel="Search by doctor name or specialty"
            className="h-10 flex-1 flex-row items-center gap-sm rounded-pill border border-border bg-secondary px-sm"
          >
            <Ionicons name="search-outline" size={24} color={colors.muted} />
            <Text numberOfLines={1} className="flex-1 text-md text-subtext">
              Search by doctor name or specialty
            </Text>
          </Pressable>

          <Pressable
            onPress={() => goToSearch()}
            accessibilityRole="button"
            accessibilityLabel="Filter"
            className="h-10 w-10 items-center justify-center rounded-pill border border-border bg-secondary"
          >
            <Ionicons name="options-outline" size={22} color={colors.text} />
          </Pressable>
        </View>

        <NextAppointmentCard
          appointment={nextAppointment}
          onPress={() =>
            nextAppointment &&
            router.push({
              pathname: "/appointments/[appointmentId]",
              params: { appointmentId: nextAppointment.id },
            })
          }
          onFindDoctor={() => goToSearch()}
        />

        <QuickActions
          actions={[
            {
              label: "Appointments",
              icon: "calendar-outline",
              onPress: () => router.push("/appointments"),
            },
            {
              label: "Find a Doctor",
              icon: "search-outline",
              onPress: () => goToSearch(),
            },
            {
              label: "Notifications",
              icon: "notifications-outline",
              onPress: () => router.push("/notifications"),
            },
          ]}
        />

        <View className="gap-md">
          <SectionHeader title="Categories" onSeeAll={() => goToSearch()} />
          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
            >
              {categories.map((specialty) => (
                <CategoryChip
                  key={specialty}
                  label={specialty}
                  icon={categoryIcons[specialty] ?? "medkit-outline"}
                  onPress={() => goToSearch(specialty)}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="gap-md">
          <SectionHeader title="Top Doctors" onSeeAll={() => goToSearch()} />
          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 16,
                paddingBottom: 4,
              }}
            >
              {topDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onPress={() =>
                    router.push({
                      pathname: "/doctors/[doctorId]",
                      params: { doctorId: doctor.id },
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Screen>
  );
}
