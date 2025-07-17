
// src/services/submissionService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, orderBy, query, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { z } from 'zod';

// Zod schema for form data validation
const submissionSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  journalId: z.string(),
  content: z.string().min(100, "Content must be at least 100 characters."),
  manuscriptData: z.string().startsWith("data:application/pdf;base64,"),
});

const updateSubmissionSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    status: z.enum(["Verification Pending", "In Progress", "Done", "Canceled"]),
});

// Interface for submission data structure in Firestore
export interface Submission {
    id: string;
    fullName: string;
    email: string;
    title: string;
    journalId: string;
    content: string;
    manuscriptData: string; // Storing Base64 data
    status: "Verification Pending" | "In Progress" | "Done" | "Canceled";
    submittedAt: Date;
}

interface AddSubmissionData {
    fullName: string;
    email: string;
    title: string;
    journalId: string;
    content: string;
    manuscriptData: string;
}

type UpdateSubmissionData = z.infer<typeof updateSubmissionSchema>;

export async function addSubmission(data: AddSubmissionData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate incoming data
    const validationResult = submissionSchema.safeParse(data);
    if (!validationResult.success) {
        return { success: false, message: validationResult.error.errors[0].message };
    }

    // Save submission data to Firestore
    await addDoc(collection(db, 'submissions'), {
        ...validationResult.data,
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
                manuscriptData: data.manuscriptData,
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

export async function updateSubmission(id: string, data: UpdateSubmissionData): Promise<{ success: boolean; message: string; updatedSubmission?: Submission }> {
    try {
        const validationResult = updateSubmissionSchema.safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        const submissionRef = doc(db, 'submissions', id);
        await updateDoc(submissionRef, validationResult.data);
        
        const updatedDoc = await getDoc(submissionRef);
        const updatedData = updatedDoc.data();
        
        if (!updatedData) {
            throw new Error("Could not retrieve updated submission document.");
        }
        
        const result: Submission = {
            id: updatedDoc.id,
            ...updatedData
        } as Submission;

        return { success: true, message: 'Submission updated successfully!', updatedSubmission: result };

    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update submission: ${message}` };
    }
}

export async function deleteSubmission(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Submission ID is required.' };
        }
        await deleteDoc(doc(db, 'submissions', id));
        return { success: true, message: 'Submission deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete submission: ${message}` };
    }
}
