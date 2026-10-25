import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { DetailRow } from "@/features/appointments/components/DetailRow";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

type BookingSuccessProps = {
  doctorName: string;
  date: string;
  time: string;
  clinic: string;
  onViewAppointment?: () => void;
  onAddToCalendar?: () => void;
};

export function BookingSuccess({
  doctorName,
  date,
  time,
  clinic,
  onViewAppointment,
  onAddToCalendar,
}: BookingSuccessProps) {
  return (
    <View className="flex-1 justify-center gap-lg py-lg">
      <View className="items-center gap-sm">
        <Ionicons name="checkmark-circle" size={64} color={colors.success} />
        <Text className="font-inter-semibold text-xl">Appointment booked</Text>
        <Text className="text-md text-subtext">with {doctorName}</Text>
      </View>

      <View className="gap-md rounded-sm border border-border bg-surface p-md">
        <DetailRow icon="calendar-outline" label="Date" value={date} />
        <DetailRow icon="time-outline" label="Time" value={time} />
        <DetailRow icon="location-outline" label="Clinic" value={clinic} />
      </View>

      <View className="gap-md">
        <Button size="lg" className="h-12" onPress={onViewAppointment}>
          <Text className="font-inter-semibold text-lg">View Appointment</Text>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12 border-primary"
          onPress={onAddToCalendar}
        >
          <Text className="font-inter-medium text-lg text-primary">
            Add to Google Calendar
          </Text>
        </Button>
      </View>
    </View>
  );
}
