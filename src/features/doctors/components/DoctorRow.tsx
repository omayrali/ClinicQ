import { Text } from "@/components/ui/text";
import { DoctorPhoto } from "@/features/doctors/components/DoctorPhoto";
import type { Doctor } from "@/models/doctor.model";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

type DoctorRowProps = {
  doctor: Doctor;
  onPress: () => void;
};

export function DoctorRow({ doctor, onPress }: DoctorRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-md rounded-sm border border-border bg-surface p-md active:opacity-70"
    >
      <DoctorPhoto doctor={doctor} className="h-16 w-16 rounded-sm" />

      <View className="flex-1 gap-xs">
        <Text numberOfLines={1} className="font-inter-semibold text-md">
          {doctor.name}
        </Text>
        <Text className="text-sm text-muted">{doctor.specialty}</Text>

        <View className="flex-row items-center gap-md">
          <View className="flex-row items-center gap-xs">
            <Ionicons name="star" size={12} color={colors.warning} />
            <Text className="text-sm">{doctor.rating ?? "New"}</Text>
          </View>
          <Text className="font-inter-medium text-sm text-primary">
            {doctor.consultationFee} EGP
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}
