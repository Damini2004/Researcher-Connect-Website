// src/services/emailService.ts
'use server';

import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_SERVER_USER;
const emailPass = process.env.EMAIL_SERVER_PASSWORD;
const emailHost = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
const emailPort = process.env.EMAIL_SERVER_PORT || 587;

interface EmailParams {
  to: string;
  subject: string;
  submissionTitle: string;
  authorName: string;
}

// A simple HTML email template
const createHtmlTemplate = (authorName: string, submissionTitle: string): string => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #333;">Pure Research Insights</h2>
      <p>Dear ${authorName},</p>
      <p>This is an update regarding your manuscript submission, "<strong>${submissionTitle}</strong>".</p>
      <p>Our editorial team is currently reviewing your submission. We may have some questions or require further information. Please be prepared for follow-up communication from our team.</p>
      <p>You can check the status of your submission by logging into your account.</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://pureresearchinsights.com/login" style="background-color: #E53935; color: white; padding: 12px 20px; text-decoration: none; border-radius: 3px;">
          Check Submission Status
        </a>
      </div>
      <p>Thank you for your contribution.</p>
      <p>Best regards,<br/>The Editorial Team<br/>Pure Research Insights</p>
    </div>
  </div>
`;


export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, submissionTitle, authorName } = params;

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

  try {
    const info = await transporter.sendMail({
      from: `"Pure Research Insights" <${emailUser}>`,
      to: to,
      subject: subject,
      html: createHtmlTemplate(authorName, submissionTitle),
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, message: 'Email sent successfully!' };

  } catch (error: unknown) {
    console.error('Nodemailer Error:', error);
    
    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
        // Nodemailer provides detailed error messages
        message = error.message;
    } else if (typeof error === 'object' && error !== null) {
        message = JSON.stringify(error);
    }
    
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
