
// src/services/journalService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { z } from 'zod';

export interface Journal {
    id: string;
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

const journalSchema = z.object({
    journalName: z.string().min(5, "Journal name must be at least 5 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    status: z.enum(["Active", "Inactive", "Archived"]),
    imageSrc: z.string().optional(), // Optional on update if no new image is provided
});


interface AddJournalData {
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

export async function addJournal(data: AddJournalData): Promise<{ success: boolean; message: string; newJournal?: Journal }> {
  try {
    const validationResult = journalSchema.extend({
        imageSrc: z.string().min(1, "Image is required.")
    }).safeParse(data);
    
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const docRef = await addDoc(collection(db, 'journals'), {
      ...validationResult.data,
      createdAt: new Date(),
    });

    return { 
        success: true, 
        message: 'Journal added successfully!',
        newJournal: { id: docRef.id, ...validationResult.data }
    };
  } catch (error) {
    console.error("Error adding journal:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add journal: ${message}` };
  }
}

export async function getJournals(): Promise<Journal[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "journals"));
        const journals: Journal[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            journals.push({
                id: doc.id,
                journalName: data.journalName,
                description: data.description,
                status: data.status,
                imageSrc: data.imageSrc,
            });
        });
        return journals;
    } catch (error) {
        console.error("Error fetching journals: ", error);
        return [];
    }
}

export async function updateJournal(id: string, data: Partial<AddJournalData>): Promise<{ success: boolean; message: string; updatedJournal?: Journal }> {
    try {
        const validationResult = journalSchema.partial().safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        const journalRef = doc(db, 'journals', id);
        await updateDoc(journalRef, validationResult.data);

        const updatedDoc = await getDoc(journalRef);
        const updatedData = updatedDoc.data();

        if (!updatedData) {
            throw new Error("Could not retrieve updated document.");
        }

        const result: Journal = {
            id: updatedDoc.id,
            journalName: updatedData.journalName,
            description: updatedData.description,
            status: updatedData.status,
            imageSrc: updatedData.imageSrc
        }

        return { success: true, message: 'Journal updated successfully!', updatedJournal: result };
    } catch (error) {
        console.error("Error updating journal:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update journal: ${message}` };
    }
}

export async function deleteJournal(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Journal ID is required.' };
        }
        await deleteDoc(doc(db, 'journals', id));
        return { success: true, message: 'Journal deleted successfully.' };
    } catch (error) {
        console.error("Error deleting journal:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete journal: ${message}` };
    }
}

export async function updateJournalStatus(id: string, status: "Active" | "Inactive" | "Archived"): Promise<{ success: boolean; message: string; }> {
    try {
        const journalRef = doc(db, 'journals', id);
        await updateDoc(journalRef, { status });
        return { success: true, message: "Status updated successfully." };
    } catch (error) {
        console.error("Error updating journal status:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update status: ${message}` };
    }
}
