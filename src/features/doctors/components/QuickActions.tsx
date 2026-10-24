import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

type QuickAction = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <View className="flex-row gap-md">
      {actions.map((action) => (
        <Pressable
          key={action.label}
          onPress={action.onPress}
          accessibilityRole="button"
          className="flex-1 items-center gap-xs rounded-sm bg-surface py-sm shadow-sm shadow-black/10 active:opacity-80"
        >
          <View className="h-10 w-10 items-center justify-center rounded-full bg-accent">
            <Ionicons name={action.icon} size={20} color={colors.primary} />
          </View>
          <Text numberOfLines={1} className="font-inter-medium text-sm">
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
