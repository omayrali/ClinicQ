import { Stack } from "expo-router";

export const unstable_settings = { anchor: "(tabs)" };

export default function PatientLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
