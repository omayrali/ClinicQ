import { Image, View, type ImageSourcePropType } from "react-native";
import { AppText } from "./AppText";

type AvatarProps = {
  name: string;
  source?: ImageSourcePropType;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
} as const;

function initials(name: string): string {
  const parts = name
    .replace(/^Dr\.?\s+/i, "")
    .trim()
    .split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name, source, size = "md" }: AvatarProps) {
  const box = `${sizeClasses[size]} overflow-hidden rounded-sm bg-primary/10`;

  if (source) {
    return <Image source={source} className={box} accessibilityLabel={name} />;
  }

  return (
    <View
      className={`${box} items-center justify-center`}
      accessibilityLabel={name}
    >
      <AppText variant={size === "sm" ? "label" : "heading"} tone="primary">
        {initials(name)}
      </AppText>
    </View>
  );
}
