import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
}

export default function WritersBlockPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      title: 'Change Your Setting',
      description: 'Try writing in a different location or environment to spark new ideas.',
    },
    {
      title: 'Free Writing Exercise',
      description: 'Write continuously for 10 minutes without stopping or editing.',
    },
    {
      title: 'Character Interview',
      description: 'Interview your characters to understand their motivations better.',
    },
  ]);

  const refreshSuggestions = () => {
    const allSuggestions: Suggestion[] = [
      {
        title: 'Change Your Setting',
        description: 'Try writing in a different location or environment to spark new ideas.',
      },
      {
        title: 'Free Writing Exercise',
        description: 'Write continuously for 10 minutes without stopping or editing.',
      },
      {
        title: 'Character Interview',
        description: 'Interview your characters to understand their motivations better.',
      },
      {
        title: 'Read Similar Works',
        description: 'Read books or stories in your genre for inspiration and technique.',
      },
      {
        title: 'Take a Break',
        description: 'Step away from your work and return with fresh perspective.',
      },
      {
        title: 'Outline Your Scene',
        description: 'Create a detailed outline of what needs to happen next.',
      },
    ];

    const shuffled = [...allSuggestions].sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, 3));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Writer's Block Helper</h1>
        <p className="text-muted-foreground">Get inspired and overcome creative obstacles</p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={refreshSuggestions}
          className="gap-2 bg-primary hover:bg-primary/90 shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Get New Suggestions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((suggestion, idx) => (
          <Card key={idx} className="shadow-elegant border-primary/20 bg-gradient-to-br from-card to-accent/20 hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/30">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-elegant text-primary">{suggestion.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
