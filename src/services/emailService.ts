// src/services/emailService.ts
'use server';

import { Resend } from 'resend';
import { AlertEmail } from '@/components/emails/alert-email';
import * as React from 'react';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailParams {
  to: string;
  subject: string;
  submissionTitle: string;
  authorName: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, submissionTitle, authorName } = params;

  if (!resend || !resendApiKey) {
    const errorMessage = 'Resend API key is not configured. Please ensure it is set in your .env file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
  
  if (resendApiKey === 're_12345678_abcdefghijklmnopqrstuvwxyz') {
    const errorMessage = 'Using placeholder Resend API key. Please add your actual key to the .env file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }


  try {
    const { data, error } = await resend.emails.send({
      from: 'Pure Research Insights <onboarding@resend.dev>', // You must verify a domain in Resend to use your own email.
      to: [to],
      subject: subject,
      react: AlertEmail({ authorName, submissionTitle }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      // Resend's error object has `name` and `message` properties.
      const errorMessage = `Failed to send email: ${error.name} - ${error.message}`;
      return { success: false, message: errorMessage };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error in sendEmail service:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
