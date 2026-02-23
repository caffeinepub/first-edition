import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface GrammarIssue {
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  context: string;
}

export default function GrammarCheckPage() {
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkGrammar = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const mockIssues: GrammarIssue[] = [
        {
          type: 'error',
          message: 'Possible spelling mistake found',
          context: 'Check for common spelling errors',
        },
        {
          type: 'warning',
          message: 'Consider using active voice',
          context: 'Passive voice can make writing less engaging',
        },
        {
          type: 'suggestion',
          message: 'Consider a more descriptive word',
          context: 'Enhance vocabulary for better impact',
        },
      ];
      
      setIssues(text.length > 0 ? mockIssues : []);
      setIsChecking(false);
    }, 1000);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'suggestion':
        return <Info className="w-5 h-5 text-primary" />;
      default:
        return null;
    }
  };

  const getIssueBadgeVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Grammar Check</h1>
        <p className="text-muted-foreground">Analyze your text for grammar and style improvements</p>
      </div>

      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
          <CardTitle className="text-2xl font-elegant text-primary">Text Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here for grammar checking..."
            className="min-h-[200px] font-content border-primary/30 focus:border-primary"
          />
          <Button
            onClick={checkGrammar}
            disabled={isChecking || !text}
            className="w-full bg-primary hover:bg-primary/90 shadow-md"
          >
            {isChecking ? 'Checking...' : 'Check Grammar'}
          </Button>
        </CardContent>
      </Card>

      {issues.length > 0 && (
        <Card className="shadow-elegant border-primary/20">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-elegant text-primary flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {issues.map((issue, idx) => (
                <Card key={idx} className="border-primary/20 bg-gradient-to-br from-card to-accent/10">
                  <CardContent className="pt-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIssueIcon(issue.type)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getIssueBadgeVariant(issue.type)} className="text-xs">
                            {issue.type}
                          </Badge>
                          <span className="text-sm font-medium text-foreground">{issue.message}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{issue.context}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
