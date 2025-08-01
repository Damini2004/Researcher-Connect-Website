// src/components/emails/alert-email.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface AlertEmailProps {
  authorName: string;
  submissionTitle: string;
}

export const AlertEmail = ({ authorName, submissionTitle }: AlertEmailProps) => (
  <Html>
    <Head />
    <Preview>Update on your submission to Pure Research Insights</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Pure Research Insights</Heading>
        <Text style={text}>Dear {authorName},</Text>
        <Text style={text}>
          This is an update regarding your manuscript submission, "{submissionTitle}".
        </Text>
        <Text style={text}>
          Our editorial team is currently reviewing your submission. We may have some questions or require further information. Please be prepared for follow-up communication from our team.
        </Text>
        <Text style={text}>
          You can check the status of your submission by logging into your account.
        </Text>
        <Section style={buttonContainer}>
            <Link style={button} href="https://pureresearchinsights.com/login">
                Check Submission Status
            </Link>
        </Section>
        <Text style={text}>
          Thank you for your contribution.
        </Text>
        <Text style={text}>
          Best regards,
          <br />
          The Editorial Team
          <br />
          Pure Research Insights
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AlertEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '14px',
  margin: '24px 0',
  lineHeight: '1.5',
  padding: '0 24px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const button = {
  backgroundColor: '#E53935', // red-600
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
};
