// src/app/(public)/page.tsx
'use client';

import * as React from 'react';
import { HeroSection } from '@/components/homepage/hero-section';
import { KeyServicesSection } from '@/components/homepage/key-services-section';
import { DetailedServicesSection } from '@/components/homepage/detailed-services-section';
import { PartnersSection } from '@/components/homepage/partners-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="container mx-auto px-4 space-y-24">
        <KeyServicesSection />
        <DetailedServicesSection />
        <PartnersSection />
      </main>
    </>
  );
}
