import { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image, Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageCreationPage() {
  const { project, addImage } = useProject();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const generateImages = () => {
    if (!prompt.trim()) {
      toast.error('Please describe what you want to illustrate');
      return;
    }

    setIsGenerating(true);

    // Simulate image generation
    setTimeout(() => {
      // In a real app, this would call an AI image generation API
      // For now, we'll use placeholder images
      const placeholders = [
        'https://placehold.co/400x300/6366f1/ffffff?text=Story+Scene+1',
        'https://placehold.co/400x300/8b5cf6/ffffff?text=Story+Scene+2',
        'https://placehold.co/400x300/ec4899/ffffff?text=Story+Scene+3',
        'https://placehold.co/400x300/f59e0b/ffffff?text=Story+Scene+4',
      ];

      setGeneratedImages(placeholders);
      setIsGenerating(false);
      toast.success('Images generated!');
    }, 2000);
  };

  const handleAddImage = (url: string) => {
    addImage({
      id: Date.now().toString(),
      url,
      prompt,
      timestamp: Date.now(),
    });
    toast.success('Image added to your story!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary font-story flex items-center justify-center gap-3">
          <Image className="w-8 h-8" />
          Image Creation Tool
        </h1>
        <p className="text-muted-foreground">
          Create illustrations for your story
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Describe Your Scene</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">
              What do you want to illustrate? Be descriptive!
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A brave girl with brown hair standing in a magical forest with glowing trees and friendly animals"
              rows={4}
            />
          </div>
          <Button
            onClick={generateImages}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Creating Images...' : 'Generate Images'}
          </Button>
        </CardContent>
      </Card>

      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((imageUrl, idx) => (
                <div key={idx} className="space-y-3">
                  <img
                    src={imageUrl}
                    alt={`Generated ${idx + 1}`}
                    className="w-full rounded-lg shadow-md"
                  />
                  <Button
                    onClick={() => handleAddImage(imageUrl)}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Story
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {project.selectedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Story Images ({project.selectedImages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.selectedImages.map((image) => (
                <div key={image.id} className="space-y-2">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full rounded-lg shadow-sm"
                  />
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {image.prompt}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
