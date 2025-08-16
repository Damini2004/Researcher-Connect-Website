// src/services/emailService.ts
'use server';

import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';

const emailUser = process.env.EMAIL_SERVER_USER;
const emailPass = process.env.EMAIL_SERVER_PASSWORD;
const emailHost = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
const emailPort = process.env.EMAIL_SERVER_PORT || 587;

interface EmailParams {
  to: string;
  subject: string;
  customMessage: string;
  attachment?: {
    filename: string;
    content: string; // Base64 encoded string
  };
}

const createHtmlTemplate = (customMessage: string): string => {
  // Simple template that just preserves line breaks.
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div>${customMessage.replace(/\n/g, '<br>')}</div>
  </body>
  </html>
`;
};


export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, customMessage, attachment } = params;

  if (!emailUser || !emailPass) {
    const errorMessage = 'Email credentials are not configured. Please ensure EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD are set in your .env.local file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    secure: Number(emailPort) === 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const attachments: Attachment[] = [];
  if (attachment) {
    attachments.push({
      filename: attachment.filename,
      path: attachment.content, // Nodemailer can handle data URI directly
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Researcher Connect" <${emailUser}>`,
      to: to,
      subject: subject,
      html: createHtmlTemplate(customMessage),
      attachments: attachments,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, message: 'Email sent successfully!' };

  } catch (error: unknown) {
    console.error('Nodemailer Error:', error);
    
    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'object' && error !== null) {
        message = JSON.stringify(error);
    }
    
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
