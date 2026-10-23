import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { ActivityIndicator, View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

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
          <Text className="text-sm text-subtext">{props.message}</Text>
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

      <Text className="text-center font-inter-semibold text-lg">
        {props.title}
      </Text>

      {props.message ? (
        <Text className="text-center text-md text-subtext">{props.message}</Text>
      ) : null}

      {props.actionLabel && props.onAction ? (
        <Button
          variant="outline"
          size="sm"
          className="mt-md"
          onPress={props.onAction}
        >
          <Text>{props.actionLabel}</Text>
        </Button>
      ) : null}
    </View>
  );
}
