import { schedules } from "@/data/mock/schedules.mock";
import type { DoctorSchedule } from "@/models/schedule.model";

export async function getSchedule(doctorId: string): Promise<DoctorSchedule> {
  const schedule = schedules.find((s) => s.doctorId === doctorId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  return {
    ...schedule,
    workingDays: schedule.workingDays.map((d) => ({ ...d })),
  };
}

export async function updateSchedule(updated: DoctorSchedule): Promise<void> {
  const index = schedules.findIndex((s) => s.doctorId === updated.doctorId);

  if (index === -1) {
    throw new Error("Schedule not found");
  }

  schedules[index] = {
    ...updated,
    workingDays: updated.workingDays.map((d) => ({ ...d })),
  };
}
