import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

type ProfileMenuItemProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
};

export function ProfileMenuItem({
  icon,
  label,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <Button
      variant="secondary"
      className="h-14 justify-start"
      onPress={onPress}
    >
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text className="flex-1 text-md">{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Button>
  );
}
