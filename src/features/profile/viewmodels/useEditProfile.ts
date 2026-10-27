import { useSession } from "@/context/SessionContext";
import { createNotification } from "@/data/repositories/notification.repo";
import { login, updateUser } from "@/data/repositories/user.repo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { z } from "zod";

type Field = "name" | "email" | "phone" | "password" | "confirmPassword";

export function useEditProfile() {
  const router = useRouter();
  const { user, signIn } = useSession();

  const [currentPassword, setCurrentPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [values, setValues] = useState<Record<Field, string>>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const hasChanges =
    values.name.trim().toLowerCase() !== user?.name?.trim().toLowerCase() ||
    values.email.trim().toLowerCase() !== user?.email?.trim().toLowerCase() ||
    values.phone.replace(/\s/g, "") !== user?.phone?.replace(/\s/g, "") ||
    values.password !== "";

  function setValue(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function goBack() {
    if (!hasChanges) {
      router.back();
      return;
    }

    Alert.alert("Discard changes?", "Your changes will not be saved.", [
      { text: "Keep editing", style: "cancel" },
      { text: "Discard", style: "destructive", onPress: () => router.back() },
    ]);
  }

  async function verify() {
    if (!user) return;

    try {
      await login(user.email, currentPassword);
      setVerified(true);
      setError("");
    } catch {
      setError("Incorrect password");
    }
  }

  async function save() {
    if (!user) return;

    if (!values.name.trim()) {
      setError("Full name is required");
      return;
    }
    if (!z.email().safeParse(values.email.trim()).success) {
      setError("Enter a valid email");
      return;
    }
    if (!/^01[0125]\d{8}$/.test(values.phone.trim())) {
      setError("Enter a valid phone number");
      return;
    }
    if (values.password && values.password.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateUser(user.id, {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        ...(values.password ? { password: values.password } : {}),
      });
      signIn(updated);
      await createNotification({
        userId: user.id,
        type: "general",
        title: "Profile updated",
        message: values.password
          ? "Your password has been changed"
          : "Your profile details have changed.",
      });
      Alert.alert("Profile updated", "Your changes have been saved.");
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSaving(false);
    }
  }

  return {
    user,
    currentPassword,
    setCurrentPassword,
    verified,
    verify,
    values,
    setValue,
    hasChanges,
    goBack,
    error,
    saving,
    save,
  };
}
