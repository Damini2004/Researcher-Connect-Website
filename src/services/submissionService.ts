// src/services/submissionService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, orderBy, query, doc, updateDoc, getDoc, deleteDoc, where, writeBatch } from 'firebase/firestore';
import { z } from 'zod';
import { getConferenceById } from './conferenceService';
import { sendEmail } from './emailService';
import { getPaymentUrl } from './settingsService';
import type { Submission, HistoryEntry } from '@/lib/types';

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
        // Handle re-submission logic
        const originalSubmissionRef = doc(db, 'submissions', resubmissionId);
        const originalSubmissionSnap = await getDoc(originalSubmissionRef);

        if (!originalSubmissionSnap.exists()) {
            return { success: false, message: `Original submission with ID ${resubmissionId} not found.` };
        }

        const originalData = originalSubmissionSnap.data();
        const historyEntry: HistoryEntry = {
            ...originalData,
            status: originalData.status,
            submittedAt: originalData.submittedAt.toDate().toISOString(),
            action: 'Re-submitted',
            actionDate: new Date().toISOString(), // Use ISO string
        };

        const newSubmissionData = {
            ...submissionData,
            status: 'Re-Verification Pending',
            submittedAt: new Date(),
            assignedSubAdminId: originalData.assignedSubAdminId || null,
            history: [...(originalData.history || []), historyEntry],
        };

        const batch = writeBatch(db);
        const newSubmissionRef = doc(collection(db, 'submissions'));
        batch.set(newSubmissionRef, newSubmissionData);
        batch.delete(originalSubmissionRef);
        await batch.commit();

    } else {
        // Handle new submission logic
        let assignedSubAdminId: string | undefined = undefined;
        if (submissionData.submissionType === 'conference') {
            const conferenceResult = await getConferenceById(submissionData.targetId);
            if (conferenceResult.success && conferenceResult.conference?.editorChoice) {
                assignedSubAdminId = conferenceResult.conference.editorChoice;
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
    const history = (data.history || []).map((entry: any) => {
        return {
            ...entry,
            // Ensure any Timestamps in history are converted
            submittedAt: entry.submittedAt?.toDate ? entry.submittedAt.toDate().toISOString() : entry.submittedAt,
            actionDate: entry.actionDate?.toDate ? entry.actionDate.toDate().toISOString() : entry.actionDate,
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
        submittedAt: data.submittedAt.toDate().toISOString(),
        assignedSubAdminId: data.assignedSubAdminId,
        history: history,
    };
};


export async function getSubmissions(options: { subAdminId?: string } = {}): Promise<Submission[]> {
    try {
        const submissionsRef = collection(db, "submissions");
        let submissions: Submission[] = [];

        if (options.subAdminId) {
            const assignedQuery = query(submissionsRef, where("assignedSubAdminId", "==", options.subAdminId));
            const unassignedQuery = query(submissionsRef, where("assignedSubAdminId", "==", null));

            const [assignedSnapshot, unassignedSnapshot] = await Promise.all([
                getDocs(assignedQuery),
                getDocs(unassignedQuery),
            ]);
            
            const submissionsMap = new Map<string, QueryDocumentSnapshot<DocumentData>>();
            assignedSnapshot.forEach(doc => submissionsMap.set(doc.id, doc));
            unassignedSnapshot.forEach(doc => submissionsMap.set(doc.id, doc));

            submissions = Array.from(submissionsMap.values()).map(mapDocToSubmission);

        } else {
            const q = query(submissionsRef, orderBy("submittedAt", "desc"));
            const querySnapshot = await getDocs(q);
            submissions = querySnapshot.docs.map(mapDocToSubmission);
        }
        
        submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        return submissions;

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
                submittedAt: entry.submittedAt?.toDate ? entry.submittedAt.toDate().toISOString() : entry.submittedAt,
                actionDate: entry.actionDate?.toDate ? entry.actionDate.toDate().toISOString() : entry.actionDate,
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
