export type UserRole = "patient" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  clinicId?: string;
}
