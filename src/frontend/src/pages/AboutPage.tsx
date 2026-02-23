import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sparkles, Users, Image, CheckCircle, Download } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Write Your Story',
      description: 'A special place to write your very own novella with helpful tools.',
    },
    {
      icon: Sparkles,
      title: 'Story Prompts',
      description: 'Get inspired with fun writing prompts to start your adventure.',
    },
    {
      icon: Users,
      title: 'Create Characters',
      description: 'Build amazing characters with personalities and relationships.',
    },
    {
      icon: Image,
      title: 'Add Pictures',
      description: 'Create illustrations to bring your story to life.',
    },
    {
      icon: CheckCircle,
      title: 'Grammar Help',
      description: 'Check your writing and learn how to make it even better.',
    },
    {
      icon: Download,
      title: 'Save & Share',
      description: 'Save your progress and export your finished story as a PDF.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="First Edition Banner"
          className="w-full rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold text-primary font-story">
          Welcome to First Edition!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          First Edition is a special writing platform made just for grade 4 students like you!
          Here, you can write your very own novella (that's a short novel) and become a real author.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-story">What Can You Do Here?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-primary font-story">
              Ready to Start Your Writing Adventure?
            </h3>
            <p className="text-muted-foreground">
              Click on the "Write" tab to begin your story, or explore the other tabs to discover
              all the amazing tools that will help you become a great author!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
