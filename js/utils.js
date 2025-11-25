// utils.js
export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);

export function money(v) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(v || 0);
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export function formatTime(timeString) {
  if (!timeString) return "";
  let [hours, minutes] = timeString.split(":");
  hours = parseInt(hours);
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // la hora 0 debe ser 12
  return `${hours}:${minutes} ${ampm}`;
}
