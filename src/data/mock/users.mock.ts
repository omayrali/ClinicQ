import type { User } from "@/models/User";

export const users: User[] = [
  {
    id: "p1",
    name: "Omar Khaled",
    email: "omar.khaled@example.com",
    phone: "01012345678",
    role: "patient",
  },
  {
    id: "p2",
    name: "Nour Ibrahim",
    email: "nour.ibrahim@example.com",
    phone: "01123456789",
    role: "patient",
  },
  {
    id: "p3",
    name: "Hana Tarek",
    email: "hana.tarek@example.com",
    phone: "01234567890",
    role: "patient",
  },
  {
    id: "s1",
    name: "Reception Desk",
    email: "staff@clinicq.example.com",
    phone: "0221234567",
    role: "staff",
  },
];
