import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in the India Standard Time (IST) timezone.
 * @returns A Date object representing the start of the current day in India.
 */
export function getCurrentDateInIndia(): Date {
  // Get current date and time
  const now = new Date();
  
  // Format parts of the date according to the Indian timezone
  const year = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric' });
  const month = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', month: '2-digit' });
  const day = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', day: '2-digit' });

  // Create a new Date object representing midnight in the local timezone of the server,
  // but using the date components from the Indian timezone.
  // Note: The month from toLocaleString is 1-based, but the Date constructor expects a 0-based month.
  const todayInIndia = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  return todayInIndia;
}
