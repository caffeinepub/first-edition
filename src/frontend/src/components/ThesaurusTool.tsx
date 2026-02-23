import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useThesaurus } from '../hooks/useThesaurus';
import { BookText, Search } from 'lucide-react';

export default function ThesaurusTool() {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const { lookupSynonyms, isLoading, error } = useThesaurus();

  const handleSearch = async () => {
    if (word.trim()) {
      const result = await lookupSynonyms(word.trim().toLowerCase());
      if (result && result.synonyms) {
        setSynonyms(result.synonyms);
      } else {
        setSynonyms([]);
      }
    }
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
        <CardTitle className="text-lg font-elegant text-primary flex items-center gap-2">
          <BookText className="w-5 h-5" />
          Thesaurus
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex gap-2">
          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Find synonyms..."
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
          <p className="text-xs text-muted-foreground">Finding synonyms...</p>
        )}

        {error && (
          <p className="text-xs text-destructive">No synonyms found</p>
        )}

        {synonyms && synonyms.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">Synonyms</p>
            <div className="flex flex-wrap gap-1.5">
              {synonyms.map((synonym, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
                  {synonym}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
