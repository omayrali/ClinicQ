import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { View } from "react-native";

type DoctorStatProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  value: string;
  label: string;
};

export function DoctorStat({ icon, value, label }: DoctorStatProps) {
  return (
    <View className="flex-row items-center gap-sm">
      <View className="h-8 w-8 items-center justify-center rounded-full bg-accent">
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View>
        <Text className="font-inter-medium text-md">{value}</Text>
        <Text className="text-sm text-muted">{label}</Text>
      </View>
    </View>
  );
}
