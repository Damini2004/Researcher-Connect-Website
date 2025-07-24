
// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { z } from 'zod';

export interface Conference {
    id: string;
    title: string;
    description: string;
    date: string; // The original string date
    dateObject: Date; // A reliable Date object for comparisons
    location: string;
    imageSrc: string;
    createdAt: string;
}

const conferenceSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    date: z.string(),
    location: z.string().min(3, "Location is required."),
    imageSrc: z.string().url("Must be a valid URL (Base64 data URI).").or(z.string().startsWith("data:image")),
});

interface AddConferenceData {
    title: string;
    description: string;
    date: string;
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
            const dateString = data.date;

            // Robust Date Parsing
            let dateObject: Date;
            if (dateString && typeof dateString === 'string') {
                // Appending ' 00:00:00 UTC' ensures it's parsed as a UTC date at midnight, avoiding timezone shifts.
                const parsedDate = new Date(dateString); // Use standard parser
                if (!isNaN(parsedDate.getTime())) {
                    // Set to midnight UTC to standardize
                    dateObject = new Date(Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()));
                } else {
                    console.warn(`Invalid date string: "${dateString}" for doc ID: ${doc.id}. Using current date as fallback.`);
                    dateObject = new Date(); 
                    dateObject.setUTCHours(0, 0, 0, 0);
                }
            } else {
                console.warn(`Missing or invalid date field for doc ID: ${doc.id}. Using current date as fallback.`);
                dateObject = new Date(); 
                dateObject.setUTCHours(0, 0, 0, 0);
            }

            conferences.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                date: data.date,
                dateObject: dateObject,
                location: data.location,
                imageSrc: data.imageSrc,
                createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            });
        });
        return conferences;
    } catch (error) {
        console.error("Error fetching conferences from service: ", error);
        throw error; // Re-throw to be caught by the calling component
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
