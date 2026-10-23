import { View } from "react-native";
import { AppText } from "./AppText";

type Tone = "warning" | "success" | "danger" | "primary" | "muted";

const dotClasses: Record<Tone, string> = {
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-danger",
  primary: "bg-primary",
  muted: "bg-muted",
};

type StatusBadgeProps = {
  label: string;
  tone: Tone;
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <View className="flex-row items-center gap-xs">
      <View className={`h-2 w-2 rounded-pill ${dotClasses[tone]}`} />
      <AppText variant="caption" tone={tone}>
        {label}
      </AppText>
    </View>
  );
}
