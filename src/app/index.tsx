import { useSession } from "@/context/SessionContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useSession();

  if (!user) return <Redirect href="/welcome" />;

  return (
    <Redirect href={user.role === "staff" ? "/appointments" : "/doctors"} />
  );
}
