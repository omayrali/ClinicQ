import type { User } from "@/models/user.model";
import { createContext, useContext, useState, type ReactNode } from "react";

type SessionContextValue = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: SessionContextValue = {
    user,
    signIn: setUser,
    signOut: () => setUser(null),
  };

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
