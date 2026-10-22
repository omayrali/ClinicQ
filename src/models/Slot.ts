export type SlotStatus = "available" | "booked" | "blocked";

export interface Slot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
}
