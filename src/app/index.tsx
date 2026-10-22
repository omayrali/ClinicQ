import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-2xl font-inter">NativeWind Test</Text>
      <Text className="text-2xl font-inter-medium">NativeWind Test</Text>
      <Text className="text-2xl font-inter-semibold">NativeWind Test</Text>
      <Text className="text-2xl font-inter-bold">NativeWind Test</Text>

      <View className="bg-surface p-md rounded-md border border-border">
        <Text className="text-xl font-inter-bold text-text">Dr. Ahmed</Text>
        <Text className="text-md font-inter text-subtext">Cardiology</Text>
      </View>
    </View>
  );
}
