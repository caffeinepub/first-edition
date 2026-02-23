import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image as ImageIcon } from 'lucide-react';

export default function PreviewPage() {
  const { project } = useProject();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Preview</h1>
        <p className="text-muted-foreground">Review your complete project</p>
      </div>

      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
          <CardTitle className="text-3xl font-elegant text-primary text-center">
            {project.title || 'Untitled Project'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {project.storyText ? (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed font-content">
                {project.storyText}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-16 h-16 mx-auto text-primary/40" />
              <p className="text-muted-foreground">No content yet. Start writing in the Write tab.</p>
            </div>
          )}

          {project.selectedImages.length > 0 && (
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-xl font-elegant text-primary flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Project Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.selectedImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden border-primary/20">
                    <img
                      src={image.url}
                      alt={image.prompt || 'Project image'}
                      className="w-full h-48 object-cover"
                    />
                    {image.prompt && (
                      <CardContent className="pt-3 pb-3">
                        <p className="text-xs text-muted-foreground italic">{image.prompt}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
