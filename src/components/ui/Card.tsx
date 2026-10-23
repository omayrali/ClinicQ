import type { ReactNode } from "react";
import { Pressable, View } from "react-native";

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  className?: string;
};

export function Card({
  children,
  onPress,
  accessibilityLabel,
  className = "",
}: CardProps) {
  const base = `rounded-md border border-border bg-surface p-md ${className}`;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className={`${base} active:opacity-80`}
      >
        {children}
      </Pressable>
    );
  }

  return <View className={base}>{children}</View>;
}
