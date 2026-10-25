import { Text } from "@/components/ui/text";
import type { AppointmentView } from "@/features/appointments/viewmodels/getAppointmentViews";
import { colors } from "@/theme/tokens";
import { formatDate, formatTime } from "@/utils/dateFormat";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

type NextAppointmentCardProps = {
  appointment?: AppointmentView;
  onPress: () => void;
};

export function NextAppointmentCard({
  appointment,
  onPress,
}: NextAppointmentCardProps) {
  if (!appointment) {
    return (
      <Pressable
        onPress={onPress}
        className="gap-xs rounded-sm border border-border bg-surface p-md"
      >
        <Text className="font-inter-medium text-md">
          No upcoming appointments
        </Text>
        <Text className="text-sm text-muted">
          Find a doctor and book your next visit
        </Text>
      </Pressable>
    );
  }

  const [day, month] = formatDate(appointment.date).split(" ");

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-md rounded-sm border border-border bg-surface p-md"
    >
      <View className="h-14 w-14 items-center justify-center rounded-sm bg-primary">
        <Text className="font-inter-bold text-xl text-white">{day}</Text>
        <Text className="text-sm text-white">{month}</Text>
      </View>

      <View className="flex-1 gap-xs">
        <Text className="font-inter-semibold text-lg">
          {appointment.doctorName}
        </Text>
        <Text className="text-md text-muted">
          {appointment.specialty} · {formatTime(appointment.startTime)}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}
