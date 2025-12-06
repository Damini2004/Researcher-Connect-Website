
// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { type AddConferenceData, type Conference, conferenceSchema } from '@/lib/types';
import { z } from 'zod';

interface AddConferencePayload extends AddConferenceData {
    conferenceLogo: string;
    paperTemplateUrl?: string; // Can be a base64 string
}

export async function addConference(data: AddConferencePayload): Promise<{ success: boolean; message: string; }> {
  try {
    const schemaForService = conferenceSchema.extend({
        conferenceLogo: z.string(),
        paperTemplateUrl: z.string().optional(),
    });
    
    const validationResult = schemaForService.safeParse(data);
    if (!validationResult.success) {
        console.error("Zod validation failed:", validationResult.error.errors);
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
    }

    const validatedData = validationResult.data;
    
    const dataToSave: { [key: string]: any } = {
        ...validatedData,
        status: validatedData.status,
        imageSrc: data.conferenceLogo,
        paperTemplateUrl: data.paperTemplateUrl,
        createdAt: new Date(),
        // Ensure all dates are standard JS Date objects before sending to Firestore
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        submissionStartDate: new Date(validatedData.submissionStartDate),
        submissionEndDate: new Date(validatedData.submissionEndDate),
        fullPaperSubmissionDeadline: validatedData.fullPaperSubmissionDeadline ? new Date(validatedData.fullPaperSubmissionDeadline) : null,
        registrationDeadline: validatedData.registrationDeadline ? new Date(validatedData.registrationDeadline) : null,
    };
    
    delete dataToSave.conferenceLogo;

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

const mapDocToConference = (docSnap: QueryDocumentSnapshot<DocumentData> | DocumentData): Conference => {
    const data = docSnap.data();

    // A more robust date parsing function
    const getJSDate = (field: any): Date | undefined => {
        if (!field) return undefined;
        // Handle Firestore Timestamp
        if (typeof field.toDate === 'function') {
            return field.toDate();
        }
        // Handle ISO string or other date-like strings
        if (typeof field === 'string') {
            const date = new Date(field);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        // Handle JavaScript Date object
        if (field instanceof Date) {
            return field;
        }
        return undefined; // Return undefined if format is unknown
    };

    const startDate = getJSDate(data.startDate) || new Date();
    const endDate = getJSDate(data.endDate) || new Date();

    let dateRange = format(startDate, "PPP");
    if (startDate.getTime() !== endDate.getTime()) {
        dateRange = `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
    }

    const location = data.country || data.venueAddress || "Online";

    return {
        id: docSnap.id,
        title: data.title || "N/A",
        shortTitle: data.shortTitle || "N/A",
        tagline: data.tagline,
        status: data.status || 'active',
        date: dateRange,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        venueName: data.venueName,
        country: data.country,
        modeOfConference: data.modeOfConference || [],
        aboutConference: data.aboutConference,
        conferenceWebsite: data.conferenceWebsite,
        imageSrc: data.imageSrc,
        conferenceEmail: data.conferenceEmail,
        organizingCommittee: data.organizingCommittee,
        keynoteSpeakers: data.keynoteSpeakers,
        editorialBoard: data.editorialBoard,
        teamBios: data.teamBios,
        tracks: data.tracks,
        keywords: data.keywords,
        submissionInstructions: data.submissionInstructions,
        paperTemplateUrl: data.paperTemplateUrl,
        submissionStartDate: (getJSDate(data.submissionStartDate) || new Date()).toISOString(),
        submissionEndDate: (getJSDate(data.submissionEndDate) || new Date()).toISOString(),
        fullPaperSubmissionDeadline: getJSDate(data.fullPaperSubmissionDeadline)?.toISOString(),
        registrationDeadline: getJSDate(data.registrationDeadline)?.toISOString(),
        paperCategories: data.paperCategories || [],
        peerReviewMethod: data.peerReviewMethod,
        registrationFees: data.registrationFees,
        accommodationDetails: data.accommodationDetails,
        faqs: data.faqs,
        editorChoice: data.editorChoice,
        createdAt: (getJSDate(data.createdAt) || new Date()).toISOString(),
        dateObject: startDate,
        location,
        // Deprecated fields, kept for compatibility with old data if needed
        description: data.description || data.aboutConference || "",
        fullDescription: data.fullDescription || "",
        venueAddress: data.venueAddress || "",
        conferenceType: data.conferenceType || "",
        organizerName: data.organizerName || "",
        organizerEmail: data.organizerEmail || "",
        organizerPhone: data.organizerPhone || "",
        submissionDeadline: "N/A",
        locationType: data.locationType || "Offline",
        audienceType: data.audienceType || "",
        callForPapers: data.callForPapers || false,
        enableAbstractSubmission: data.enableAbstractSubmission || false,
        enableFullPaperSubmission: data.enableFullPaperSubmission || false,
    };
}

export async function getConferences(options: { activeOnly?: boolean } = {}): Promise<Conference[]> {
    try {
        const q = query(collection(db, "conferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        let conferences = querySnapshot.docs.map(mapDocToConference);

        if (options.activeOnly) {
            conferences = conferences.filter(c => c.status === 'active');
        }

        return conferences;
    } catch (error) {
        console.error("Error fetching conferences from service: ", error);
        throw error;
    }
}

export async function getConferenceById(id: string): Promise<{ success: boolean; message: string; conference?: Conference }> {
    try {
        if (!id) {
            return { success: false, message: 'Conference ID is required.' };
        }
        const docRef = doc(db, 'conferences', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { success: false, message: 'Conference not found.' };
        }
        
        const conference = mapDocToConference(docSnap);

        return { success: true, message: 'Conference fetched successfully.', conference };

    } catch (error) {
        console.error("Error fetching conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to fetch conference: ${message}` };
    }
}

export async function updateConference(id: string, data: Partial<AddConferenceData> & { imageSrc?: string, paperTemplateUrl?: string }): Promise<{ success: boolean; message: string }> {
    try {
        const validationResult = conferenceSchema.partial().safeParse(data);
        if (!validationResult.success) {
            console.error("Zod validation failed on update:", validationResult.error.errors);
            const firstError = validationResult.error.errors[0];
            return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
        }
        
        const validatedData = validationResult.data;
        const dataToSave: { [key: string]: any } = {
            ...validatedData,
            updatedAt: new Date(),
        };

        if (data.imageSrc) {
            dataToSave.imageSrc = data.imageSrc;
        }

        if (data.paperTemplateUrl) {
            dataToSave.paperTemplateUrl = data.paperTemplateUrl;
        }
        
        // Ensure dates are correctly formatted
        if(validatedData.startDate) dataToSave.startDate = new Date(validatedData.startDate);
        if(validatedData.endDate) dataToSave.endDate = new Date(validatedData.endDate);
        if(validatedData.submissionStartDate) dataToSave.submissionStartDate = new Date(validatedData.submissionStartDate);
        if(validatedData.submissionEndDate) dataToSave.submissionEndDate = new Date(validatedData.submissionEndDate);
        if(validatedData.fullPaperSubmissionDeadline) dataToSave.fullPaperSubmissionDeadline = new Date(validatedData.fullPaperSubmissionDeadline);
        if(validatedData.registrationDeadline) dataToSave.registrationDeadline = new Date(validatedData.registrationDeadline);


        delete dataToSave.conferenceLogo;

        const conferenceRef = doc(db, 'conferences', id);
        await updateDoc(conferenceRef, dataToSave);

        return { success: true, message: 'Conference updated successfully!' };
    } catch (error) {
        console.error("Error updating conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update conference: ${message}` };
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


export async function updateConferenceStatus(id: string, status: 'active' | 'inactive'): Promise<{ success: boolean; message: string }> {
  try {
    const conferenceRef = doc(db, "conferences", id);
    await updateDoc(conferenceRef, { status });
    return { success: true, message: "Conference status updated." };
  } catch (error) {
    console.error("Error updating conference status:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to update status: ${message}` };
  }
}

    
