import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { useProfile } from "@/features/profile/viewmodels/useProfile";
import { View } from "react-native";

export function ProfileScreen() {
  const { user, logout } = useProfile();

  return (
    <Screen
      header={<Header title="Profile" showBack={false} />}
      edges={["top"]}
    >
      <View className="gap-lg pt-md">
        <Text className="font-inter-semibold text-lg">{user?.name}</Text>

        <Button size="lg" variant="outline" className="h-12" onPress={logout}>
          <Text className="font-inter-semibold text-lg text-danger">
            Logout
          </Text>
        </Button>
      </View>
    </Screen>
  );
}
