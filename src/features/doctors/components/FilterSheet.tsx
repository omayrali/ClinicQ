import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FilterSheetProps = {
  visible: boolean;
  onClose: () => void;
  priceLabels: string[];
  priceIndex: number;
  onPriceChange: (index: number) => void;
  ratingLabels: string[];
  ratingIndex: number;
  onRatingChange: (index: number) => void;
  onReset: () => void;
  resultCount: number;
};

type OptionsProps = {
  labels: string[];
  selected: number;
  onSelect: (index: number) => void;
};

function Options({ labels, selected, onSelect }: OptionsProps) {
  return (
    <View className="flex-row flex-wrap gap-sm">
      {labels.map((label, index) => (
        <Pressable
          key={label}
          onPress={() => onSelect(index)}
          className={`rounded-sm border px-md py-sm ${
            index === selected
              ? "border-primary bg-primary"
              : "border-border bg-surface"
          }`}
        >
          <Text className={`text-md ${index === selected ? "text-white" : ""}`}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function FilterSheet({
  visible,
  onClose,
  priceLabels,
  priceIndex,
  onPriceChange,
  ratingLabels,
  ratingIndex,
  onRatingChange,
  onReset,
  resultCount,
}: FilterSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <View
        className="gap-lg rounded-t-md bg-surface px-md pt-md"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-inter-semibold text-xl">Filters</Text>
          <Pressable onPress={onReset} hitSlop={8}>
            <Text className="text-md text-primary">Reset</Text>
          </Pressable>
        </View>

        <View className="gap-sm">
          <Text className="font-inter-medium text-md">Price</Text>
          <Options
            labels={priceLabels}
            selected={priceIndex}
            onSelect={onPriceChange}
          />
        </View>

        <View className="gap-sm">
          <Text className="font-inter-medium text-md">Rating</Text>
          <Options
            labels={ratingLabels}
            selected={ratingIndex}
            onSelect={onRatingChange}
          />
        </View>

        <Button size="lg" className="h-12" onPress={onClose}>
          <Text className="font-inter-semibold text-lg">
            Show {resultCount} {resultCount === 1 ? "doctor" : "doctors"}
          </Text>
        </Button>
      </View>
    </Modal>
  );
}
