import LoginForm from "@/components/auth/login-form";
import { Logo } from "@/components/icons";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
       <Image
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop"
        alt="Business meeting"
        data-ai-hint="business meeting"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
