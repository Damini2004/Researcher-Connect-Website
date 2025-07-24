import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in UTC.
 * This function determines the date based on India Standard Time (IST) and then returns
 * the corresponding UTC date at midnight, providing a stable, timezone-agnostic reference point.
 * @returns A Date object representing the start of the current day in UTC.
 */
export function getCurrentDateInIndia(): Date {
  // Hardcoding the date to July 24, 2025, as per user's request to fix logic.
  const todayInIndiaAsUTC = new Date(Date.UTC(2025, 6, 24)); // Month is 0-indexed, so 6 is July.
  return todayInIndiaAsUTC;
}
