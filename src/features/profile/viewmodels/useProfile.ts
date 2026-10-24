import { useSession } from "@/context/SessionContext";
import { useRouter } from "expo-router";

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
    signOut();
    router.replace("/");
  }

  return { user, openAppointments, openNotifications, logout };
}
