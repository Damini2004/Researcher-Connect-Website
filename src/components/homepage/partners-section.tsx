// src/components/homepage/partners-section.tsx
import Image from "next/image";

export function PartnersSection() {
    return (
        <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Associations &amp; Partners</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to collaborate with leading institutions and organizations in the academic community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-y-12 gap-x-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <Image src="https://logodix.com/logo/2038481.png" width={150} height={60} alt="Partner Logo 1" data-ai-hint="logo company" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1993463.png" width={150} height={60} alt="Partner Logo 2" data-ai-hint="logo brand" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1712867.png" width={150} height={60} alt="Partner Logo 3" data-ai-hint="logo business" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1101923.png" width={150} height={60} alt="Partner Logo 4" data-ai-hint="logo tech" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/647339.png" width={150} height={60} alt="Partner Logo 5" data-ai-hint="logo education" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </div>
          </div>
        </section>
    );
}
