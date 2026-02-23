import { useState } from 'react';

interface ThesaurusResult {
  word: string;
  synonyms: string[];
}

export function useThesaurus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupSynonyms = async (word: string): Promise<ThesaurusResult | null> => {
    if (!word.trim()) return null;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
      );

      if (!response.ok) {
        throw new Error('Word not found');
      }

      const data = await response.json();
      const synonyms: string[] = [];

      data[0]?.meanings?.forEach((meaning: any) => {
        meaning.definitions?.forEach((def: any) => {
          if (def.synonyms) {
            synonyms.push(...def.synonyms);
          }
        });
        if (meaning.synonyms) {
          synonyms.push(...meaning.synonyms);
        }
      });

      const uniqueSynonyms = [...new Set(synonyms)].slice(0, 10);

      return {
        word: data[0].word,
        synonyms: uniqueSynonyms,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to look up synonyms');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { lookupSynonyms, isLoading, error };
}
