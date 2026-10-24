import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { AppointmentView } from "@/features/appointments/viewmodels/getAppointmentViews";
import { colors } from "@/theme/tokens";
import { formatDate, formatTime } from "@/utils/dateFormat";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

type NextAppointmentCardProps = {
  appointment: AppointmentView | null;
  onPress: () => void;
  onFindDoctor: () => void;
};

export function NextAppointmentCard({
  appointment,
  onPress,
  onFindDoctor,
}: NextAppointmentCardProps) {
  if (!appointment) {
    return (
      <View className="gap-md rounded-sm bg-surface p-md shadow-sm shadow-black/10">
        <View className="gap-xs">
          <Text className="font-inter-medium text-lg">
            No upcoming appointments
          </Text>
          <Text className="text-md text-subtext">
            Find a doctor and book your next visit.
          </Text>
        </View>

        <Button
          variant="outline"
          size="sm"
          className="self-start border-primary"
          onPress={onFindDoctor}
        >
          <Text className="font-inter-medium text-md text-primary">
            Find a Doctor
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Next appointment with ${appointment.doctorName}`}
      className="gap-md rounded-sm bg-primary p-md active:opacity-90"
    >
      <Text className="text-sm text-white/80">Next Appointment</Text>

      <View className="flex-row items-center gap-sm">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Ionicons name="person" size={20} color={colors.surface} />
        </View>
        <View className="flex-1 gap-xs">
          <Text numberOfLines={1} className="font-inter-semibold text-lg text-white">
            {appointment.doctorName}
          </Text>
          <Text numberOfLines={1} className="text-md text-white/80">
            {appointment.specialty}
          </Text>
        </View>
      </View>

      <View className="gap-xs">
        <View className="flex-row items-center gap-sm">
          <Ionicons name="calendar-outline" size={16} color={colors.surface} />
          <Text className="font-inter-medium text-md text-white">
            {formatDate(appointment.date)} · {formatTime(appointment.startTime)}
          </Text>
        </View>
        <View className="flex-row items-center gap-sm">
          <Ionicons name="location-outline" size={16} color={colors.surface} />
          <Text numberOfLines={1} className="flex-1 text-md text-white">
            {appointment.clinicName}, {appointment.clinicAddress}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
