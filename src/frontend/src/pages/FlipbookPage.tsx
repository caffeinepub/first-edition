import { useProject } from '../contexts/ProjectContext';
import FlipbookViewer from '../components/FlipbookViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function FlipbookPage() {
  const { getFlipbook } = useProject();
  const flipbook = getFlipbook();

  if (!flipbook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-story">
              <BookOpen className="w-6 h-6" />
              My Flipbook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You haven't saved a flipbook yet! Write your story and click the "Save as Flipbook" button to create your interactive book.
            </p>
            <Link to="/">
              <Button>Go to Writing Page</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <FlipbookViewer flipbook={flipbook} />
    </div>
  );
}
