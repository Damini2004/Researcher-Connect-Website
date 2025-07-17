
// src/services/internshipService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { z } from 'zod';

export interface Internship {
    id: string;
    name: string;
    description: string;
    imageSrc: string;
    createdAt: string;
}

const internshipSchema = z.object({
    name: z.string().min(5, "Internship name must be at least 5 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    imageSrc: z.string().url("Must be a valid URL (Base64 data URI).").or(z.string().startsWith("data:image")),
});

interface AddInternshipData {
    name: string;
    description: string;
    imageSrc: string;
}

export async function addInternship(data: AddInternshipData): Promise<{ success: boolean; message: string; newInternship?: Internship }> {
  try {
    const validationResult = internshipSchema.safeParse(data);
    
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const docRef = await addDoc(collection(db, 'internships'), {
      ...validationResult.data,
      createdAt: new Date(),
    });
    
    const newInternshipData = {
        id: docRef.id,
        ...validationResult.data,
        createdAt: new Date().toISOString()
    }

    return { 
        success: true, 
        message: 'Internship added successfully!',
        newInternship: newInternshipData
    };
  } catch (error) {
    console.error("Error adding internship:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add internship: ${message}` };
  }
}

export async function getInternships(): Promise<Internship[]> {
    try {
        const q = query(collection(db, "internships"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const internships: Internship[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            internships.push({
                id: doc.id,
                name: data.name,
                description: data.description,
                imageSrc: data.imageSrc,
                createdAt: data.createdAt.toDate().toISOString(),
            });
        });
        return internships;
    } catch (error) {
        console.error("Error fetching internships from service: ", error);
        // Re-throw the error so the component can catch it
        throw error;
    }
}

export async function deleteInternship(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Internship ID is required.' };
        }
        await deleteDoc(doc(db, 'internships', id));
        return { success: true, message: 'Internship deleted successfully.' };
    } catch (error) {
        console.error("Error deleting internship:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete internship: ${message}` };
    }
}
