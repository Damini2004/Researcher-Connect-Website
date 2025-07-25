// src/lib/types.ts
import { z } from 'zod';

// Zod schema for the new detailed conference form
export const conferenceSchema = z.object({
  // Basic Details
  title: z.string().min(10, "Title must be at least 10 characters."),
  description: z.string().min(20, "Short description must be at least 20 characters."),
  fullDescription: z.string().min(50, "Full description must be at least 50 characters."),
  conferenceType: z.enum(["National", "International", "Workshop", "Seminar"]),
  organizerName: z.string().min(3, "Organizer name is required."),
  organizerEmail: z.string().email("A valid organizer email is required."),
  organizerPhone: z.string().min(10, "A valid phone number is required."),

  // Schedule and Location
  startDate: z.date(),
  endDate: z.date(),
  submissionDeadline: z.date(),
  registrationDeadline: z.date(),
  locationType: z.enum(["Online", "Offline", "Hybrid"]),
  venueAddress: z.string().optional(),
  onlinePlatform: z.string().optional(),

  // Participation Details
  expectedAttendees: z.coerce.number().min(1, "Expected attendees must be at least 1."),
  audienceType: z.string().min(3, "Audience type is required."),
  callForPapers: z.boolean().default(false),
  
  // Media
  bannerImage: z.any(),

  // Configuration
  enableAbstractSubmission: z.boolean().default(false),
  enableFullPaperSubmission: z.boolean().default(false),
  
}).refine(data => {
    if (data.locationType === 'Offline' || data.locationType === 'Hybrid') {
        return !!data.venueAddress && data.venueAddress.length > 5;
    }
    return true;
}, {
    message: "Venue address is required for Offline or Hybrid events.",
    path: ["venueAddress"],
}).refine(data => {
    if (data.locationType === 'Online' || data.locationType === 'Hybrid') {
        return !!data.onlinePlatform && data.onlinePlatform.length > 2;
    }
    return true;
}, {
    message: "Online platform details are required for Online or Hybrid events.",
    path: ["onlinePlatform"],
});


export interface Conference {
    id: string;
    title: string;
    description: string;
    date: string;
    dateObject: Date;
    location: string;
    imageSrc: string;
    createdAt: string;
}

// This will be the type for data coming from the form before processing
export type AddConferenceData = z.infer<typeof conferenceSchema>;
