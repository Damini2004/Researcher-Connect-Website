// src/components/homepage/partners-section.tsx
import Image from "next/image";

const sponsorLogos = [
    { src: "https://logodix.com/logo/2038481.png", alt: "Sponsor Logo 1", hint: "logo company" },
    { src: "https://logodix.com/logo/1993463.png", alt: "Sponsor Logo 2", hint: "logo brand" },
    { src: "https://logodix.com/logo/1712867.png", alt: "Sponsor Logo 3", hint: "logo business" },
    { src: "https://logodix.com/logo/1101923.png", alt: "Sponsor Logo 4", hint: "logo tech" },
    { src: "https://logodix.com/logo/647339.png", alt: "Sponsor Logo 5", hint: "logo education" },
    { src: "https://logodix.com/logo/1993463.png", alt: "Sponsor Logo 2", hint: "logo brand" },
    { src: "https://logodix.com/logo/1712867.png", alt: "Sponsor Logo 3", hint: "logo business" },
]

export function PartnersSection() {
    return (
        <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Associations &amp; Partners</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to collaborate with leading institutions and organizations in the academic community.
                </p>
              </div>
            </div>
            <div className="relative w-full h-48 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] mt-12">
                <div className="flex flex-col h-max animate-[scroll-y_30s_linear_infinite]">
                    {[...sponsorLogos, ...sponsorLogos].map((logo, index) => (
                        <Image 
                            key={index}
                            src={logo.src} 
                            width={150} 
                            height={60} 
                            alt={logo.alt} 
                            data-ai-hint={logo.hint}
                            className="my-8 h-16 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 mx-auto" 
                        />
                    ))}
                </div>
            </div>
          </div>
        </section>
    );
}
