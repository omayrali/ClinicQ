import type { Slot } from "@/models/slot.model";

export function getAvailableDates(slots: Slot[], today: string) {
  const dates = slots
    .filter((slot) => slot.status === "available" && slot.date >= today)
    .map((slot) => slot.date)
    .filter((date, index, all) => all.indexOf(date) === index);

  return dates.sort();
}

export function groupSlotsByPartOfDay(slots: Slot[]) {
  const sorted = [...slots].sort((a, b) => a.startTime.localeCompare(b.startTime));

  const groups = [
    { title: "Morning", slots: sorted.filter((s) => Number(s.startTime.slice(0, 2)) < 12) },
    {
      title: "Afternoon",
      slots: sorted.filter((s) => {
        const hour = Number(s.startTime.slice(0, 2));
        return hour >= 12 && hour < 18;
      }),
    },
    { title: "Evening", slots: sorted.filter((s) => Number(s.startTime.slice(0, 2)) >= 18) },
  ];

  return groups.filter((group) => group.slots.length > 0);
}
