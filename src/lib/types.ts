// src/lib/types.ts
import { z } from 'zod';

// Zod schema for the new detailed conference form
export const conferenceSchema = z.object({
  // --- Basic Details ---
  title: z.string().min(10, "Title must be at least 10 characters long."),
  shortTitle: z.string().min(3, "Short title/acronym is required."),
  tagline: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),

  // --- Schedule & Location ---
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  venueName: z.string().min(3, "Venue name is required."),
  country: z.string().min(2, "Country is required."),
  modeOfConference: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one conference mode.",
  }),

  // --- About & Contact ---
  aboutConference: z.string().min(50, "About section must be at least 50 characters."),
  conferenceWebsite: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  conferenceLogo: z.any().optional(), // File uploads are optional during step validation
  conferenceEmail: z.string().email("Please enter a valid contact email."),

  // --- People & Organization ---
  organizingCommittee: z.string().optional(),
  keynoteSpeakers: z.string().optional(),
  editorialBoard: z.string().optional(),
  teamBios: z.string().optional(),

  // --- Submissions & Content ---
  tracks: z.string().optional(),
  keywords: z.string().optional(),
  submissionInstructions: z.string().optional(),
  paperTemplateUrl: z.any().optional(),
  submissionStartDate: z.date({ required_error: "Submission start date is required." }),
  submissionEndDate: z.date({ required_error: "Abstract submission deadline is required." }),
  fullPaperSubmissionDeadline: z.date().optional(),
  registrationDeadline: z.date().optional(),
  paperCategories: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one paper category.",
  }),
  peerReviewMethod: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters."),
  category: z.union([z.string(), z.array(z.string())]).refine(val => (Array.isArray(val) && val.length > 0) || (typeof val === 'string' && val.length > 0), {
    message: "At least one category is required.",
  }),
  author: z.string().min(3, "Author name is required."),
  content: z.string().min(100, "Content must be at least 100 characters."),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters.").max(200, "Excerpt cannot exceed 200 characters."),
  image: z.any().refine((files) => files?.length > 0, "An image is required.").or(z.any().optional()),
  isFeatured: z.boolean().default(false),
  keywords: z.array(z.string()).optional(),
});

export const faqSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters."),
  answer: z.string().min(20, "Answer must be at least 20 characters."),
});

export type FaqData = z.infer<typeof faqSchema>;

export type BlogPost = {
    id: string;
    title: string;
    category: string | string[];
    author: string;
    content: string;
    excerpt: string;
    imageSrc: string;
    imageHint: string;
    isFeatured: boolean;
    createdAt: string;
    date: string;
    keywords: string[];
}

export type AddBlogPostData = z.infer<typeof blogPostSchema>;


export interface Conference {
  id: string;
  title: string;
  shortTitle: string;
  tagline?: string;
  status: 'active' | 'inactive';
  date: string; // Formatted date range for display
  startDate: string; // ISO String
  endDate: string; // ISO String
  venueName: string;
  country: string;
  modeOfConference: string[];
  aboutConference: string;
  conferenceWebsite?: string;
  imageSrc: string; // Changed from conferenceLogo for consistency
  conferenceEmail: string;
  organizingCommittee?: string;
  keynoteSpeakers?: string;
  editorialBoard?: string;
  teamBios?: string;
  tracks?: string;
  keywords?: string;
  submissionInstructions?: string;
  paperTemplateUrl?: string; // Kept for display if old data has it
  submissionStartDate: string; // ISO String
  submissionEndDate: string; // ISO String for Abstract deadline
  fullPaperSubmissionDeadline?: string; // ISO String
  registrationDeadline?: string; // ISO String
  paperCategories: string[];
  peerReviewMethod?: string;
  registrationFees?: string; // Kept for display if old data has it
  accommodationDetails?: string; // Kept for display if old data has it
  faqs?: string; // Kept for display if old data has it
  editorChoice?: string; // Kept for display if old data has it
  createdAt: string;
  dateObject: Date; // For sorting
  location: string; // For display
  // Deprecated fields, kept for compatibility with old data if needed
  description: string;
  fullDescription: string;
  venueAddress: string;
  conferenceType: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  submissionDeadline: string; // This name is now ambiguous, prefer submissionEndDate
  locationType: string;
  audienceType: string;
  callForPapers: boolean;
  enableAbstractSubmission: boolean;
  enableFullPaperSubmission: boolean;
}

// This will be the type for data coming from the form before processing
export type AddConferenceData = z.infer<typeof conferenceSchema>;

export interface HistoryEntry {
  action: string;
  actionDate: string; 
  status: string;
  submittedAt: string;
  [key: string]: any; 
}

// Interface for submission data structure in Firestore
export interface Submission {
    id: string;
    fullName: string;
    email: string;
    title: string;
    targetId: string;
    submissionType: string;
    content: string;
    manuscriptData: string; // Storing Base64 data
    status: "Verification Pending" | "Re-Verification Pending" | "In Progress" | "Done" | "Canceled";
    submittedAt: string; // Changed to string to be serializable
    assignedSubAdminId?: string;
    history?: HistoryEntry[];
}
