import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in the India Standard Time (IST) timezone,
 * and returns it as a UTC date object. This provides a stable, timezone-agnostic reference for date comparisons.
 * @returns A Date object representing the start of the current day in India, adjusted to UTC midnight.
 */
export function getCurrentDateInIndia(): Date {
  // Get the current date and time
  const now = new Date();
  
  // Format the date into a string that represents the date in India (e.g., "2024-07-26").
  // The 'en-CA' locale provides a reliable YYYY-MM-DD format.
  const indiaDateString = now.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata',
  });

  // Create a new Date object from this string.
  // new Date('2024-07-26') creates a date for 2024-07-26 at 00:00:00 UTC.
  // This is the key to ensuring all comparisons are done in a consistent UTC context.
  const todayInIndiaAsUTC = new Date(indiaDateString);
  
  return todayInIndiaAsUTC;
}
