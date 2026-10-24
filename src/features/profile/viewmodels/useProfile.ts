import { useSession } from "@/context/SessionContext";
import { useRouter } from "expo-router";

export function useProfile() {
  const router = useRouter();
  const { user, signOut } = useSession();

  function logout() {
    signOut();
    router.replace("/");
  }

  return { user, logout };
}
