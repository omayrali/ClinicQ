import { CardDescription, CardTitle } from "@/components/ui/Card";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { View } from "react-native";

type DetailRowProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
};

export function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <View className="flex-row items-center gap-md">
      <Ionicons name={icon} size={22} color={colors.primary} />
      <View className="flex-1 gap-xs">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="font-inter-medium">{value}</CardTitle>
      </View>
    </View>
  );
}
