
// src/services/subAdminService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, query, where, limit, orderBy, doc, getDoc } from 'firebase/firestore';
import { z } from 'zod';

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "pending" | "approved" | "denied";
  joinDate: string; 
  password?: string; // Should be handled securely, only present for creation
}

const addSubAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  address: z.string().min(5, "Address is required."),
});

type AddSubAdminResult = {
  success: boolean;
  message: string;
  newAdmin?: SubAdmin;
}

export async function addSubAdmin(data: z.infer<typeof addSubAdminSchema>): Promise<AddSubAdminResult> {
  try {
    const validationResult = addSubAdminSchema.safeParse(data);
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const { ...subAdminData } = validationResult.data;

    // Check if email already exists
    const q = query(collection(db, 'subAdmins'), where('email', '==', subAdminData.email), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { success: false, message: 'A user with this email already exists.' };
    }
    
    const joinDate = new Date();

    // Don't store the password directly in a real app. This is for prototype purposes.
    const docRef = await addDoc(collection(db, 'subAdmins'), {
      ...subAdminData,
      status: 'pending',
      joinDate: joinDate.toISOString(),
    });
    
    const newAdmin: SubAdmin = {
        id: docRef.id,
        ...subAdminData,
        status: 'pending',
        joinDate: joinDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
    };

    return { success: true, message: 'Sub-admin added successfully.', newAdmin };
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
                phone: data.phone,
                address: data.address,
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

export async function verifySubAdminCredentials(email: string, password_provided: string): Promise<{ success: boolean; message: string }> {
  try {
    const q = query(collection(db, 'subAdmins'), where('email', '==', email), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const subAdminDoc = querySnapshot.docs[0];
    const subAdminData = subAdminDoc.data() as SubAdmin;

    if (subAdminData.status !== 'approved') {
        return { success: false, message: 'Your account is not approved yet. Please contact the super admin.' };
    }
    
    // In a real app, use a secure hashing library like bcrypt to compare passwords.
    // For this prototype, we're comparing plaintext.
    if (subAdminData.password !== password_provided) {
      return { success: false, message: 'Invalid email or password.' };
    }

    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error("Error verifying sub-admin credentials:", error);
    return { success: false, message: 'An unexpected error occurred during login.' };
  }
}
