
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const upcomingConferences = [
    {
        title: "International Conference on Artificial Intelligence and Machine Learning",
        date: "October 10-12, 2024",
        location: "San Francisco, USA",
        description: "Explore the latest breakthroughs in AI, from neural networks to quantum machine learning."
    },
    {
        title: "Global Summit on Renewable Energy and Sustainability",
        date: "November 5-7, 2024",
        location: "Berlin, Germany",
        description: "Join experts to discuss innovations in sustainable energy, climate policy, and green technologies."
    },
    {
        title: "World Congress on Biomedical Engineering",
        date: "December 1-4, 2024",
        location: "Virtual Event",
        description: "A virtual gathering of the brightest minds in biomedical engineering and medical technology."
    }
];

export default function UpcomingConferencesPage() {
  return (
    <div className="bg-secondary/50">
        <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Conferences</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of researchers and innovators at our upcoming events. Explore the frontiers of science and technology.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingConferences.map((conference, index) => (
            <Card key={index} className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                <CardTitle>{conference.title}</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{conference.date}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{conference.location}</span>
                    </div>
                </div>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-muted-foreground">{conference.description}</p>
                </CardContent>
                <CardFooter>
                <Button className="w-full">
                    Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>
    </div>
  );
}
