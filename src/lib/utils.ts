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
  
  // Get the current date parts in the Indian timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const year = parseInt(parts.find(p => p.type === 'year')!.value, 10);
  const month = parseInt(parts.find(p => p.type === 'month')!.value, 10);
  const day = parseInt(parts.find(p => p.type === 'day')!.value, 10);

  // Construct a new Date object representing midnight on that day in the local timezone of the server,
  // then create the correct IST date string. This avoids UTC conversion issues.
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00.000+05:30`;
  
  return new Date(dateString);
}
