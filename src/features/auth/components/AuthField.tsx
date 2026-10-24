import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, type ComponentProps } from "react";
import { Pressable, View } from "react-native";

type AuthFieldProps = Omit<ComponentProps<typeof Input>, "className"> & {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  error?: string;
};

export function AuthField({
  label,
  icon,
  error,
  secureTextEntry,
  ...rest
}: AuthFieldProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <View className="gap-sm">
      <Label className="text-md">{label}</Label>

      <View>
        <View
          className="absolute left-md top-0 z-10 h-12 justify-center"
          pointerEvents="none"
        >
          <Ionicons name={icon} size={20} color={colors.muted} />
        </View>

        <Input
          className={`h-12 rounded-sm pl-11 font-inter text-md ${
            secureTextEntry ? "pr-11" : ""
          } ${error ? "border-danger" : ""}`}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && hidden}
          accessibilityLabel={label}
          {...rest}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            hitSlop={8}
            className="absolute right-md top-0 z-10 h-12 justify-center"
          >
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
