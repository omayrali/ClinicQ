import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

type CategoryChipProps = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
};

export function CategoryChip({ label, icon, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-xs rounded-pill bg-primary py-xs pl-xs pr-sm active:opacity-80"
    >
      <View className="h-8 w-8 items-center justify-center rounded-full bg-background">
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <Text className="text-md text-white">{label}</Text>
    </Pressable>
  );
}
