import { useState } from 'react';

interface DictionaryDefinition {
  word: string;
  phonetic?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

export function useDictionary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupWord = async (word: string): Promise<DictionaryDefinition | null> => {
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
      return data[0];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to look up word');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { lookupWord, isLoading, error };
}
