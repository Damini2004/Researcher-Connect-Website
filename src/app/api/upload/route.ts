// src/app/api/upload/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('upload') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: { message: 'No file uploaded.' } }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to avoid overwriting in Firebase Storage
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `uploads/${filename}`);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Get the public URL for the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Return the URL in the format CKEditor expects
    return NextResponse.json({ uploaded: true, url: downloadURL });

  } catch (error) {
    console.error('Firebase Upload Error:', error);
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
        message = error.message;
    }
    return NextResponse.json({ error: { message: `Something went wrong: ${message}` } }, { status: 500 });
  }
}
