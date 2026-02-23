import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink } from 'lucide-react';

export default function GoogleSearchTool() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
        <CardTitle className="text-lg font-elegant text-primary flex items-center gap-2">
          <Search className="w-5 h-5" />
          Research
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search the web..."
            className="text-sm border-primary/30 focus:border-primary"
          />
          <Button
            onClick={handleSearch}
            disabled={!query.trim()}
            size="icon"
            className="flex-shrink-0 bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Quick access to web search for research
        </p>
      </CardContent>
    </Card>
  );
}
