// src/services/submissionService.ts
'use server';

import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, orderBy, query } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { z } from 'zod';

// Zod schema for form data validation
const submissionSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  journalId: z.string(),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

// Interface for submission data structure in Firestore
export interface Submission {
    id: string;
    fullName: string;
    email: string;
    title: string;
    journalId: string;
    content: string;
    manuscriptUrl: string;
    status: "Verification Pending" | "In Progress" | "Done" | "Canceled";
    submittedAt: Date;
}

export async function addSubmission(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const data = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        title: formData.get('title') as string,
        journalId: formData.get('journalId') as string,
        content: formData.get('content') as string,
        manuscriptFile: formData.get('manuscriptFile') as string, // Base64 string
    };
    
    // Validate text fields
    const validationResult = submissionSchema.safeParse(data);
    if (!validationResult.success) {
        return { success: false, message: validationResult.error.errors[0].message };
    }

    if (!data.manuscriptFile) {
        return { success: false, message: 'Manuscript file is required.' };
    }

    // Upload manuscript to Firebase Storage
    const storageRef = ref(storage, `manuscripts/${Date.now()}-${validationResult.data.title}.pdf`);
    const uploadResult = await uploadString(storageRef, data.manuscriptFile, 'data_url');
    const manuscriptUrl = await getDownloadURL(uploadResult.ref);

    // Save submission data to Firestore
    await addDoc(collection(db, 'submissions'), {
        ...validationResult.data,
        manuscriptUrl,
        status: 'Verification Pending',
        submittedAt: new Date(),
    });

    return { success: true, message: 'Submission successful!' };
  } catch (error) {
    console.error("Error adding submission:", error);
    if (error instanceof Error) {
        return { success: false, message: `Failed to add submission: ${error.message}` };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}


export async function getSubmissions(): Promise<Submission[]> {
    try {
        const q = query(collection(db, "submissions"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const submissions: Submission[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            submissions.push({
                id: doc.id,
                fullName: data.fullName,
                email: data.email,
                title: data.title,
                journalId: data.journalId,
                content: data.content,
                manuscriptUrl: data.manuscriptUrl,
                status: data.status,
                submittedAt: data.submittedAt.toDate(),
            });
        });
        return submissions;
    } catch (error) {
        console.error("Error fetching submissions: ", error);
        return [];
    }
}
