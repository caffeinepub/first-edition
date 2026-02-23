import { useState } from 'react';
import { Search, BookMarked } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useThesaurus } from '../hooks/useThesaurus';
import { Badge } from '@/components/ui/badge';

export default function ThesaurusTool() {
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const { lookupSynonyms, isLoading, error } = useThesaurus();

  const handleSearch = async () => {
    const data = await lookupSynonyms(searchWord);
    setResult(data);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookMarked className="w-5 h-5" />
          Thesaurus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Find synonyms..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading || !searchWord.trim()}>
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive">
            No synonyms found. Try a different word!
          </p>
        )}

        {result && (
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg mb-2">{result.word}</h3>
              {result.synonyms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.synonyms.map((synonym: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {synonym}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No synonyms found for this word.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
