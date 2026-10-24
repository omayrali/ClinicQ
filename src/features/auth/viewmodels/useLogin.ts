import { useSession } from "@/context/SessionContext";
import { login } from "@/data/repositories/user.repo";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { useRouter } from "expo-router";
import { useState } from "react";
import { z } from "zod";

export function useLogin() {
  const router = useRouter();
  const { signIn } = useSession();

  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  function setEmail(value: string) {
    setEmailValue(value);
    setEmailError("");
  }

  function setPassword(value: string) {
    setPasswordValue(value);
    setPasswordError("");
  }

  async function submit() {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors;
      setEmailError(errors.email?.[0] ?? "");
      setPasswordError(errors.password?.[0] ?? "");
      return;
    }

    setLoading(true);

    try {
      const user = await login(result.data.email, result.data.password);
      signIn(user);
      router.replace("/");
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    loading,
    submit,
  };
}
