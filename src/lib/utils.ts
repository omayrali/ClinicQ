import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tell tailwind-merge about our custom font sizes (text-md, text-xxl),
// otherwise it treats them as colors and drops them next to a text color.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["md", "xxl"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
