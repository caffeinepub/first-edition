import { useState } from 'react';
import { Search, Globe, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

export default function GoogleSearchTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const generateSearchResults = (query: string): SearchResult[] => {
    const lowerQuery = query.toLowerCase();
    
    // Generate contextual mock results based on common search topics
    const results: SearchResult[] = [];
    
    // Add relevant results based on keywords
    if (lowerQuery.includes('space') || lowerQuery.includes('planet') || lowerQuery.includes('star')) {
      results.push(
        {
          title: 'Solar System Facts for Kids',
          snippet: 'Learn about the eight planets in our solar system. Mercury is the closest to the Sun, while Neptune is the farthest. Each planet has unique features that make it special.',
          url: 'https://example.com/solar-system'
        },
        {
          title: 'What Are Stars Made Of?',
          snippet: 'Stars are giant balls of hot gas, mostly hydrogen and helium. They shine because of nuclear reactions happening in their cores. Our Sun is a medium-sized star.',
          url: 'https://example.com/stars'
        },
        {
          title: 'Space Exploration History',
          snippet: 'Humans first went to space in 1961. The first moon landing was in 1969. Today, astronauts live and work on the International Space Station.',
          url: 'https://example.com/space-exploration'
        }
      );
    } else if (lowerQuery.includes('ocean') || lowerQuery.includes('sea') || lowerQuery.includes('marine')) {
      results.push(
        {
          title: 'Ocean Animals and Sea Creatures',
          snippet: 'The ocean is home to millions of species. From tiny plankton to giant whales, marine life comes in all shapes and sizes. Coral reefs are like underwater cities.',
          url: 'https://example.com/ocean-animals'
        },
        {
          title: 'How Deep Is the Ocean?',
          snippet: 'The deepest part of the ocean is the Mariana Trench, which is about 7 miles deep. Most of the ocean floor has never been explored by humans.',
          url: 'https://example.com/ocean-depth'
        },
        {
          title: 'Ocean Conservation for Kids',
          snippet: 'Oceans cover 70% of Earth\'s surface and produce half of our oxygen. We can help protect oceans by reducing plastic use and keeping beaches clean.',
          url: 'https://example.com/ocean-conservation'
        }
      );
    } else if (lowerQuery.includes('dinosaur') || lowerQuery.includes('fossil')) {
      results.push(
        {
          title: 'Dinosaur Facts and Information',
          snippet: 'Dinosaurs lived millions of years ago during the Mesozoic Era. They came in many sizes, from tiny Compsognathus to massive Argentinosaurus.',
          url: 'https://example.com/dinosaurs'
        },
        {
          title: 'How Do We Know About Dinosaurs?',
          snippet: 'Scientists called paleontologists study dinosaur fossils. Fossils are preserved remains of ancient creatures found in rocks and sediment.',
          url: 'https://example.com/fossils'
        },
        {
          title: 'Why Did Dinosaurs Go Extinct?',
          snippet: 'Most scientists believe a giant asteroid hit Earth 66 million years ago, causing climate changes that led to dinosaur extinction. Birds are their living descendants.',
          url: 'https://example.com/extinction'
        }
      );
    } else if (lowerQuery.includes('animal') || lowerQuery.includes('wildlife')) {
      results.push(
        {
          title: 'Amazing Animal Facts',
          snippet: 'Animals have incredible abilities! Cheetahs can run 70 mph, elephants can communicate over long distances, and octopuses can change color instantly.',
          url: 'https://example.com/animal-facts'
        },
        {
          title: 'Animal Habitats Around the World',
          snippet: 'Different animals live in different habitats. Polar bears live in the Arctic, lions live in African savannas, and tree frogs live in rainforests.',
          url: 'https://example.com/habitats'
        },
        {
          title: 'Endangered Animals We Need to Protect',
          snippet: 'Many animals are endangered due to habitat loss and climate change. Tigers, pandas, and sea turtles need our help to survive.',
          url: 'https://example.com/endangered'
        }
      );
    } else {
      // Generic results for any other search
      results.push(
        {
          title: `Information About ${query}`,
          snippet: `${query} is an interesting topic to explore! There are many fascinating facts and stories related to this subject that can inspire your writing.`,
          url: 'https://example.com/info'
        },
        {
          title: `${query} - Fun Facts for Kids`,
          snippet: 'Learning about new topics helps you become a better writer. Use what you discover to add realistic details and exciting information to your story.',
          url: 'https://example.com/facts'
        },
        {
          title: `How to Write About ${query}`,
          snippet: 'When writing about this topic, think about what makes it interesting. Use descriptive words to help your readers imagine what you\'re describing.',
          url: 'https://example.com/writing-tips'
        }
      );
    }
    
    return results;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = generateSearchResults(searchQuery.trim());
      setSearchResults(results);
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="w-5 h-5" />
          Google Research
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search for information..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        {hasSearched && searchResults.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground italic">
                Example results to inspire your research:
              </p>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="space-y-1 pb-3 border-b last:border-0">
                      <h4 className="text-sm font-semibold text-primary flex items-center gap-1">
                        {result.title}
                        <ExternalLink className="w-3 h-3" />
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {result.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
        
        {hasSearched && searchResults.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No results found. Try a different search term!
          </p>
        )}
        
        {!hasSearched && (
          <p className="text-xs text-muted-foreground">
            Search for facts, ideas, and information to help with your story!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
