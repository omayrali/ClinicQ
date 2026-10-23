import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  edges?: Edge[];
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  header,
  footer,
  edges = ["top", "bottom"],
}: ScreenProps) {
  const padding = padded ? "px-md" : "";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={edges}>
      {header}

      {scroll ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className={`flex-1 pb-lg ${padding}`}>{children}</View>
        </ScrollView>
      ) : (
        <View className={`flex-1 ${padding}`}>{children}</View>
      )}

      {footer ? <View className="px-md pb-md pt-sm">{footer}</View> : null}
    </SafeAreaView>
  );
}
