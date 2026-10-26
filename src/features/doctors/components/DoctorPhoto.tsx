import { Text } from "@/components/ui/text";
import type { Doctor } from "@/models/doctor.model";
import { Image } from "expo-image";
import { View } from "react-native";

type DoctorPhotoProps = {
  doctor: Doctor;
  className?: string;
  textClassName?: string;
};

export function DoctorPhoto({
  doctor,
  className = "",
  textClassName = "text-lg",
}: DoctorPhotoProps) {
  return (
    <View
      className={`items-center justify-center overflow-hidden bg-secondary ${className}`}
    >
      {doctor.photoKey ? (
        <Image
          source={doctor.photoKey}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition="top"
        />
      ) : (
        <Text
          className={`font-inter-semibold text-primaryDark ${textClassName}`}
        >
          {doctor.name.replace("Dr. ", "").charAt(0)}
        </Text>
      )}
    </View>
  );
}
