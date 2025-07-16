import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award, ShieldCheck } from "lucide-react";

export default function IprServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Intellectual Property Rights Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">Protecting your novel ideas and research is paramount. We offer comprehensive IPR services.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Patent Filing</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>End-to-end assistance with provisional and complete patent applications, both nationally and internationally.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Trademark Registration</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Secure your brand and identity with our expert trademark registration and advisory services.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Copyright Protection</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Ensure your creative and academic works are protected from unauthorized use with formal copyright registration.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
