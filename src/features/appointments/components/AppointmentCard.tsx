import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import type { AppointmentView } from "../viewmodels/appointmentView";

const statusStyles = {
  upcoming: { dot: "bg-warning", text: "text-warning" },
  completed: { dot: "bg-success", text: "text-success" },
  cancelled: { dot: "bg-danger", text: "text-danger" },
};

type AppointmentCardProps = {
  appointmentView: AppointmentView;
  onPress: () => void;
};

export function AppointmentCard({
  appointmentView,
  onPress,
}: AppointmentCardProps) {
  const status = statusStyles[appointmentView.status];
  const date = new Date(appointmentView.date).toLocaleDateString();

  return (
    <Card className="gap-4 py-4">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle>
          {date}, {appointmentView.startTime} - {appointmentView.endTime}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-row gap-md">
        <Avatar alt={appointmentView.doctorName} className="size-16 rounded-md">
          <AvatarImage source={appointmentView.doctorPhotoKey} />
          <AvatarFallback className="rounded-md bg-accent">
            <Text className="font-inter-bold text-xl text-primary">
              {appointmentView.doctorName.replace("Dr. ", "")[0].toUpperCase()}
            </Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1 gap-sm">
          <View className="flex-row items-center gap-sm">
            <CardTitle className="flex-1">
              {appointmentView.doctorName}
            </CardTitle>

            <View className="flex-row items-center gap-xs">
              <View className={`h-2 w-2 rounded-pill ${status.dot}`} />

              <Text className={`text-sm capitalize ${status.text}`}>
                {appointmentView.status}
              </Text>
            </View>
          </View>

          <CardDescription>{appointmentView.specialty}</CardDescription>

          <View className="flex-row items-center gap-xs">
            <Ionicons name="location-outline" size={16} color={colors.muted} />

            <CardDescription>{appointmentView.clinicName}</CardDescription>
          </View>
        </View>
      </CardContent>

      {appointmentView.status === "upcoming" && (
        <CardFooter>
          <Button className="h-12 flex-1 rounded-pill" onPress={onPress}>
            <Text className="font-inter-semibold text-lg">
              Manage Appointment
            </Text>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
