import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlipbookViewer from '../components/FlipbookViewer';
import { BookOpen } from 'lucide-react';

export default function FlipbookPage() {
  const { getFlipbook } = useProject();
  const flipbook = getFlipbook();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Flipbook Viewer</h1>
        <p className="text-muted-foreground">Experience your story in an interactive format</p>
      </div>

      {flipbook && flipbook.pages.length > 0 ? (
        <FlipbookViewer flipbook={flipbook} />
      ) : (
        <Card className="shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 to-destructive/5">
          <CardContent className="py-16 text-center space-y-4">
            <BookOpen className="w-20 h-20 mx-auto text-primary/40" />
            <div>
              <h3 className="text-xl font-elegant text-primary mb-2">No Flipbook Content</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Add content and images to your project to create a flipbook experience
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
