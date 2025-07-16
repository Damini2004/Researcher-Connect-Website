import LoginForm from "@/components/auth/login-form";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
            <Logo className="h-12 w-12 mb-4" />
            <h1 className="text-3xl font-bold">Welcome to JournalEdge</h1>
            <p className="text-muted-foreground">Sign in to access your dashboard.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
