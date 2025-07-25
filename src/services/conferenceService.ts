// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';
import { type AddConferenceData, type Conference, conferenceSchema } from '@/lib/types';

export async function addConference(data: AddConferenceData & { bannerImage: string }): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = conferenceSchema.safeParse(data);
    if (!validationResult.success) {
        return { success: false, message: validationResult.error.errors[0].message };
    }

    const dataToSave = {
        ...validationResult.data,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        submissionDeadline: format(data.submissionDeadline, "yyyy-MM-dd"),
        registrationDeadline: format(data.registrationDeadline, "yyyy-MM-dd"),
        bannerImage: data.bannerImage, // Ensure the base64 string is saved
        createdAt: new Date(),
    };

    await addDoc(collection(db, 'conferences'), dataToSave);
    
    return { 
        success: true, 
        message: 'Conference added successfully!',
    };
  } catch (error) {
    console.error("Error adding conference:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add conference: ${message}` };
  }
}

export async function getConferences(): Promise<Conference[]> {
    try {
        const q = query(collection(db, "conferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const conferences: Conference[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const dateString = data.startDate; 

            const parts = dateString.split('-').map((part: string) => parseInt(part, 10));
            const dateObject = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));

            let location = "Online";
            if (data.locationType === "Offline") {
                location = data.venueAddress;
            } else if (data.locationType === "Hybrid") {
                location = `${data.venueAddress} / Online`;
            }

            conferences.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                date: format(dateObject, "PPP"), 
                dateObject: dateObject,
                location: location,
                imageSrc: data.bannerImage,
                createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            });
        });
        return conferences;
    } catch (error) {
        console.error("Error fetching conferences from service: ", error);
        throw error;
    }
}

export async function deleteConference(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Conference ID is required.' };
        }
        await deleteDoc(doc(db, 'conferences', id));
        return { success: true, message: 'Conference deleted successfully.' };
    } catch (error) {
        console.error("Error deleting conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete conference: ${message}` };
    }
}
