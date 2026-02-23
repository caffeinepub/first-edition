import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDictionary } from '../hooks/useDictionary';
import { BookOpen, Search } from 'lucide-react';

export default function DictionaryTool() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState<string | null>(null);
  const { lookupWord, isLoading, error } = useDictionary();

  const handleSearch = async () => {
    if (word.trim()) {
      const result = await lookupWord(word.trim().toLowerCase());
      if (result && result.meanings && result.meanings.length > 0) {
        const firstDefinition = result.meanings[0].definitions[0]?.definition || 'No definition available';
        setDefinition(firstDefinition);
      } else {
        setDefinition(null);
      }
    }
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
        <CardTitle className="text-lg font-elegant text-primary flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Dictionary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex gap-2">
          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter a word..."
            className="text-sm border-primary/30 focus:border-primary"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !word.trim()}
            size="icon"
            className="flex-shrink-0 bg-primary hover:bg-primary/90"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {isLoading && (
          <p className="text-xs text-muted-foreground">Loading definition...</p>
        )}

        {error && (
          <p className="text-xs text-destructive">Definition not found</p>
        )}

        {definition && (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-primary capitalize">{word}</p>
            <p className="text-muted-foreground leading-relaxed">{definition}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
