// src/app/(public)/page.tsx
'use client';
import * as React from 'react';
import { HeroSection } from '@/components/homepage/hero-section';
import { FeaturesSection } from '@/components/homepage/features-section';
import { KeyServicesSection } from '@/components/homepage/key-services-section';
import { ThingsYouGetSection } from '@/components/homepage/things-you-get-section';
import { DetailedServicesSection } from '@/components/homepage/detailed-services-section';
import { WhyChooseUsSection } from '@/components/homepage/why-choose-us-section';
import { ContactBannerSection } from '@/components/homepage/contact-banner-section';
import { HighlightsSection } from '@/components/homepage/highlights-section';
import { PartnersSection } from '@/components/homepage/partners-section';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AnimatedSection><FeaturesSection /></AnimatedSection>
      <AnimatedSection><KeyServicesSection /></AnimatedSection>
      <AnimatedSection><ThingsYouGetSection /></AnimatedSection>
      <AnimatedSection><DetailedServicesSection /></AnimatedSection>
      <AnimatedSection><WhyChooseUsSection /></AnimatedSection>
      <AnimatedSection><ContactBannerSection /></AnimatedSection>
      <AnimatedSection><HighlightsSection /></AnimatedSection>
      <AnimatedSection><PartnersSection /></AnimatedSection>
    </div>
  );
}
