import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, BookOpen } from 'lucide-react';

export default function PreviewPage() {
  const { project } = useProject();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary font-story flex items-center justify-center gap-3">
          <Eye className="w-8 h-8" />
          Story Preview
        </h1>
        <p className="text-muted-foreground">
          See how your finished novella will look!
        </p>
      </div>

      {!project.storyText.trim() ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No story yet</h3>
            <p className="text-muted-foreground">
              Start writing your story to see it here!
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card shadow-lg">
          <CardContent className="p-8 md:p-12 space-y-8">
            <div className="text-center border-b border-border pb-6">
              <h1 className="text-4xl font-bold font-story text-primary mb-2">
                {project.title}
              </h1>
              <p className="text-sm text-muted-foreground">A novella by a Grade 4 Author</p>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {project.storyText.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed mb-4 font-writing">
                  {paragraph}
                </p>
              ))}
            </div>

            {project.selectedImages.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-border">
                <h3 className="text-xl font-semibold font-story">Story Illustrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.selectedImages.map((image) => (
                    <div key={image.id} className="space-y-2">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-xs text-muted-foreground italic">{image.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
