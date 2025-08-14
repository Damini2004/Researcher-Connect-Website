
// src/services/enquiryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, DocumentData, addDoc, serverTimestamp, orderBy, QueryDocumentSnapshot, doc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';
import { getSubAdminById, updateSubAdmin } from './subAdminService';

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

export async function processEnquiry(enquiryId: string, action: 'approve' | 'deny'): Promise<{ success: boolean; message: string }> {
    try {
        const enquiryRef = doc(db, 'enquiries', enquiryId);
        const enquirySnap = await getDoc(enquiryRef);
        if (!enquirySnap.exists()) {
            return { success: false, message: "Enquiry not found." };
        }
        
        const enquiryData = enquirySnap.data() as Omit<Enquiry, 'id' | 'requestDate'>;

        if (action === 'approve') {
            const adminResult = await getSubAdminById(enquiryData.subAdminId);
            if (!adminResult.success || !adminResult.subAdmin) {
                return { success: false, message: "Could not find the associated sub-admin to update." };
            }

            // Prepare update data for the sub-admin
            const subAdminUpdateData = {
                ...adminResult.subAdmin, //
                name: enquiryData.requestedName,
                email: enquiryData.requestedEmail,
            };
            delete subAdminUpdateData.id; 
            delete subAdminUpdateData.joinDate; 

            // Update the sub-admin's profile
            const updateResult = await updateSubAdmin(enquiryData.subAdminId, subAdminUpdateData);
            if (!updateResult.success) {
                return { success: false, message: `Failed to update sub-admin profile: ${updateResult.message}` };
            }

            // Update the enquiry status
            await updateDoc(enquiryRef, { status: 'Approved' });

        } else { // Deny action
            await updateDoc(enquiryRef, { status: 'Denied' });
        }
        
        return { success: true, message: `Request has been successfully ${action === 'approve' ? 'approved' : 'denied'}.` };

    } catch (error) {
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { success: false, message };
    }
}
