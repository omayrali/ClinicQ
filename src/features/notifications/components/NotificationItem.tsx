import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { Notification } from "@/models/notification.model";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

const icons = {
  confirmation: "checkmark-circle-outline",
  reminder: "alarm-outline",
  cancellation: "close-circle-outline",
  reschedule: "swap-horizontal-outline",
  general: "information-circle-outline",
} as const;

type NotificationItemProps = {
  notification: Notification;
  onPress: () => void;
};

export function NotificationItem({
  notification,
  onPress,
}: NotificationItemProps) {
  const date = new Date(notification.createdAt).toLocaleDateString();

  return (
    <Pressable onPress={onPress}>
      <Card className={notification.isRead ? "" : "bg-accent"}>
        <CardHeader>
          <View className="flex-row items-center gap-sm">
            <Ionicons
              name={icons[notification.type]}
              size={20}
              color={colors.primary}
            />
            <CardTitle>{notification.title}</CardTitle>
          </View>
          <CardDescription>{notification.message}</CardDescription>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
      </Card>
    </Pressable>
  );
}
