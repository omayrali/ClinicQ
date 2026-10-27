import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { ProfileMenuItem } from "../components/ProfileMenuItem";
import { useProfile } from "../viewmodels/useProfile";

export function ProfileScreen() {
  const {
    user,
    openAppointments,
    openNotifications,
    openTerms,
    openEditProfile,
    logout,
  } = useProfile();

  if (!user) return null;

  return (
    <Screen
      header={<Header title="Profile" showBack={false} />}
      edges={["top"]}
    >
      <View className="gap-lg pt-md">
        <Card>
          <CardContent className="items-center gap-sm">
            <Avatar alt={user.name} className="size-20">
              <AvatarFallback className="bg-primary">
                <Text className="font-inter-bold text-xxl text-primary-foreground">
                  {user.name[0].toUpperCase()}
                </Text>
              </AvatarFallback>
            </Avatar>
            <Text className="font-inter-semibold text-xl">{user.name}</Text>
            <Text className="text-md text-subtext">{user.email}</Text>
            <Text className="text-md text-subtext">{user.phone}</Text>
          </CardContent>
        </Card>

        <View className="gap-sm">
          <ProfileMenuItem
            icon="create-outline"
            label="Edit Profile"
            onPress={openEditProfile}
          />
          <ProfileMenuItem
            icon="calendar-outline"
            label="My Appointments"
            onPress={openAppointments}
          />
          <ProfileMenuItem
            icon="notifications-outline"
            label="Notifications"
            onPress={openNotifications}
          />
          <ProfileMenuItem
            icon="document-text-outline"
            label="Terms and Conditions"
            onPress={openTerms}
          />
        </View>

        <Button size="lg" variant="outline" className="h-12" onPress={logout}>
          <Text className="font-inter-semibold text-lg text-danger">
            Logout
          </Text>
        </Button>
      </View>
    </Screen>
  );
}
