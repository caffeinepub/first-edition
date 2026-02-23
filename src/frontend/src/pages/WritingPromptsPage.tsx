import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function WritingPromptsPage() {
  const prompts = [
    {
      category: 'Adventure',
      prompts: [
        'You discover a magical door in your school that leads to another world.',
        'Your pet suddenly starts talking and tells you about a secret mission.',
        'You find a treasure map in your attic that leads to an amazing discovery.',
      ],
    },
    {
      category: 'Mystery',
      prompts: [
        'Strange things keep disappearing from your classroom. Can you solve the mystery?',
        'You receive a mysterious letter with no return address.',
        'Your best friend starts acting very strange, and you need to find out why.',
      ],
    },
    {
      category: 'Fantasy',
      prompts: [
        'You wake up one morning with a magical power. What is it and how do you use it?',
        'A friendly dragon moves into your neighborhood.',
        'You discover you can travel through time by reading certain books.',
      ],
    },
    {
      category: 'Friendship',
      prompts: [
        'You and your friends start a club with a special secret.',
        'A new student joins your class who seems very different from everyone else.',
        'You have to work together with someone you don\'t like to solve a problem.',
      ],
    },
    {
      category: 'Science Fiction',
      prompts: [
        'You build a robot that becomes your best friend.',
        'Aliens land in your backyard and need your help.',
        'You discover a portal to the future in your basement.',
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary font-story flex items-center justify-center gap-3">
          <Lightbulb className="w-8 h-8" />
          Writing Prompts
        </h1>
        <p className="text-muted-foreground">
          Need inspiration? Pick a prompt below to start your story!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((category, idx) => (
          <Card
            key={idx}
            className="relative overflow-hidden"
            style={{
              backgroundImage: 'url(/assets/generated/prompt-card-bg.dim_400x300.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
            <CardHeader className="relative">
              <CardTitle className="text-xl font-story text-primary">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-3">
              {category.prompts.map((prompt, promptIdx) => (
                <div
                  key={promptIdx}
                  className="p-3 bg-card/80 rounded-lg border border-border hover:bg-card transition-colors"
                >
                  <p className="text-sm leading-relaxed">{prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
