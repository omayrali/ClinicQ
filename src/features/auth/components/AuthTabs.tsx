import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

type AuthTabsProps = {
  active: "signin" | "signup";
};

const tabs = [
  { key: "signin", label: "Sign in", href: "/login" },
  { key: "signup", label: "Sign up", href: "/register" },
] as const;

export function AuthTabs({ active }: AuthTabsProps) {
  const router = useRouter();

  return (
    <View className="flex-row">
      {tabs.map((tab) => {
        const selected = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            onPress={() => {
              if (!selected) router.replace(tab.href);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={`flex-1 items-center border-b-2 pb-sm ${
              selected ? "border-text" : "border-transparent"
            }`}
          >
            <Text
              className={`font-inter-medium text-xl ${
                selected ? "text-text" : "text-subtext"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
