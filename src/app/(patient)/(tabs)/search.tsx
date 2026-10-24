import { Text } from "@/components/ui/text";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function Search() {
  return (
    <Screen header={<Header title="Search" showBack={false} />} edges={["top"]}>
      <Text className="pt-md">Search screen</Text>
    </Screen>
  );
}
