import { users } from "@/data/mock/users.mock";
import type { User } from "@/models/user.model";

function findUser(id: string): User {
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

function findUserByEmail(email: string): User | undefined {
  return users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
}

export async function login(email: string, password: string): Promise<User> {
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new Error("Incorrect email or password");
  }

  return { ...user };
}

export async function register(
  name: string,
  email: string,
  phone: string,
  password: string,
): Promise<User> {
  if (findUserByEmail(email)) {
    throw new Error("An account with this email already exists");
  }

  const user: User = {
    id: `p${Date.now()}`,
    name,
    email: email.trim(),
    password,
    phone,
    role: "patient",
  };

  users.push(user);
  return { ...user };
}

const MOCK_OTP = "123456";
const pendingResets = new Map<string, { code: string; verified: boolean }>();

const key = (email: string) => email.trim().toLowerCase();

export async function requestPasswordReset(email: string): Promise<void> {
  if (!findUserByEmail(email)) {
    throw new Error("No account found with this email");
  }

  pendingResets.set(key(email), { code: MOCK_OTP, verified: false });
}

export async function verifyOtp(email: string, code: string): Promise<void> {
  const reset = pendingResets.get(key(email));

  if (!reset) {
    throw new Error("No reset request found. Please request a new code");
  }

  if (reset.code !== code.trim()) {
    throw new Error("Incorrect code");
  }

  reset.verified = true;
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<void> {
  const reset = pendingResets.get(key(email));
  const user = findUserByEmail(email);

  if (!reset?.verified || !user) {
    throw new Error("Please verify your code first");
  }

  user.password = newPassword;
  pendingResets.delete(key(email));
}

export async function getUserById(id: string): Promise<User> {
  return { ...findUser(id) };
}
