import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStaffMenu } from "../viewmodels/useStaffMenu";

export function StaffMenu() {
  const { open, setOpen, logout } = useStaffMenu();

  return (
    <SafeAreaView edges={["top"]} className="absolute right-md top-0 pt-sm">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        accessibilityLabel="Open menu"
        onPress={() => setOpen(true)}
      >
        <Ionicons name="menu" size={20} color={colors.text} />
      </Button>

      <Modal visible={open} transparent animationType="fade">
        <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)}>
          <SafeAreaView className="ml-auto h-full w-64 gap-md bg-surface p-md">
            <Text className="font-inter-semibold text-xl">Menu</Text>
            <Button variant="outline" className="h-12" onPress={logout}>
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text className="font-inter-semibold text-lg text-danger">
                Logout
              </Text>
            </Button>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}