
// src/services/submissionService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, orderBy, query, doc, updateDoc, getDoc, deleteDoc, where, writeBatch } from 'firebase/firestore';
import { z } from 'zod';
import { getConferenceById } from './conferenceService';
import { sendEmail } from './emailService';
import { getPaymentUrl } from './settingsService';
import type { Submission, HistoryEntry } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';


// Zod schema for form data validation
const submissionSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  targetId: z.string().min(1, "Please select a target for your submission."),
  submissionType: z.string({ required_error: "Please select a submission type." }),
  content: z.string().min(100, "Content must be at least 100 characters."),
  manuscriptData: z.string(), // Base64 data can be any string
  resubmissionId: z.string().optional(),
});

const updateSubmissionSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    status: z.enum(["Verification Pending", "Re-Verification Pending", "In Progress", "Done", "Canceled"]),
});

interface AddSubmissionData {
    fullName: string;
    email: string;
    title: string;
    targetId: string;
    submissionType: string;
    content: string;
    manuscriptData: string;
    resubmissionId?: string;
}

type UpdateSubmissionData = z.infer<typeof updateSubmissionSchema>;

export async function addSubmission(data: AddSubmissionData): Promise<{ success: boolean; message: string }> {
  try {
    const validationResult = submissionSchema.safeParse(data);
    if (!validationResult.success) {
        return { success: false, message: validationResult.error.errors[0].message };
    }
    
    const { resubmissionId, ...submissionData } = validationResult.data;

    if (resubmissionId) {
        // Handle re-submission by UPDATING the existing document
        const originalSubmissionRef = doc(db, 'submissions', resubmissionId);
        const originalSubmissionSnap = await getDoc(originalSubmissionRef);

        if (!originalSubmissionSnap.exists()) {
            return { success: false, message: `Original submission with ID ${resubmissionId} not found.` };
        }

        const originalData = originalSubmissionSnap.data();
        
        const historyEntry: HistoryEntry = {
            action: 'Archived before Re-submission',
            actionDate: new Date().toISOString(),
            status: originalData.status,
            submittedAt: new Date(originalData.submittedAt.toDate()).toISOString(),
            title: originalData.title,
            content: originalData.content,
            fullName: originalData.fullName,
            email: originalData.email,
            targetId: originalData.targetId,
            submissionType: originalData.submissionType,
            manuscriptData: originalData.manuscriptData, 
            assignedSubAdminId: originalData.assignedSubAdminId,
        };

        const updatedSubmissionData = {
            ...submissionData, // new data from the form
            status: 'Re-Verification Pending' as const,
            submittedAt: new Date(),
            history: [...(originalData.history || []), historyEntry],
            assignedSubAdminId: originalData.assignedSubAdminId,
        };
        
        await updateDoc(originalSubmissionRef, updatedSubmissionData);

    } else {
        let assignedSubAdminId: string | undefined = undefined;
        if (submissionData.submissionType === 'conference') {
            const conferenceResult = await getConferenceById(submissionData.targetId);
            if (conferenceResult.success && conferenceResult.conference?.editorChoice) {
                assignedSubAdminId = conferenceResult.conference.editorChoice;
            }
        } else if (submissionData.submissionType === 'journal') {
            const journalRef = doc(db, 'journals', submissionData.targetId);
            const journalSnap = await getDoc(journalRef);
            if (journalSnap.exists() && journalSnap.data().editorChoice) {
                assignedSubAdminId = journalSnap.data().editorChoice;
            }
        }
        
        await addDoc(collection(db, 'submissions'), {
            ...submissionData,
            status: 'Verification Pending',
            submittedAt: new Date(),
            assignedSubAdminId: assignedSubAdminId || null,
            history: [],
        });
    }

    return { success: true, message: 'Submission successful!' };
  } catch (error) {
    console.error("Error adding submission:", error);
    if (error instanceof Error) {
        return { success: false, message: `Failed to add submission: ${error.message}` };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

const mapDocToSubmission = (doc: QueryDocumentSnapshot<DocumentData>): Submission => {
    const data = doc.data();

    // Helper to safely convert Firestore Timestamps or other date formats to ISO strings
    const toISOString = (date: any): string => {
        if (!date) return new Date().toISOString();
        if (typeof date.toDate === 'function') { // Handle Firestore Timestamps
            return date.toDate().toISOString();
        }
        if (date instanceof Date) { // Handle JS Dates
             return date.toISOString();
        }
        // Handle strings or numbers
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
            return d.toISOString();
        }
        // Fallback for unexpected types
        return new Date().toISOString();
    };


    const history = (data.history || []).map((entry: any) => {
        return {
            ...entry,
            submittedAt: toISOString(entry.submittedAt),
            actionDate: toISOString(entry.actionDate),
        };
    });

    return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        title: data.title,
        targetId: data.targetId,
        submissionType: data.submissionType,
        content: data.content,
        manuscriptData: data.manuscriptData,
        status: data.status,
        submittedAt: toISOString(data.submittedAt),
        assignedSubAdminId: data.assignedSubAdminId,
        history: history,
    };
};


export async function getSubmissions(options: { subAdminId?: string } = {}): Promise<Submission[]> {
    try {
        const submissionsRef = collection(db, "submissions");
        let allSubmissions: Submission[] = [];

        // Fetch all submissions once to perform in-memory filtering
        const allSnapshot = await getDocs(query(submissionsRef, orderBy("submittedAt", "desc")));
        allSubmissions = allSnapshot.docs.map(mapDocToSubmission);

        if (options.subAdminId) {
            const subAdminId = options.subAdminId;
            const relevantSubmissions = allSubmissions.filter(s => {
                // Currently assigned to this admin
                if (s.assignedSubAdminId === subAdminId) return true;
                // Unassigned (new submissions)
                if (!s.assignedSubAdminId) return true;
                // Previously assigned to this admin (check history)
                if (s.history && s.history.some(h => h.assignedSubAdminId === subAdminId)) return true;
                // Return false if none of the above
                return false;
            });
            return relevantSubmissions;
        } else {
            // If no subAdminId is provided, return all submissions (for super-admin)
            return allSubmissions;
        }
    } catch (error) {
        console.error("Error fetching submissions: ", error);
        return [];
    }
}


export async function updateSubmission(submission: Submission, data: UpdateSubmissionData): Promise<{ success: boolean; message: string; updatedSubmission?: Submission }> {
    try {
        const validationResult = updateSubmissionSchema.safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        const submissionRef = doc(db, 'submissions', submission.id);
        await updateDoc(submissionRef, validationResult.data);
        
        if (validationResult.data.status === 'Done') {
            const paymentUrlResult = await getPaymentUrl();
            let paymentUrl = paymentUrlResult.success ? paymentUrlResult.url : '';
            
            if (!paymentUrl) {
                console.warn("Payment URL not set. Sending approval email without payment link.");
            }

            let customMessage = `Dear ${submission.fullName},

We are delighted to inform you that your paper, "${submission.title}", has been successfully approved for publication!

Congratulations on this achievement. Our team was highly impressed with the quality and contribution of your research.`;

            if (paymentUrl) {
                customMessage += `

As part of the publication process, please follow the link below to complete the payment for the publication fees.

<a href="${paymentUrl}" class="button">Proceed to Payment</a>`;
            } else {
                 customMessage += `

Please contact our administrative office to complete the final steps for publication.`;
            }

            customMessage += `

Thank you for choosing Pure Research Insights. We look forward to featuring your work.`;

            await sendEmail({
                to: submission.email,
                subject: `Your Submission is Approved: "${submission.title}"`,
                customMessage,
            });
        }
        
        const updatedDoc = await getDoc(submissionRef);
        const updatedData = updatedDoc.data();
        
        if (!updatedData) {
            throw new Error("Could not retrieve updated submission document.");
        }
        
         const result: Submission = {
            id: updatedDoc.id,
            fullName: updatedData.fullName,
            email: updatedData.email,
            title: updatedData.title,
            targetId: updatedData.targetId,
            submissionType: updatedData.submissionType,
            content: updatedData.content,
            manuscriptData: updatedData.manuscriptData,
            status: updatedData.status,
            submittedAt: updatedData.submittedAt.toDate().toISOString(),
            assignedSubAdminId: updatedData.assignedSubAdminId,
            history: (updatedData.history || []).map((entry: any) => ({
                ...entry,
                submittedAt: entry.submittedAt, // Should already be string
                actionDate: entry.actionDate,   // Should already be string
            })),
        };

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
