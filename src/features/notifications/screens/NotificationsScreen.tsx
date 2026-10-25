import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { NotificationItem } from "../components/NotificationItem";
import { useNotifications } from "../viewmodels/useNotifications";
import { FlatList, View } from "react-native";

export function NotificationsScreen() {
  const { notifications, isLoading, error, reload, markAsRead } =
    useNotifications();

  function renderContent() {
    if (isLoading) return <ScreenState type="loading" />;

    if (error) {
      return (
        <ScreenState
          type="error"
          title="Something went wrong"
          message={error}
          actionLabel="Try again"
          onAction={reload}
        />
      );
    }

    if (notifications.length === 0) {
      return (
        <ScreenState
          type="empty"
          icon="notifications-outline"
          title="No notifications yet"
          message="Updates about your appointments will show up here."
        />
      );
    }

    return (
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-sm py-md"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => markAsRead(item.id)}
          />
        )}
      />
    );
  }

  return (
    <Screen header={<Header title="Notifications" />}>
      <View className="flex-1">{renderContent()}</View>
    </Screen>
  );
}
