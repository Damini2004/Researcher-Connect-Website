
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    template: '%s | Researcher Connect Innovation & Impact Pvt Ltd',
    default: 'Researcher Connect Innovation & Impact Pvt Ltd',
  },
  description:
    'Researcher Connect Innovation & Impact Pvt Ltd empowers scholars and professionals with complete research support – from thesis writing and publication to conferences, project implementation, and academic success.',
  keywords: [
    "Best publication in Nagpur",
    "Top publication in Nagpur",
    "Leading publication house in Nagpur",
    "Top-rated publication in Nagpur",
    "No.1 publication in Nagpur",
    "Award-winning publication in Nagpur",
    "Most trusted publication in Nagpur",
    "Professional publication services in Nagpur",
    "Top publishing companies in Nagpur",
    "Renowned publication house",
    "Trusted publisher in Nagpur",
    "Professional publishing support",
    "Affordable publishing solutions",
    "SEO for research publications",
    "research publication ranking",
    "academic publishing services",
  ],
  alternates: {
    canonical: 'https://researcherconnect.com',
  },
  openGraph: {
    title: 'Researcher Connect Innovation & Impact Pvt Ltd',
    description:
      'Researcher Connect Innovation & Impact Pvt Ltd empowers scholars and professionals with complete research support – from thesis writing and publication to conferences, project implementation, and academic success.',
    url: 'https://researcherconnect.com',
    siteName: 'Researcher Connect Innovation & Impact Pvt Ltd',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Researcher Connect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Researcher Connect Innovation & Impact Pvt Ltd',
    description:
      'Researcher Connect Innovation & Impact Pvt Ltd empowers scholars and professionals with complete research support – from thesis writing and publication to conferences, project implementation, and academic success.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
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
        {/* Google Fonts Preconnect and Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
         {/* Zoho SalesIQ Script */}
        <Script id="zoho-init" strategy="lazyOnload">
            {`
            window.$zoho = window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || { ready: function(){} };
            `}
        </Script>
        <Script
            id="zoho-widget"
            strategy="lazyOnload"
            src="https://salesiq.zohopublic.in/widget?wc=siq4436c8aa6872c023cdf8463d73d9c039b2078ef2282c1899f64e36fef57cf282"
        />
      </body>
    </html>
  );
}
