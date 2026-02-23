import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDictionary } from '../hooks/useDictionary';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DictionaryTool() {
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const { lookupWord, isLoading, error } = useDictionary();

  const handleSearch = async () => {
    const data = await lookupWord(searchWord);
    setResult(data);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5" />
          Dictionary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Look up a word..."
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
            Word not found. Try a different word!
          </p>
        )}

        {result && (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-lg">{result.word}</h3>
                {result.phonetic && (
                  <p className="text-sm text-muted-foreground">{result.phonetic}</p>
                )}
              </div>

              {result.meanings?.map((meaning: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <p className="font-semibold text-sm text-primary">
                    {meaning.partOfSpeech}
                  </p>
                  {meaning.definitions?.slice(0, 2).map((def: any, defIdx: number) => (
                    <div key={defIdx} className="pl-4 space-y-1">
                      <p className="text-sm">{def.definition}</p>
                      {def.example && (
                        <p className="text-xs text-muted-foreground italic">
                          Example: {def.example}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
