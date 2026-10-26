import { useSession } from "@/context/SessionContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export function useProfile() {
  const router = useRouter();
  const { user, signOut } = useSession();

  function openAppointments() {
    router.push("/appointments");
  }

  function openNotifications() {
    router.push("/notifications");
  }

  function logout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        style: "destructive",
        onPress: confirmLogout,
      },
    ]);
  }

  function confirmLogout() {
    signOut();
    router.replace("/");
  }

  return { user, openAppointments, openNotifications, logout };
}
