import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { AuthField } from "@/features/auth/components/AuthField";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { useEditProfile } from "../viewmodels/useEditProfile";

export function EditProfileScreen() {
  const {
    user,
    currentPassword,
    setCurrentPassword,
    verified,
    verify,
    values,
    setValue,
    hasChanges,
    goBack,
    error,
    saving,
    save,
  } = useEditProfile();

  if (!user) return null;

  if (!verified) {
    return (
      <Screen header={<Header title="Edit Profile" />}>
        <View className="flex-1 justify-center gap-lg">
          <View className="items-center gap-sm">
            <Ionicons name="lock-closed" size={48} color={colors.primary} />
            <Text className="font-inter-semibold text-xl">
              Confirm it&apos;s you
            </Text>
            <Text className="text-center text-md text-subtext">
              Enter your password to edit your profile.
            </Text>
          </View>
          <AuthField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter Your Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            error={error}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            size="lg"
            className="h-12"
            disabled={!currentPassword}
            onPress={verify}
          >
            <Text className="font-inter-semibold text-lg">Continue</Text>
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      header={<Header title="Edit Profile" onBack={goBack} />}
      footer={
        <Button
          size="lg"
          className="h-12"
          disabled={!hasChanges || saving}
          onPress={save}
        >
          <Text className="font-inter-semibold text-lg">
            {saving ? "Saving..." : "Save changes"}
          </Text>
        </Button>
      }
    >
      <View className="gap-lg py-md">
        <View className="items-center gap-sm">
          <Avatar alt={user.name} className="size-20">
            <AvatarFallback className="bg-primary">
              <Text className="font-inter-bold text-xxl text-primary-foreground">
                {user.name[0].toUpperCase()}
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text className="font-inter-semibold text-xl">{user.name}</Text>
        </View>

        <Card>
          <CardHeader>
            <CardTitle>Personal details</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <AuthField
              label="Full Name"
              icon="person-outline"
              value={values.name}
              onChangeText={(text) => setValue("name", text)}
              autoCapitalize="words"
            />
            <AuthField
              label="Email"
              icon="mail-outline"
              value={values.email}
              onChangeText={(text) => setValue("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AuthField
              label="Phone"
              icon="call-outline"
              value={values.phone}
              onChangeText={(text) => setValue("phone", text)}
              keyboardType="phone-pad"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <AuthField
              label="New Password"
              icon="lock-closed-outline"
              placeholder="Leave empty to keep current"
              value={values.password}
              onChangeText={(text) => setValue("password", text)}
              secureTextEntry
              autoCapitalize="none"
            />
            <AuthField
              label="Confirm New Password"
              icon="lock-closed-outline"
              placeholder="Confirm New Password"
              value={values.confirmPassword}
              onChangeText={(text) => setValue("confirmPassword", text)}
              secureTextEntry
              autoCapitalize="none"
            />
          </CardContent>
        </Card>

        {error !== "" && <Text className="text-md text-danger">{error}</Text>}
      </View>
    </Screen>
  );
}
