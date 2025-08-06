// src/app/api/upload/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('upload') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: { message: 'No file uploaded.' } }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to avoid overwriting
    const filename = `${Date.now()}_${file.name}`;
    
    // Correctly join the path to the public directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const fullPath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file to the public/uploads directory
    await writeFile(fullPath, buffer);

    // Return a relative URL that the browser can resolve
    const relativeUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ uploaded: true, url: relativeUrl });

  } catch (error) {
    console.error('Upload Error:', error);
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
        message = error.message;
    }
    return NextResponse.json({ error: { message: `Something went wrong: ${message}` } }, { status: 500 });
  }
}
