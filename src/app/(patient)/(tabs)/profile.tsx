import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Profile() {
  return (
    <Screen header={<Header title="Profile" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Profile screen</Text>
    </Screen>
  );
}
