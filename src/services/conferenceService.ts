// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { z } from 'zod';
import { format } from 'date-fns';

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
    startDate: string;
    endDate: string;
    startDateObject: Date;
    location: string; // Simplified for table view
    imageSrc: string;
    createdAt: string;
}


// This will be the type for data coming from the form before processing
export type AddConferenceData = z.infer<typeof conferenceSchema>;

export async function addConference(data: AddConferenceData & { bannerImage: string }): Promise<{ success: boolean; message: string; }> {
  try {
    // We expect bannerImage to be a base64 string already
    const dataToSave = {
        ...data,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        submissionDeadline: format(data.submissionDeadline, "yyyy-MM-dd"),
        registrationDeadline: format(data.registrationDeadline, "yyyy-MM-dd"),
        createdAt: new Date(),
    };

    await addDoc(collection(db, 'conferences'), dataToSave);
    
    return { 
        success: true, 
        message: 'Conference added successfully!',
    };
  } catch (error) {
    console.error("Error adding conference:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add conference: ${message}` };
  }
}

export async function getConferences(): Promise<Conference[]> {
    try {
        const q = query(collection(db, "conferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const conferences: Conference[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const dateString = data.startDate; 

            let dateObject: Date;
            if (dateString && typeof dateString === 'string') {
                const parts = dateString.split('-').map(part => parseInt(part, 10));
                dateObject = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
            } else {
                dateObject = new Date();
                dateObject.setUTCHours(0, 0, 0, 0);
            }

            let location = "Online";
            if (data.locationType === "Offline") {
                location = data.venueAddress;
            } else if (data.locationType === "Hybrid") {
                location = `${data.venueAddress} / Online`;
            }

            conferences.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                startDate: format(dateObject, "PPP"),
                endDate: data.endDate ? format(new Date(data.endDate), "PPP") : format(dateObject, "PPP"),
                startDateObject: dateObject,
                location: location,
                imageSrc: data.bannerImage, // updated from imageSrc
                createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            });
        });
        return conferences;
    } catch (error) {
        console.error("Error fetching conferences from service: ", error);
        throw error;
    }
}

export async function deleteConference(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Conference ID is required.' };
        }
        await deleteDoc(doc(db, 'conferences', id));
        return { success: true, message: 'Conference deleted successfully.' };
    } catch (error) {
        console.error("Error deleting conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete conference: ${message}` };
    }
}
