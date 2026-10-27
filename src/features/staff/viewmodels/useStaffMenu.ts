import { useSession } from "@/context/SessionContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export function useStaffMenu() {
  const router = useRouter();
  const { signOut } = useSession();
  const [open, setOpen] = useState(false);

  function logout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", style: "destructive", onPress: confirmLogout },
    ]);
  }

  function confirmLogout() {
    setOpen(false);
    signOut();
    router.replace("/");
  }

  return { open, setOpen, logout };
}