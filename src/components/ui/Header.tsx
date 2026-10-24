import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { View } from "react-native";

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
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            accessibilityLabel="Go back"
            hitSlop={8}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Button>
        ) : null}
      </View>

      <Text
        className="flex-1 text-center font-inter-semibold text-xl"
        numberOfLines={1}
        accessibilityRole="header"
      >
        {title}
      </Text>

      <View className="w-11 items-end">{right}</View>
    </View>
  );
}
