
// src/services/inquiryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, DocumentData, addDoc, orderBy, QueryDocumentSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import { updateSubAdmin } from './subAdminService';

export interface Enquiry {
  id: string;
  subAdminId: string;
  subAdminName: string;
  currentEmail: string;
  requestedName: string;
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
    type: string; // e.g., 'General Inquiry', 'Internship Application'
    details?: string; // e.g., Internship Name
    phone?: string;
    city?: string;
    university?: string;
    degree?: string;
    resumeData?: string;
}

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters."),
  type: z.string().default('General Inquiry'),
  details: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  university: z.string().optional(),
  degree: z.string().optional(),
  resumeData: z.string().optional(),
});

export async function getPendingEnquiryCount(): Promise<number> {
    try {
        const q = query(collection(db, "enquiries"), where("status", "==", "Pending"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error fetching pending enquiry count: ", error);
        return 0;
    }
}

export async function addInquiry(data: z.infer<typeof inquirySchema>): Promise<{ success: boolean; message: string }> {
    try {
        const validationResult = inquirySchema.safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        const dataToSave = validationResult.data;
        if ((dataToSave.type === 'Internship Application' || dataToSave.type === 'Webinar Registration') && !dataToSave.subject) {
            dataToSave.subject = `${dataToSave.type}: ${dataToSave.details || 'N/A'}`;
        }
        
        if (!dataToSave.subject && dataToSave.type === 'General Inquiry') {
            return { success: false, message: "Subject is required for this type of inquiry." };
        }


        await addDoc(collection(db, 'inquiries'), {
            ...dataToSave,
            status: 'New',
            date: new Date(),
        });

        return { success: true, message: 'Inquiry submitted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        console.error("Error adding inquiry:", error);
        return { success: false, message: `Failed to submit inquiry: ${message}` };
    }
}

export async function getInquiries(): Promise<Inquiry[]> {
    try {
        const q = query(collection(db, 'inquiries'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const inquiries: Inquiry[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            inquiries.push({
                id: doc.id,
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
                status: data.status,
                type: data.type || 'General Inquiry',
                details: data.details,
                date: data.date.toDate().toISOString(),
                phone: data.phone,
                city: data.city,
                university: data.university,
                degree: data.degree,
                resumeData: data.resumeData,
            });
        });
        return inquiries;
    } catch (error) {
        console.error("Error fetching inquiries: ", error);
        return [];
    }
}


export async function updateInquiryStatus(id: string, status: 'Read' | 'Archived'): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Inquiry ID is required.' };
        }
        const inquiryRef = doc(db, 'inquiries', id);
        await updateDoc(inquiryRef, { status });
        return { success: true, message: 'Inquiry status updated successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update status: ${message}` };
    }
}

export async function deleteInquiry(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Inquiry ID is required.' };
        }
        await deleteDoc(doc(db, 'inquiries', id));
        return { success: true, message: 'Inquiry deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete inquiry: ${message}` };
    }
}
