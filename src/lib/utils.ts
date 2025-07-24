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
  
  // Get date parts for the 'Asia/Kolkata' timezone
  const year = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric' });
  const month = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', month: '2-digit' });
  const day = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', day: '2-digit' });

  // **CRITICAL FIX**: Create a new Date object in UTC to ensure consistent, timezone-agnostic comparisons.
  // The month from toLocaleString is 1-based, so subtract 1 for the 0-based Date constructor.
  const todayInIndiaAsUTC = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
  
  return todayInIndiaAsUTC;
}
