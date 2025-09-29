
// src/services/subAdminService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, query, where, limit, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { z } from 'zod';

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "pending" | "approved" | "denied";
  joinDate: string; 
  password?: string; // Keep for data model consistency, but won't be used for login
}

const addSubAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  address: z.string().min(5, "Address is required."),
});

const updateSubAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  address: z.string().min(5, "Address is required."),
  status: z.enum(["pending", "approved", "denied"]),
});


type AddSubAdminData = z.infer<typeof addSubAdminSchema>;
type UpdateSubAdminData = z.infer<typeof updateSubAdminSchema>;

type AddSubAdminResult = {
  success: boolean;
  message: string;
}

type UpdateSubAdminResult = {
  success: boolean;
  message: string;
  updatedAdmin?: SubAdmin;
}

export async function addSubAdmin(data: AddSubAdminData): Promise<AddSubAdminResult> {
  try {
    const validationResult = addSubAdminSchema.safeParse(data);
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const { ...subAdminData } = validationResult.data;

    const q = query(collection(db, 'subAdmins'), where('email', '==', subAdminData.email), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { success: false, message: 'A user with this email already exists.' };
    }
    
    await addDoc(collection(db, 'subAdmins'), {
      ...subAdminData,
      status: 'pending',
      joinDate: new Date().toISOString(),
    });
    
    return { success: true, message: 'Sub-admin record created successfully.' };
  } catch (error) {
    console.error("Error adding sub-admin:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add sub-admin: ${errorMessage}` };
  }
}

export async function getSubAdmins(options: { approvedOnly?: boolean } = {}): Promise<SubAdmin[]> {
    try {
        const subAdminsRef = collection(db, "subAdmins");
        let q;

        if (options.approvedOnly) {
            q = query(subAdminsRef, where("status", "==", "approved"));
        } else {
            q = query(subAdminsRef, orderBy("joinDate", "desc"));
        }

        const querySnapshot = await getDocs(q);
        const subAdmins: SubAdmin[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const joinDate = data.joinDate ? new Date(data.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'N/A';
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
        
        // Sort by name client-side if filtering by approved status
        if (options.approvedOnly) {
            subAdmins.sort((a, b) => a.name.localeCompare(b.name));
        }

        return subAdmins;
    } catch (error) {
        console.error("Error fetching sub-admins: ", error);
        return [];
    }
}


export async function getSubAdminByEmail(email: string): Promise<{ success: boolean; message: string; subAdmin?: SubAdmin }> {
  try {
    const q = query(collection(db, 'subAdmins'), where('email', '==', email), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'Sub-admin not found.' };
    }

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    const joinDate = data.joinDate ? new Date(data.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'N/A';

    const subAdmin: SubAdmin = {
      id: docSnap.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: data.status,
      joinDate: joinDate,
    };
    
    return { success: true, message: 'Sub-admin found.', subAdmin };
  } catch (error) {
    console.error("Error fetching sub-admin by email:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to fetch sub-admin: ${errorMessage}` };
  }
}

export async function getSubAdminById(id: string): Promise<{ success: boolean; message: string; subAdmin?: SubAdmin }> {
  try {
    const docRef = doc(db, 'subAdmins', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, message: 'Sub-admin not found.' };
    }

    const data = docSnap.data();
    const joinDate = data.joinDate ? new Date(data.joinDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : 'N/A';

    const subAdmin: SubAdmin = {
      id: docSnap.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: data.status,
      joinDate: joinDate,
    };
    
    return { success: true, message: 'Sub-admin found.', subAdmin };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to fetch sub-admin: ${errorMessage}` };
  }
}

export async function updateSubAdminStatus(id: string, status: 'approved' | 'denied'): Promise<{ success: boolean, message: string }> {
  try {
    if (!id || !status) {
      return { success: false, message: "Invalid arguments provided." };
    }

    const subAdminRef = doc(db, "subAdmins", id);
    await updateDoc(subAdminRef, { status });

    return { success: true, message: `Sub-admin status updated to ${status}.` };
  } catch (error)
   {
    console.error("Error updating sub-admin status:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, message: `Failed to update status: ${errorMessage}` };
  }
}

export async function updateSubAdmin(id: string, data: Partial<UpdateSubAdminData>): Promise<UpdateSubAdminResult> {
  try {
    const validationResult = updateSubAdminSchema.partial().safeParse(data);
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    const subAdminRef = doc(db, 'subAdmins', id);
    const docSnap = await getDoc(subAdminRef);

    if (!docSnap.exists()) {
      return { success: false, message: "Sub-admin not found." };
    }
    
    const currentEmail = docSnap.data().email;
    if (data.email && data.email !== currentEmail) {
        const q = query(collection(db, 'subAdmins'), where('email', '==', data.email), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return { success: false, message: 'Another user with this email already exists.' };
        }
    }

    await updateDoc(subAdminRef, validationResult.data);

    const updatedDocSnap = await getDoc(subAdminRef);
    const updatedData = updatedDocSnap.data();

    if (!updatedData) {
      throw new Error("Could not retrieve updated document.");
    }
    
    const joinDate = updatedData.joinDate ? new Date(updatedData.joinDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : 'N/A';

    return {
      success: true,
      message: "Sub-admin updated successfully.",
      updatedAdmin: {
        id: updatedDocSnap.id,
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        status: updatedData.status,
        joinDate: joinDate,
      },
    };

  } catch (error) {
    console.error("Error updating sub-admin:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to update sub-admin: ${errorMessage}` };
  }
}
