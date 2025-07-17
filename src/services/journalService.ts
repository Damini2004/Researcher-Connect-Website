// src/services/journalService.ts
'use server';

import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { z } from 'zod';

// Zod schema for validation, now used more carefully.
const JournalDataSchema = z.object({
  journalName: z.string().min(5, "Journal name must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  status: z.enum(["Active", "Inactive", "Archived"]),
});

export interface Journal {
    id: string;
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

export async function addJournal(formData: FormData): Promise<{ success: boolean; message: string }> {
  const journalName = formData.get('journalName') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as "Active" | "Inactive" | "Archived";
  const image = formData.get('image') as File | null;

  // Manual validation
  if (!image || image.size === 0) {
    return { success: false, message: 'Cover image is required.' };
  }
  if (!image.type.startsWith('image/')) {
    return { success: false, message: 'Only image files are allowed.' };
  }

  const validationResult = JournalDataSchema.safeParse({ journalName, description, status });
  if (!validationResult.success) {
      const firstError = validationResult.error.errors[0].message;
      return { success: false, message: firstError };
  }

  try {
    // 1. Upload image to Firebase Storage
    const storageRef = ref(storage, `journal-covers/${Date.now()}-${image.name}`);
    const uploadResult = await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // 2. Save journal data to Firestore
    await addDoc(collection(db, 'journals'), {
      journalName,
      description,
      status,
      imageSrc: imageUrl,
      createdAt: new Date(),
    });

    return { success: true, message: 'Journal added successfully!' };
  } catch (error) {
    console.error("Error adding journal:", error);
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
