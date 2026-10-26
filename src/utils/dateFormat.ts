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

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getWeekday(date: string) {
  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day)).getDay();
}

export function getDayName(date: string) {
  return dayNames[getWeekday(date)].slice(0, 3);
}


export function getDayNumber(date: string) {
  return String(Number(date.split("-")[2]));
}

export function formatLongDate(date: string) {
  const [, month, day] = date.split("-");
  return (
    dayNames[getWeekday(date)] + ", " + Number(day) + " " + monthNames[Number(month) - 1]
  );
}

export function formatMonth(date: string) {
  const [year, month] = date.split("-");
  return monthNames[Number(month) - 1] + " " + year;
}

export function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}
