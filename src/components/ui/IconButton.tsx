import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable } from "react-native";

export type IconName = ComponentProps<typeof Ionicons>["name"];

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  variant?: "outline" | "primary";
  size?: "sm" | "md";
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  variant = "outline",
  size = "md",
}: IconButtonProps) {
  const isPrimary = variant === "primary";
  const box = size === "md" ? "h-11 w-11" : "h-8 w-8";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className={`${box} items-center justify-center rounded-pill active:opacity-70 ${
        isPrimary ? "bg-primary" : "border border-border bg-surface"
      }`}
    >
      <Ionicons name={icon} size={size === "md" ? 20 : 16} color={isPrimary ? colors.surface : colors.text} />
    </Pressable>
  );
}
