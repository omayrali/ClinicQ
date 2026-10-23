import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { AppText } from "./AppText";
import type { IconName } from "./IconButton";

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  disabled?: boolean;
};

export function Chip({ label, selected = false, onPress, icon, disabled = false }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      className={`flex-row items-center gap-xs rounded-pill border px-md py-sm active:opacity-70
        ${selected ? "border-primary bg-primary" : "border-primary bg-surface"}
        ${disabled ? "opacity-40" : ""}`}
    >
      {icon ? <Ionicons name={icon} size={16} color={selected ? colors.surface : colors.primary} /> : null}
      <AppText variant="label" tone={selected ? "white" : "text"}>
        {label}
      </AppText>
    </Pressable>
  );
}
