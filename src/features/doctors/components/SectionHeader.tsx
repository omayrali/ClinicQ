import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-inter-medium text-lg">{title}</Text>

      {onSeeAll ? (
        <Pressable onPress={onSeeAll} accessibilityRole="link" hitSlop={8}>
          <Text className="text-sm">See All</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
