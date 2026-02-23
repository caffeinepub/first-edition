import { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GrammarIssue {
  text: string;
  suggestion: string;
  explanation: string;
  position: number;
}

export default function GrammarCheckPage() {
  const { project } = useProject();
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const checkGrammar = () => {
    setIsChecking(true);
    setHasChecked(false);

    // Simulate grammar checking with basic rules
    setTimeout(() => {
      const foundIssues: GrammarIssue[] = [];
      const text = project.storyText;

      // Check for common issues
      const sentences = text.split(/[.!?]+/);
      sentences.forEach((sentence, idx) => {
        const trimmed = sentence.trim();
        if (trimmed && trimmed[0] === trimmed[0].toLowerCase()) {
          foundIssues.push({
            text: trimmed.substring(0, 30) + '...',
            suggestion: 'Start with a capital letter',
            explanation: 'Sentences should always start with a capital letter.',
            position: idx,
          });
        }
      });

      // Check for repeated words
      const words = text.toLowerCase().split(/\s+/);
      for (let i = 0; i < words.length - 1; i++) {
        if (words[i] === words[i + 1] && words[i].length > 2) {
          foundIssues.push({
            text: `${words[i]} ${words[i + 1]}`,
            suggestion: `Remove repeated word: ${words[i]}`,
            explanation: 'You used the same word twice in a row.',
            position: i,
          });
        }
      }

      setIssues(foundIssues.slice(0, 10)); // Limit to 10 issues
      setIsChecking(false);
      setHasChecked(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary font-story flex items-center justify-center gap-3">
          <CheckCircle className="w-8 h-8" />
          Grammar Check
        </h1>
        <p className="text-muted-foreground">
          Check your story for grammar and spelling mistakes
        </p>
      </div>

      {!project.storyText.trim() ? (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No story to check</h3>
            <p className="text-muted-foreground">
              Write your story first, then come back here to check it!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg max-h-[300px] overflow-y-auto">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {project.storyText}
                </p>
              </div>
              <Button onClick={checkGrammar} disabled={isChecking} className="w-full">
                {isChecking ? 'Checking...' : 'Check Grammar'}
              </Button>
            </CardContent>
          </Card>

          {hasChecked && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {issues.length === 0 ? 'Great Job!' : 'Suggestions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {issues.length === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your story looks great! No major grammar issues found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-border rounded-lg space-y-2"
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="flex-1 space-y-1">
                            <p className="font-medium text-sm">"{issue.text}"</p>
                            <p className="text-sm text-primary">{issue.suggestion}</p>
                            <p className="text-xs text-muted-foreground">{issue.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
