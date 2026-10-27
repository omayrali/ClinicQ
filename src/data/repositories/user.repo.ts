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

export async function getUserById(id: string): Promise<User> {
  return { ...findUser(id) };
}

export async function updateUser(
  id: string,
  changes: Partial<Pick<User, "name" | "email" | "phone" | "password">>,
): Promise<User> {
  const user = findUser(id);

  if (changes.email) {
    const other = findUserByEmail(changes.email);

    if (other && other.id !== id) {
      throw new Error("An account with this email already exists");
    }
  }

  Object.assign(user, changes);
  return { ...user };
}
