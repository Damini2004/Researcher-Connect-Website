// src/app/not-found.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/icons";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gray-900 text-white">
      <Image
        src="https://images.unsplash.com/photo-1505761671935-60b3a742750f?q=80&w=1600&auto=format&fit=crop"
        alt="Cityscape background"
        data-ai-hint="cityscape background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#3D4C6F] opacity-80" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <Logo className="h-16 w-16 mb-6" />
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
          Oops! Page Not Found
        </p>
        <h1 className="text-8xl md:text-9xl font-extrabold my-4 tracking-tighter">
          404
        </h1>
        <p className="max-w-md text-gray-200 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg" className="bg-[#FFC107] text-black hover:bg-[#ffca2c] font-bold text-base px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Take Me Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
