import { Text } from "@/components/ui/text";
import { DoctorPhoto } from "@/features/doctors/components/DoctorPhoto";
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
      className="w-40 gap-md rounded-sm border border-border bg-surface p-md"
    >
      <DoctorPhoto
        doctor={doctor}
        className="aspect-square w-full rounded-sm"
        textClassName="text-xxl"
      />

      <View className="gap-xs">
        <Text numberOfLines={1} className="font-inter-semibold text-md">
          {doctor.name}
        </Text>
        <Text className="text-sm text-muted">{doctor.specialty}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-xs">
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text className="text-sm">{doctor.rating ?? "New"}</Text>
        </View>
        <Text className="font-inter-medium text-sm text-primary">
          {doctor.consultationFee} EGP
        </Text>
      </View>
    </Pressable>
  );
}
