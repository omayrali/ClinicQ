import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthTabs } from "@/features/auth/components/AuthTabs";
import { useRegister } from "@/features/auth/viewmodels/useRegister";
import { View } from "react-native";

export function RegisterScreen() {
  const { values, setValue, errors, loading, submit } = useRegister();

  return (
    <Screen scroll>
      <View className="gap-lg pt-lg">
        <AuthTabs active="signup" />

        <View className="gap-md">
          <AuthField
            label="Full Name"
            icon="person-outline"
            placeholder="Enter Your Full Name"
            value={values.name}
            onChangeText={(text) => setValue("name", text)}
            error={errors.name}
            autoCapitalize="words"
          />
          <AuthField
            label="Email"
            icon="mail-outline"
            placeholder="Enter Your Email"
            value={values.email}
            onChangeText={(text) => setValue("email", text)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AuthField
            label="Phone"
            icon="call-outline"
            placeholder="Enter Your Phone"
            value={values.phone}
            onChangeText={(text) => setValue("phone", text)}
            error={errors.phone}
            keyboardType="phone-pad"
          />
          <AuthField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter Your Password"
            value={values.password}
            onChangeText={(text) => setValue("password", text)}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
          />
          <AuthField
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Confirm Your Password"
            value={values.confirmPassword}
            onChangeText={(text) => setValue("confirmPassword", text)}
            error={errors.confirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Button size="lg" className="h-12" disabled={loading} onPress={submit}>
          <Text className="font-inter-semibold text-lg">
            {loading ? "Creating account..." : "Sign up"}
          </Text>
        </Button>
      </View>
    </Screen>
  );
}
