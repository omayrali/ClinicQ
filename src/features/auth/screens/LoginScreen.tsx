import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthTabs } from "@/features/auth/components/AuthTabs";
import { useLogin } from "@/features/auth/viewmodels/useLogin";
import { View } from "react-native";

export function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    loading,
    submit,
  } = useLogin();

  return (
    <Screen scroll>
      <View className="gap-lg pt-lg">
        <AuthTabs active="signin" />

        <View className="gap-md">
          <AuthField
            label="Email"
            icon="mail-outline"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AuthField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Button size="lg" className="h-12" disabled={loading} onPress={submit}>
          <Text className="font-inter-semibold text-lg">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Button>
      </View>
    </Screen>
  );
}
