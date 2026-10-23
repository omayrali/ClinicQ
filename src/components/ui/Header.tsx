import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { View } from "react-native";
import { AppText } from "./AppText";
import { IconButton } from "./IconButton";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
};

export function Header({ title, showBack, right }: HeaderProps) {
  const router = useRouter();
  const canGoBack = showBack ?? router.canGoBack();

  return (
    <View className="flex-row items-center justify-between border-b border-border bg-surface px-md py-sm">
      <View className="w-11">
        {canGoBack ? (
          <IconButton
            icon="chevron-back"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
          />
        ) : null}
      </View>

      <AppText
        variant="title"
        className="flex-1 text-center"
        numberOfLines={1}
        accessibilityRole="header"
      >
        {title}
      </AppText>

      <View className="w-11 items-end">{right}</View>
    </View>
  );
}
