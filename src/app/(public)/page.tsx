'use client';

import * as React from 'react';
import Script from 'next/script'; // ✅ import next/script
import { HeroSection } from '@/components/homepage/hero-section';
import { KeyServicesSection } from '@/components/homepage/key-services-section';
import { DetailedServicesSection } from '@/components/homepage/detailed-services-section';
import { PartnersSection } from '@/components/homepage/partners-section';

export default function HomePage() {
  return (
    <>
      {/* ✅ Zoho SalesIQ Script */}
      <Script id="zoho-init" strategy="afterInteractive">
        {`
          window.$zoho = window.$zoho || {};
          $zoho.salesiq = $zoho.salesiq || { ready: function(){} };
        `}
      </Script>

      <Script
        id="zoho-widget"
        strategy="afterInteractive"
        src="https://salesiq.zohopublic.in/widget?wc=siq4436c8aa6872c023cdf8463d73d9c039b2078ef2282c1899f64e36fef57cf282"
        defer
      />

      <HeroSection />
      <main className="container mx-auto px-4 space-y-24">
        <KeyServicesSection />
        <DetailedServicesSection />
        <PartnersSection />
      </main>
    </>
  );
}
