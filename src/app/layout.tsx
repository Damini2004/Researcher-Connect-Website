import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Researcher Connect',
    default: 'Researcher Connect',
  },
  description: 'The leading platform for academic journal submissions, conference management, and research support services.',
  openGraph: {
    title: 'Researcher Connect',
    description: 'The leading platform for academic journal submissions, conference management, and research support services.',
    url: 'https://researcherconnect.com', // Replace with your actual domain
    siteName: 'Researcher Connect',
    images: [
      {
        url: '/og-image.png', // It's a good practice to have a default social sharing image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Researcher Connect',
    description: 'The leading platform for academic journal submissions, conference management, and research support services.',
    images: ['/og-image.png'], // Replace with your actual domain and image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
