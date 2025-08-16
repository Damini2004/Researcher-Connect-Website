// src/services/webinarService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { z } from 'zod';
import { format } from 'date-fns';

export interface Webinar {
    id: string;
    title: string;
    description: string;
    date: string; // The original string date in YYYY-MM-DD format
    dateObject: Date; // A reliable UTC Date object for comparisons
    imageSrc: string;
    brochureUrl?: string;
    createdAt: string;
    assignedSubAdminId?: string;
}

const webinarSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    date: z.string(), // Will be in YYYY-MM-DD format
    imageSrc: z.string().url("Must be a valid URL (Base64 data URI).").or(z.string().startsWith("data:image")),
    brochureUrl: z.string().optional(),
    assignedSubAdminId: z.string().optional(),
});

interface AddWebinarData {
    title: string;
    description: string;
    date: string; // This will now be YYYY-MM-DD
    imageSrc: string;
    brochureUrl?: string;
    assignedSubAdminId?: string;
}

export async function addWebinar(data: AddWebinarData): Promise<{ success: boolean; message: string; newWebinar?: Partial<Webinar> }> {
  try {
    const validationResult = webinarSchema.safeParse(data);
    
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const docRef = await addDoc(collection(db, 'webinars'), {
      ...validationResult.data,
      createdAt: new Date(),
    });
    
    const newWebinarData = {
        id: docRef.id,
        ...validationResult.data,
        createdAt: new Date().toISOString()
    }

    return { 
        success: true, 
        message: 'Webinar added successfully!',
        newWebinar: newWebinarData
    };
  } catch (error) {
    console.error("Error adding webinar:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add webinar: ${message}` };
  }
}

export async function getWebinars(): Promise<Webinar[]> {
    try {
        const q = query(collection(db, "webinars"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const webinars: Webinar[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const dateString = data.date; 

            // Robustly parse YYYY-MM-DD into a UTC date object.
            const parts = dateString.split('-').map((part: string) => parseInt(part, 10));
            // parts[1] - 1 because month is 0-indexed in JavaScript Dates
            const dateObject = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));

            webinars.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                date: format(dateObject, "PPP"), // Format for display
                dateObject: dateObject,
                imageSrc: data.imageSrc,
                brochureUrl: data.brochureUrl,
                createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                assignedSubAdminId: data.assignedSubAdminId,
            });
        });
        return webinars;
    } catch (error) {
        console.error("Error fetching webinars from service: ", error);
        throw error;
    }
}

export async function deleteWebinar(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Webinar ID is required.' };
        }
        await deleteDoc(doc(db, 'webinars', id));
        return { success: true, message: 'Webinar deleted successfully.' };
    } catch (error) {
        console.error("Error deleting webinar:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete webinar: ${message}` };
    }
}
