// src/services/inquiryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, DocumentData, addDoc } from 'firebase/firestore';
import { z } from 'zod';

export interface Enquiry {
  id: string;
  subAdminName: string;
  currentEmail: string;
  requestedEmail: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Denied';
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'New' | 'Read' | 'Archived';
}

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function getPendingEnquiryCount(): Promise<number> {
    try {
        // This is a placeholder for where real enquiries would be stored.
        // As there is no "enquiries" collection yet, this will return 0.
        // To test, you can manually create an 'enquiries' collection in Firestore
        // with documents having a 'status' field set to 'Pending'.
        const q = query(collection(db, "enquiries"), where("status", "==", "Pending"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error fetching pending enquiry count: ", error);
        return 0; // Return 0 on error
    }
}

export async function addInquiry(data: z.infer<typeof inquirySchema>): Promise<{ success: boolean; message: string }> {
    try {
        const validationResult = inquirySchema.safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        await addDoc(collection(db, 'inquiries'), {
            ...validationResult.data,
            status: 'New',
            date: new Date().toISOString(),
        });

        return { success: true, message: 'Inquiry submitted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        console.error("Error adding inquiry:", error);
        return { success: false, message: `Failed to submit inquiry: ${message}` };
    }
}
