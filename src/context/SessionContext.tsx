import { getUserById } from "@/data/repositories/user.repo";
import type { User } from "@/models/user.model";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "clinicq.userId";

type SessionContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const id = await SecureStore.getItemAsync(STORAGE_KEY);
        if (id) setUser(await getUserById(id));
      } catch {
        await SecureStore.deleteItemAsync(STORAGE_KEY).catch(() => {});
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  function signIn(next: User) {
    setUser(next);
    SecureStore.setItemAsync(STORAGE_KEY, next.id).catch(() => {});
  }

  function signOut() {
    setUser(null);
    SecureStore.deleteItemAsync(STORAGE_KEY).catch(() => {});
  }

  const value: SessionContextValue = { user, isLoading, signIn, signOut };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return context;
}
