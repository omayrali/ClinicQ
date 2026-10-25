import { useSession } from "@/context/SessionContext";
import {
  getNotifications,
  markAsRead as markNotificationAsRead,
} from "@/data/repositories/notification.repo";
import type { Notification } from "@/models/notification.model";
import { useEffect, useState } from "react";

export function useNotifications() {
  const { user } = useSession();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    getNotifications(user.id)
      .then((data) => {
        setNotifications(data);
        setError("");
      })
      .catch(() => setError("Could not load notifications. Please try again."))
      .finally(() => setIsLoading(false));
  }, [user, reloadCount]);

  function reload() {
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  async function markAsRead(id: string) {
    try {
      await markNotificationAsRead(id);
      setNotifications((current) =>
        current.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch {}
  }

  return { notifications, isLoading, error, reload, markAsRead };
}
