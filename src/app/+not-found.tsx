import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { useRouter } from "expo-router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Screen>
      <ScreenState
        type="error"
        icon="compass-outline"
        title="Page not found"
        message="This page doesn't exist or you don't have access to it."
        actionLabel="Go to home"
        onAction={() => router.replace("/")}
      />
    </Screen>
  );
}
