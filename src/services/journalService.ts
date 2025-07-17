
// src/services/journalService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Journal {
    id: string;
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

interface AddJournalData {
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

export async function addJournal(data: AddJournalData): Promise<{ success: boolean; message: string }> {
  try {
    const { journalName, description, status, imageSrc } = data;

    // Server-side validation
    if (!journalName || journalName.length < 5) {
      return { success: false, message: 'Journal name must be at least 5 characters.' };
    }
    if (!description || description.length < 20) {
      return { success: false, message: 'Description must be at least 20 characters.' };
    }
    if (!status || !['Active', 'Inactive', 'Archived'].includes(status)) {
        return { success: false, message: 'Invalid status provided.' };
    }
    if (!imageSrc) {
      return { success: false, message: 'Cover image is required.' };
    }

    // Save journal data to Firestore with Base64 image
    await addDoc(collection(db, 'journals'), {
      journalName,
      description,
      status,
      imageSrc, // Storing the Base64 string
      createdAt: new Date(),
    });

    return { success: true, message: 'Journal added successfully!' };
  } catch (error) {
    console.error("Error adding journal:", error);
    if (error instanceof Error) {
        return { success: false, message: `Failed to add journal: ${error.message}` };
    }
    return { success: false, message: 'Failed to add journal. An unexpected error occurred.' };
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
