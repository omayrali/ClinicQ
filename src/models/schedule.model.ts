export type WorkingDay = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export interface DoctorSchedule {
  doctorId: string;
  slotMinutes: number;
  workingDays: WorkingDay[];
}