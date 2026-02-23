import { useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from '../contexts/ProjectContext';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function SaveFlipbookButton() {
  const { project, saveFlipbook } = useProject();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveFlipbook = async () => {
    if (!project.storyText.trim()) {
      toast.error('Cannot save flipbook', {
        description: 'Please write some content first.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await saveFlipbook();
      toast.success('Flipbook saved', {
        description: 'Your flipbook is ready to view.',
      });
      setTimeout(() => {
        navigate({ to: '/flipbook' });
      }, 500);
    } catch (error) {
      toast.error('Failed to save flipbook', {
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSaveFlipbook}
      size="sm"
      variant="secondary"
      className="gap-2"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <BookOpen className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">Flipbook</span>
    </Button>
  );
}
