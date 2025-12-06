
// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { type AddConferenceData, type Conference, conferenceSchema } from '@/lib/types';
import { z } from 'zod';

interface AddConferencePayload extends AddConferenceData {
    conferenceLogo: string; // Base64 string for the logo
    paperTemplateUrl?: string; // Base64 string for the brochure
}


export async function addConference(data: AddConferencePayload): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = conferenceSchema.safeParse(data);
    if (!validationResult.success) {
        console.error("Zod validation failed:", validationResult.error.errors);
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
    }

    const validatedData = validationResult.data;
    
    const dataToSave: { [key: string]: any } = {
      ...validatedData,
      imageSrc: data.conferenceLogo,
      paperTemplateUrl: data.paperTemplateUrl,
      createdAt: serverTimestamp(), // store Firestore timestamp
      // convert provided Date objects to Firestore Timestamp if they exist
      startDate: validatedData.startDate ? Timestamp.fromDate(validatedData.startDate) : null,
      endDate: validatedData.endDate ? Timestamp.fromDate(validatedData.endDate) : null,
      submissionStartDate: validatedData.submissionStartDate ? Timestamp.fromDate(validatedData.submissionStartDate) : null,
      submissionEndDate: validatedData.submissionEndDate ? Timestamp.fromDate(validatedData.submissionEndDate) : null,
      fullPaperSubmissionDeadline: validatedData.fullPaperSubmissionDeadline ? Timestamp.fromDate(validatedData.fullPaperSubmissionDeadline) : null,
      registrationDeadline: validatedData.registrationDeadline ? Timestamp.fromDate(validatedData.registrationDeadline) : null,
    };
    
    // Remove the original file objects to avoid storing them
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

const mapDocToConference = (docSnap: any): Conference => {
  // Support either a Firestore snapshot (has .data()) or a plain object
  const data = (typeof docSnap?.data === 'function') ? docSnap.data() : (docSnap || {});
  const id = docSnap?.id ?? data?.id ?? 'unknown-id';

  // Robust date parsing: handles Firestore Timestamp, ISO strings, Date objects
  const getJSDate = (field: any): Date | null => {
    if (!field) return null;
    // Firestore Timestamp check
    if (field?.toDate && typeof field.toDate === 'function') {
      return field.toDate();
    }
    // JavaScript Date object
    if (field instanceof Date) return field;
     // ISO string
    if (typeof field === 'string') {
      const d = new Date(field);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  };

  const startDate = getJSDate(data.startDate) || null;
  const endDate = getJSDate(data.endDate) || null;
  const submissionStartDate = getJSDate(data.submissionStartDate) || null;
  const submissionEndDate = getJSDate(data.submissionEndDate) || null;
  const fullPaperSubmissionDeadline = getJSDate(data.fullPaperSubmissionDeadline);
  const registrationDeadline = getJSDate(data.registrationDeadline);
  const createdAt = getJSDate(data.createdAt) || new Date();

  // Build dateRange only if startDate exists
  let dateRange = startDate ? format(startDate, "PPP") : "Date not set";
  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    dateRange = `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
  }

  const location = data.country || data.venueAddress || "Online";

  return {
    id,
    title: data.title || "N/A",
    shortTitle: data.shortTitle || "N/A",
    tagline: data.tagline,
    status: data.status || 'active',
    date: dateRange,
    startDate: startDate ? startDate.toISOString() : null,
    endDate: endDate ? endDate.toISOString() : null,
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
    submissionStartDate: submissionStartDate ? submissionStartDate.toISOString() : null,
    submissionEndDate: submissionEndDate ? submissionEndDate.toISOString() : null,
    fullPaperSubmissionDeadline: fullPaperSubmissionDeadline?.toISOString() ?? null,
    registrationDeadline: registrationDeadline?.toISOString() ?? null,
    paperCategories: data.paperCategories || [],
    peerReviewMethod: data.peerReviewMethod,
    registrationFees: data.registrationFees,
    accommodationDetails: data.accommodationDetails,
    faqs: data.faqs,
    editorChoice: data.editorChoice,
    createdAt: createdAt.toISOString(),
    dateObject: startDate ?? undefined,
    location,
    // Deprecated fields, mapped for backward compatibility
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
};

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
            updatedAt: serverTimestamp(),
        };

        if (data.imageSrc) {
            dataToSave.imageSrc = data.imageSrc;
        }

        if (data.paperTemplateUrl) {
            dataToSave.paperTemplateUrl = data.paperTemplateUrl;
        }
        
        // Convert dates to Firestore Timestamps before saving
        if(validatedData.startDate) dataToSave.startDate = Timestamp.fromDate(validatedData.startDate);
        if(validatedData.endDate) dataToSave.endDate = Timestamp.fromDate(validatedData.endDate);
        if(validatedData.submissionStartDate) dataToSave.submissionStartDate = Timestamp.fromDate(validatedData.submissionStartDate);
        if(validatedData.submissionEndDate) dataToSave.submissionEndDate = Timestamp.fromDate(validatedData.submissionEndDate);
        if(validatedData.fullPaperSubmissionDeadline) dataToSave.fullPaperSubmissionDeadline = Timestamp.fromDate(validatedData.fullPaperSubmissionDeadline);
        if(validatedData.registrationDeadline) dataToSave.registrationDeadline = Timestamp.fromDate(validatedData.registrationDeadline);


        delete (dataToSave as any).conferenceLogo;

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
