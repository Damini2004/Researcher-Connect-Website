
// src/services/enquiryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, DocumentData, addDoc, serverTimestamp, orderBy, QueryDocumentSnapshot } from 'firebase/firestore';
import { z } from 'zod';

export interface Enquiry {
  id: string;
  subAdminName: string;
  subAdminId: string;
  currentEmail: string;
  requestedName: string;
  requestedEmail: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Denied';
}

const enquirySchema = z.object({
    subAdminId: z.string(),
    subAdminName: z.string(),
    currentEmail: z.string().email(),
    requestedName: z.string().min(2, "Full name must be at least 2 characters."),
    requestedEmail: z.string().email("Please enter a valid email address."),
});


export async function createEnquiry(data: z.infer<typeof enquirySchema>): Promise<{ success: boolean; message: string }> {
    try {
        const validation = enquirySchema.safeParse(data);
        if (!validation.success) {
            return { success: false, message: validation.error.errors[0].message };
        }

        await addDoc(collection(db, "enquiries"), {
            ...validation.data,
            status: "Pending",
            requestDate: serverTimestamp(),
        });
        
        return { success: true, message: "Your request has been submitted for approval." };

    } catch (error) {
        console.error("Error creating enquiry:", error);
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { success: false, message: `Failed to submit request: ${message}` };
    }
}


export async function getEnquiries(): Promise<Enquiry[]> {
    try {
        const q = query(collection(db, "enquiries"), orderBy("requestDate", "desc"));
        const querySnapshot = await getDocs(q);
        const enquiries: Enquiry[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            enquiries.push({
                id: doc.id,
                subAdminName: data.subAdminName,
                subAdminId: data.subAdminId,
                currentEmail: data.currentEmail,
                requestedName: data.requestedName,
                requestedEmail: data.requestedEmail,
                status: data.status,
                requestDate: data.requestDate?.toDate().toLocaleDateString() || new Date().toLocaleDateString(),
            });
        });
        return enquiries;
    } catch (error) {
        console.error("Error fetching enquiries: ", error);
        return [];
    }
}


export async function getPendingEnquiryCount(): Promise<number> {
    try {
        const q = query(collection(db, "enquiries"), where("status", "==", "Pending"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error fetching pending enquiry count: ", error);
        return 0; // Return 0 on error
    }
}
