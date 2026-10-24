import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { View } from "react-native";

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 items-center justify-center gap-xl">
        <Text className="font-inter-bold text-xxl text-primaryDark">
          ClinicQ
        </Text>

        <View className="w-full gap-md">
          <Button className="h-12" onPress={() => router.push("/register")}>
            <Text className="font-inter-semibold text-lg">Sign up</Text>
          </Button>

          <Button
            variant="outline"
            className="h-12 border-primary"
            onPress={() => router.push("/login")}
          >
            <Text className="font-inter-medium text-lg text-primary">
              Sign in
            </Text>
          </Button>
        </View>
      </View>
    </Screen>
  );
}
