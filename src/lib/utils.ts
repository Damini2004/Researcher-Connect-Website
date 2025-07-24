import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the current date set to the beginning of the day (midnight) in the India Standard Time (IST) timezone.
 * This is crucial for comparing conference dates against a consistent "today" that reflects the user's region.
 * @returns A Date object representing the start of the current day in India.
 */
export function getCurrentDateInIndia(): Date {
  // Get the current date and time
  const now = new Date();
  
  // Format the date into a string that represents the date in India.
  // The 'en-CA' locale gives a YYYY-MM-DD format, which is reliable for the Date constructor.
  const indiaDateString = now.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata',
  });

  // Create a new Date object from the date string.
  // This will be parsed as midnight UTC on that date, creating a standardized reference point.
  // e.g., "2024-07-31" becomes a Date object for 2024-07-31T00:00:00.000Z
  const todayInIndia = new Date(indiaDateString);
  
  return todayInIndia;
}
