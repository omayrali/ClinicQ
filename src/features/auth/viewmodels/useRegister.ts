import { useSession } from "@/context/SessionContext";
import { register } from "@/data/repositories/user.repo";
import { registerSchema } from "@/features/auth/schemas/registerSchema";
import { useRouter } from "expo-router";
import { useState } from "react";
import { z } from "zod";

type Field = "name" | "email" | "phone" | "password" | "confirmPassword";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export function useRegister() {
  const router = useRouter();
  const { signIn } = useSession();

  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function setValue(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit() {
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    setLoading(true);

    try {
      const { name, email, phone, password } = result.data;
      const user = await register(name, email, phone, password);
      signIn(user);
      router.replace("/");
    } catch (error) {
      setErrors({
        email: error instanceof Error ? error.message : "Something went wrong",
      });
      setLoading(false);
    }
  }

  return { values, setValue, errors, loading, submit };
}
