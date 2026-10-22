import type { DoctorSchedule } from "@/models/schedule.model";

export const schedules: DoctorSchedule[] = [
  {
    doctorId: "d1",
    slotMinutes: 30,
    workingDays: [
      { dayOfWeek: 0, startTime: "09:00", endTime: "12:00" },
      { dayOfWeek: 2, startTime: "09:00", endTime: "12:00" },
    ],
  },
  {
    doctorId: "d2",
    slotMinutes: 30,
    workingDays: [{ dayOfWeek: 1, startTime: "10:00", endTime: "13:00" }],
  },
  {
    doctorId: "d3",
    slotMinutes: 20,
    workingDays: [{ dayOfWeek: 0, startTime: "16:00", endTime: "18:00" }],
  },
  {
    doctorId: "d4",
    slotMinutes: 30,
    workingDays: [
      { dayOfWeek: 3, startTime: "12:00", endTime: "16:00" },
      { dayOfWeek: 6, startTime: "12:00", endTime: "16:00" },
    ],
  },
  {
    doctorId: "d5",
    slotMinutes: 15,
    workingDays: [
      { dayOfWeek: 1, startTime: "14:00", endTime: "18:00" },
      { dayOfWeek: 4, startTime: "14:00", endTime: "18:00" },
    ],
  },
  {
    doctorId: "d6",
    slotMinutes: 30,
    workingDays: [{ dayOfWeek: 2, startTime: "09:00", endTime: "11:00" }],
  },
];
