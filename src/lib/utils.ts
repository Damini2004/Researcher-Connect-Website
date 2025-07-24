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
  const now = new Date();
  
  // Format the current date into year, month, and day parts according to the Indian timezone.
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const year = parseInt(parts.find(p => p.type === 'year')!.value, 10);
  const month = parseInt(parts.find(p => p.type === 'month')!.value, 10) - 1; // month is 0-indexed
  const day = parseInt(parts.find(p => p.type === 'day')!.value, 10);

  // Create a new Date object in UTC at the beginning of the day in India.
  const todayInIndiaAsUTC = new Date(Date.UTC(year, month, day));
  
  return todayInIndiaAsUTC;
}
