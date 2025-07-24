// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { z } from 'zod';
import { format } from 'date-fns';

export interface Conference {
    id: string;
    title: string;
    description: string;
    date: string; // The original string date in YYYY-MM-DD format
    dateObject: Date; // A reliable UTC Date object for comparisons
    location: string;
    imageSrc: string;
    createdAt: string;
}

const conferenceSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    date: z.string(), // Will be in YYYY-MM-DD format
    location: z.string().min(3, "Location is required."),
    imageSrc: z.string().url("Must be a valid URL (Base64 data URI).").or(z.string().startsWith("data:image")),
});

interface AddConferenceData {
    title: string;
    description: string;
    date: string; // This will now be YYYY-MM-DD
    location: string;
    imageSrc: string;
}

export async function addConference(data: AddConferenceData): Promise<{ success: boolean; message: string; newConference?: Partial<Conference> }> {
  try {
    const validationResult = conferenceSchema.safeParse(data);
    
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const docRef = await addDoc(collection(db, 'conferences'), {
      ...validationResult.data,
      createdAt: new Date(),
    });
    
    const newConferenceData = {
        id: docRef.id,
        ...validationResult.data,
        createdAt: new Date().toISOString()
    }

    return { 
        success: true, 
        message: 'Conference added successfully!',
        newConference: newConferenceData
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
            const dateString = data.date; // Should be YYYY-MM-DD

            let dateObject: Date;
            if (dateString && typeof dateString === 'string') {
                // Robustly parse YYYY-MM-DD into a UTC date object.
                const parts = dateString.split('-').map(part => parseInt(part, 10));
                if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
                    // parts[1] - 1 because month is 0-indexed in JavaScript Dates
                    dateObject = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
                } else {
                    console.warn(`Invalid date format: "${dateString}". Using current date as fallback.`);
                    dateObject = new Date();
                    dateObject.setUTCHours(0, 0, 0, 0);
                }
            } else {
                console.warn(`Missing or invalid date field. Using current date as fallback.`);
                dateObject = new Date();
                dateObject.setUTCHours(0, 0, 0, 0);
            }

            conferences.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                date: format(dateObject, "PPP"), // Format for display
                dateObject: dateObject,
                location: data.location,
                imageSrc: data.imageSrc,
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
