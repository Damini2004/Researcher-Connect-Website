// src/services/journalService.ts
'use server';

import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Journal {
    id: string;
    journalName: string;
    description: string;
    status: "Active" | "Inactive" | "Archived";
    imageSrc: string;
}

export async function addJournal(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const journalName = formData.get('journalName') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as "Active" | "Inactive" | "Archived";
    const image = formData.get('image') as File | null;

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
    if (!image || image.size === 0) {
      return { success: false, message: 'Cover image is required.' };
    }
    if (!image.type.startsWith('image/')) {
      return { success: false, message: 'Only image files are allowed.' };
    }

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
    // It's helpful to know what kind of error it is
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
