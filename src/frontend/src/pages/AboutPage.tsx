import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, Users, Image, CheckCircle, Download } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: FileText,
      title: 'Document Editor',
      description: 'Professional writing environment with autosave and word count tracking.',
    },
    {
      icon: Lightbulb,
      title: 'Writing Prompts',
      description: 'Access curated prompts to inspire your creative writing projects.',
    },
    {
      icon: Users,
      title: 'Character Management',
      description: 'Organize and develop characters with detailed profiles and relationships.',
    },
    {
      icon: Image,
      title: 'Image Integration',
      description: 'Generate and manage visual content for your writing projects.',
    },
    {
      icon: CheckCircle,
      title: 'Grammar Tools',
      description: 'Built-in grammar checking to improve writing quality and clarity.',
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Save your work locally and export to PDF format for sharing.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-elegant text-primary tracking-wide">
          Welcome to First Edition
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A comprehensive writing platform designed for students to create, edit, and manage their creative writing projects with professional-grade tools and features.
        </p>
      </div>

      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="border-b border-border bg-accent/30">
          <CardTitle className="text-2xl font-elegant text-primary">Platform Features</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/30">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1.5 text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 to-destructive/10 border-primary/30 shadow-elegant">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-elegant text-primary">
              Get Started
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              Navigate to the Write tab to begin your project, or explore the other features to discover the full range of tools available to enhance your writing experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
