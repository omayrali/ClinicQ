import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import type { IconName } from "./IconButton";

type ScreenStateProps =
  | { type: "loading"; message?: string }
  | {
      type: "empty" | "error";
      title: string;
      message?: string;
      icon?: IconName;
      actionLabel?: string;
      onAction?: () => void;
    };

export function ScreenState(props: ScreenStateProps) {
  if (props.type === "loading") {
    return (
      <View className="flex-1 items-center justify-center gap-md p-lg">
        <ActivityIndicator size="large" color={colors.primary} />
        {props.message ? (
          <AppText variant="caption">{props.message}</AppText>
        ) : null}
      </View>
    );
  }

  const isError = props.type === "error";
  const icon =
    props.icon ?? (isError ? "alert-circle-outline" : "calendar-outline");

  return (
    <View className="flex-1 items-center justify-center gap-sm p-lg">
      <View
        className={`mb-sm h-24 w-24 items-center justify-center rounded-pill ${isError ? "bg-danger/10" : "bg-primary/10"}`}
      >
        <Ionicons
          name={icon}
          size={44}
          color={isError ? colors.danger : colors.primary}
        />
      </View>

      <AppText variant="heading" className="text-center">
        {props.title}
      </AppText>

      {props.message ? (
        <AppText variant="body" tone="subtext" className="text-center">
          {props.message}
        </AppText>
      ) : null}

      {props.actionLabel && props.onAction ? (
        <AppButton
          title={props.actionLabel}
          onPress={props.onAction}
          variant="outline"
          size="small"
          className="mt-md"
        />
      ) : null}
    </View>
  );
}
