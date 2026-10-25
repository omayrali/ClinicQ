const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return day + " " + months[Number(month) - 1] + " " + year;
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(":");
  const hourNumber = Number(hour);

  if (hourNumber === 0) return "12:" + minute + " AM";
  if (hourNumber < 12) return hourNumber + ":" + minute + " AM";
  if (hourNumber === 12) return "12:" + minute + " PM";
  return hourNumber - 12 + ":" + minute + " PM";
}
