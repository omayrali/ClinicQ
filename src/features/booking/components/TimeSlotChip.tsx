import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

type TimeSlotChipProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function TimeSlotChip({
  label,
  selected = false,
  disabled = false,
  onPress,
}: TimeSlotChipProps) {
  const box = disabled
    ? "border-border bg-border"
    : selected
      ? "border-primary bg-primary"
      : "border-border bg-surface";

  const text = disabled ? "text-muted" : selected ? "text-white" : "text-text";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`h-10 min-w-24 items-center justify-center rounded-sm border px-md active:opacity-70 ${box}`}
    >
      <Text className={`text-md ${text}`}>{label}</Text>
    </Pressable>
  );
}
