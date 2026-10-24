import { Text } from "@/components/ui/text";
import type { Doctor } from "@/models/doctor.model";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

type DoctorCardProps = {
  doctor: Doctor;
  onPress: () => void;
};

export function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${doctor.name}, ${doctor.specialty}`}
      className="w-32 gap-sm rounded-sm bg-surface p-xs pb-sm shadow-sm shadow-black/10 active:opacity-80"
    >
      <View className="aspect-square w-full items-center justify-center rounded bg-accent">
        <Ionicons name="person" size={48} color={colors.primary} />
      </View>

      <View className="gap-xs">
        <Text numberOfLines={1} className="font-inter-medium text-sm">
          {doctor.name}
        </Text>

        <View className="flex-row items-center justify-between gap-xs">
          <Text numberOfLines={1} className="flex-1 text-sm text-muted">
            {doctor.specialty}
          </Text>

          {doctor.rating !== undefined ? (
            <View className="flex-row items-center gap-xs">
              <Ionicons name="star" size={10} color={colors.warning} />
              <Text className="font-inter-medium text-sm">{doctor.rating}</Text>
            </View>
          ) : null}
        </View>

        <Text className="font-inter-semibold text-sm text-primary">
          {doctor.consultationFee} EGP
        </Text>
      </View>
    </Pressable>
  );
}
