import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";
import { AppText } from "./AppText";
import type { IconName } from "./IconButton";

type InputProps = Omit<TextInputProps, "className"> & {
  label?: string;
  icon?: IconName;
  error?: string;
  className?: string;
};

export function Input({
  label,
  icon,
  error,
  secureTextEntry,
  className = "",
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);

  const border = error
    ? "border-danger"
    : focused
      ? "border-primary"
      : "border-border";

  return (
    <View className={`gap-xs ${className}`}>
      {label ? <AppText variant="label">{label}</AppText> : null}

      <View
        className={`h-12 flex-row items-center gap-sm rounded-sm border bg-surface px-md ${border}`}
      >
        {icon ? <Ionicons name={icon} size={20} color={colors.muted} /> : null}

        <TextInput
          className="flex-1 font-inter text-md text-text"
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && hidden}
          accessibilityLabel={label}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            hitSlop={8}
          >
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <AppText variant="caption" tone="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
