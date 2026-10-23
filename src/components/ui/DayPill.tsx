import { Pressable, View } from "react-native";
import { AppText } from "./AppText";

type DayPillProps = {
  dayName: string;
  dayNumber: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function DayPill({
  dayName,
  dayNumber,
  selected = false,
  disabled = false,
  onPress,
}: DayPillProps) {
  const pill = disabled
    ? "border-border bg-border"
    : selected
      ? "border-primary bg-surface"
      : "border-border bg-surface";

  const circle = selected ? "bg-primary" : "bg-muted";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`${dayName} ${dayNumber}`}
      accessibilityState={{ selected, disabled }}
      className={`w-12 items-center gap-xs rounded-pill border py-sm active:opacity-70 ${pill}`}
    >
      <AppText
        variant="label"
        tone={disabled ? "muted" : selected ? "primary" : "text"}
      >
        {dayName}
      </AppText>
      <View
        className={`h-6 w-6 items-center justify-center rounded-pill ${circle}`}
      >
        <AppText variant="caption" tone="white">
          {dayNumber}
        </AppText>
      </View>
    </Pressable>
  );
}
