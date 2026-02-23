import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface Prompt {
  category: string;
  text: string;
}

export default function WritingPromptsPage() {
  const prompts: Prompt[] = [
    {
      category: 'Adventure',
      text: 'A mysterious map leads to an unexpected discovery in your own backyard.',
    },
    {
      category: 'Mystery',
      text: 'The town librarian knows everyone\'s secrets, but who knows hers?',
    },
    {
      category: 'Fantasy',
      text: 'Magic returns to the world, but only children can see it.',
    },
    {
      category: 'Science Fiction',
      text: 'Time travel is invented, but it only works backwards by exactly one day.',
    },
    {
      category: 'Drama',
      text: 'Two best friends discover they\'re competing for the same dream.',
    },
    {
      category: 'Romance',
      text: 'A chance encounter at a bookstore changes everything.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Writing Prompts</h1>
        <p className="text-muted-foreground">Spark your creativity with these story starters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((prompt, idx) => (
          <Card key={idx} className="shadow-elegant border-primary/20 bg-gradient-to-br from-card to-accent/20 hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/30">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                    {prompt.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-foreground leading-relaxed font-content">{prompt.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
