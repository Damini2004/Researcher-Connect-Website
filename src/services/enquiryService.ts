// src/services/enquiryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface Enquiry {
  id: string;
  subAdminName: string;
  currentEmail: string;
  requestedEmail: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Denied';
}


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
