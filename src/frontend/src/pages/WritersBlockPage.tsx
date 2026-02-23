import { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb } from 'lucide-react';

export default function WritersBlockPage() {
  const { project } = useProject();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestions = () => {
    setIsGenerating(true);

    // Simulate AI suggestions based on story content
    setTimeout(() => {
      const lastWords = project.storyText.trim().split(/\s+/).slice(-20).join(' ');
      
      const suggestionTemplates = [
        'What if your character discovers something unexpected?',
        'Try adding a new character who changes everything.',
        'Maybe your character faces a difficult choice.',
        'What happens when things don\'t go as planned?',
        'Your character could meet someone from their past.',
        'Add a surprising twist that no one sees coming.',
        'What if the weather suddenly changes the situation?',
        'Your character might find a clue or important object.',
        'Try writing a conversation between two characters.',
        'What secret might your character be hiding?',
      ];

      const randomSuggestions = suggestionTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      setSuggestions(randomSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary font-story flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8" />
          Writer's Block Helper
        </h1>
        <p className="text-muted-foreground">
          Stuck? Get ideas to continue your story!
        </p>
      </div>

      {!project.storyText.trim() ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Lightbulb className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start writing first</h3>
            <p className="text-muted-foreground">
              Write at least a few sentences, then come back here for suggestions!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Story So Far</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg max-h-[200px] overflow-y-auto">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {project.storyText.split(/\s+/).slice(-100).join(' ')}
                  {project.storyText.split(/\s+/).length > 100 && '...'}
                </p>
              </div>
              <Button onClick={generateSuggestions} disabled={isGenerating} className="w-full gap-2">
                <Sparkles className="w-4 h-4" />
                {isGenerating ? 'Thinking...' : 'Get Writing Ideas'}
              </Button>
            </CardContent>
          </Card>

          {suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Ideas to Continue Your Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <p className="text-sm leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
