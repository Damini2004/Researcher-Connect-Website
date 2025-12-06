import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in India Standard Time (IST).
 * This function correctly accounts for timezones to ensure accurate date-based queries.
 * @returns A Date object representing the start of the current day in the 'Asia/Kolkata' timezone.
 */
export function getCurrentDateInIndia(): Date {
  const now = new Date();
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Kolkata',
    hour12: false,
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  
  const year = parseInt(parts.find(p => p.type === 'year')?.value || '1970', 10);
  const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
  const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);

  // Return a new Date object in UTC at midnight for that specific date in India.
  // This avoids timezone complexities when querying Firestore, which stores Timestamps in UTC.
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}
