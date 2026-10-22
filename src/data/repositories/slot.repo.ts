import { slots } from "@/data/mock/slots.mock";
import type { Slot, SlotStatus } from "@/models/slot.model";

export function findSlot(slotId: string): Slot {
  const slot = slots.find((s) => s.id === slotId);
  if (!slot) throw new Error("Slot not found");
  return slot;
}

function sortByTime(list: Slot[]): Slot[] {
  return list.sort((a, b) =>
    (a.date + a.startTime).localeCompare(b.date + b.startTime),
  );
}

export async function getSlots(
  doctorId: string,
  date: string,
): Promise<Slot[]> {
  return sortByTime(
    slots
      .filter((s) => s.doctorId === doctorId && s.date === date)
      .map((s) => ({ ...s })),
  );
}

export async function getSlotsByDoctor(doctorId: string): Promise<Slot[]> {
  return sortByTime(
    slots.filter((s) => s.doctorId === doctorId).map((s) => ({ ...s })),
  );
}

export async function getSlotById(slotId: string): Promise<Slot> {
  return { ...findSlot(slotId) };
}

export async function setSlotStatus(
  slotId: string,
  status: SlotStatus,
): Promise<void> {
  findSlot(slotId).status = status;
}

export async function blockSlot(slotId: string): Promise<void> {
  const slot = findSlot(slotId);

  if (slot.status !== "available") {
    throw new Error("Only available slots can be blocked");
  }

  slot.status = "blocked";
}

export async function unblockSlot(slotId: string): Promise<void> {
  const slot = findSlot(slotId);

  if (slot.status !== "blocked") {
    throw new Error("Slot is not blocked");
  }

  slot.status = "available";
}
