import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in UTC,
 * based on the current calendar date in India.
 * This approach avoids timezone complexities during Firestore queries.
 * @returns A Date object representing the start of the current day in India, but set in UTC.
 */
export function getCurrentDateInIndia(): Date {
  const nowInIndia = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [month, day, year] = nowInIndia.split('/').map(Number);
  
  // Create a UTC date object. This ensures that when Firestore compares it,
  // it's a clean "start of day" comparison without timezone offsets.
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}
