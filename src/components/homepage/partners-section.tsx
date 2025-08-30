// src/components/homepage/partners-section.tsx
import Image from "next/image";

const sponsorLogos = [
  { src: "/army institute.png", alt: "army institute", hint: "logo company" },
  { src: "/Bharti vidyapith.png", alt: "Bharti vidyapith", hint: "logo company" },
  { src: "/city university punjab.jpeg", alt: "city university punjab", hint: "logo company" },
  { src: "/csmss.jpeg", alt: "csmss", hint: "logo company" },
  { src: "/data meghe wardha.png", alt: "data meghe wardha", hint: "logo company" },
  { src: "/deogiri aurangabad.jpeg", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/dypatil.jpeg", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/iiit.jpeg", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/kkr guntur.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/krishana.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/lovely university.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/Mahsa Malaysiaya.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/manipal.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/modern institute.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/nitwarangal.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/noida.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/Nus.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/priyadarshani.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/ramdeobaba.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/rl jalapa.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/sanjevini kopargoa.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/ssvps.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/priyadarshani.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/suryodaya.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/syboisis.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/sanjevini kopargoa.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/vincentpalloti.jpeg", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/Vnit.jpeg", alt: "Partner Logo 5", hint: "logo education" },
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
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] mt-12">
                <div className="flex w-max animate-[scroll-x_30s_linear_infinite]">
                    {[...sponsorLogos, ...sponsorLogos].map((logo, index) => (
                         <Image 
                            key={index}
                            src={logo.src} 
                            width={150} 
                            height={60} 
                            alt={logo.alt} 
                            data-ai-hint={logo.hint}
                            className="mx-8 h-16 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" 
                        />
                    ))}
                </div>
            </div>
          </div>
        </section>
    );
}
