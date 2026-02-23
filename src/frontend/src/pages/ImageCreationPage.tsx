import { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageCreationPage() {
  const { project, addImage } = useProject();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const newImage = {
        id: Date.now().toString(),
        url: `https://picsum.photos/seed/${Date.now()}/800/600`,
        prompt: prompt,
        timestamp: Date.now(),
      };

      addImage(newImage);
      toast.success('Image generated successfully');
      setPrompt('');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-elegant text-primary">Image Creation</h1>
        <p className="text-muted-foreground">Generate visual content for your project</p>
      </div>

      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
          <CardTitle className="text-2xl font-elegant text-primary">Generate Image</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-medium text-primary">Image Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="border-primary/30 focus:border-primary"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md"
          >
            <Plus className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </Button>
        </CardContent>
      </Card>

      {project.selectedImages.length > 0 && (
        <Card className="shadow-elegant border-primary/20">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-elegant text-primary flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Generated Images ({project.selectedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.selectedImages.map((image) => (
                <Card key={image.id} className="overflow-hidden border-primary/20 hover:shadow-lg transition-shadow">
                  <img
                    src={image.url}
                    alt={image.prompt || 'Generated image'}
                    className="w-full h-48 object-cover"
                  />
                  {image.prompt && (
                    <CardContent className="pt-3 pb-3">
                      <p className="text-xs text-muted-foreground italic line-clamp-2">{image.prompt}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
