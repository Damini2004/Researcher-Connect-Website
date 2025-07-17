// src/services/subAdminService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, query, orderBy } from 'firebase/firestore';
import { z } from 'zod';

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "denied";
  joinDate: string; // Storing as ISO string
}

const addSubAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("A valid email is required."),
});

export async function addSubAdmin(data: { name: string, email: string }): Promise<{ success: boolean; message: string }> {
  try {
    const validationResult = addSubAdminSchema.safeParse(data);
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    await addDoc(collection(db, 'subAdmins'), {
      name: data.name,
      email: data.email,
      status: 'pending',
      joinDate: new Date().toISOString(),
    });

    return { success: true, message: 'Sub-admin added successfully.' };
  } catch (error) {
    console.error("Error adding sub-admin:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add sub-admin: ${errorMessage}` };
  }
}

export async function getSubAdmins(): Promise<SubAdmin[]> {
    try {
        const q = query(collection(db, "subAdmins"), orderBy("joinDate", "desc"));
        const querySnapshot = await getDocs(q);
        const subAdmins: SubAdmin[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const joinDate = new Date(data.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            subAdmins.push({
                id: doc.id,
                name: data.name,
                email: data.email,
                status: data.status,
                joinDate: joinDate,
            });
        });
        return subAdmins;
    } catch (error) {
        console.error("Error fetching sub-admins: ", error);
        return [];
    }
}
