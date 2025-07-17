// src/services/journalService.ts
'use server';

import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { z } from 'zod';

const AddJournalFormSchema = z.object({
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
  const values = Object.fromEntries(formData.entries());
  const parsed = AddJournalFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  const imageFile = formData.get('image') as File;
  if (!imageFile || imageFile.size === 0) {
    return { success: false, message: 'Cover image is required.' };
  }

  try {
    // 1. Upload image to Firebase Storage
    const storageRef = ref(storage, `journal-covers/${Date.now()}-${imageFile.name}`);
    const uploadResult = await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // 2. Save journal data to Firestore
    await addDoc(collection(db, 'journals'), {
      ...parsed.data,
      imageSrc: imageUrl,
      createdAt: new Date(),
    });

    return { success: true, message: 'Journal added successfully!' };
  } catch (error) {
    console.error("Error adding journal:", error);
    return { success: false, message: 'Failed to add journal.' };
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
