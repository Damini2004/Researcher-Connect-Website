import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InternshipPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Internship Opportunities</h1>
        <p className="mt-4 text-lg text-muted-foreground">Gain hands-on experience in the world of academic publishing and research.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Editorial Assistant Intern</CardTitle>
            <CardDescription>Remote | 3 Months</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Assist our editorial teams with manuscript processing, peer-review coordination, and author communication. A great opportunity for those interested in the mechanics of academic publishing.</p>
            <Button variant="outline">Learn More</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI in Research Intern</CardTitle>
            <CardDescription>Remote | 6 Months</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Work with our technology team to improve and expand our AI-driven tools. Requires a background in machine learning, NLP, and data science. Help shape the future of research tech.</p>
            <Button variant="outline">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
