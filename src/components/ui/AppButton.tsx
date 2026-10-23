import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, Pressable } from "react-native";
import { AppText } from "./AppText";
import type { IconName } from "./IconButton";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  size?: "large" | "small";
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "large",
  icon,
  loading = false,
  disabled = false,
  className = "",
}: AppButtonProps) {
  const isPrimary = variant === "primary";
  const inactive = disabled || loading;
  const contentColor = isPrimary ? colors.surface : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      className={`flex-row items-center justify-center gap-sm rounded-md px-lg active:opacity-80
        ${size === "large" ? "h-14" : "h-11"}
        ${isPrimary ? "bg-primary" : "border border-primary bg-surface"}
        ${inactive ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <>
          {icon ? (
            <Ionicons name={icon} size={20} color={contentColor} />
          ) : null}
          <AppText
            variant={size === "large" ? "heading" : "label"}
            tone={isPrimary ? "white" : "primary"}
          >
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
}
