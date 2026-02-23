import { BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from '../contexts/ProjectContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function SaveFlipbookButton() {
  const { project, saveFlipbook } = useProject();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const isDisabled = !project.title.trim() || !project.storyText.trim();

  const handleSave = () => {
    setIsSaving(true);
    
    try {
      saveFlipbook();
      toast.success('Flipbook saved successfully!', {
        description: 'Your story has been saved as an interactive flipbook.',
      });
      
      // Navigate to flipbook page after a short delay
      setTimeout(() => {
        navigate({ to: '/flipbook' });
        setIsSaving(false);
      }, 500);
    } catch (error) {
      toast.error('Failed to save flipbook', {
        description: 'Please try again.',
      });
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isDisabled || isSaving}
      variant="default"
      size="sm"
      className="gap-2"
    >
      {isSaving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Save as Flipbook</span>
          <span className="sm:hidden">Flipbook</span>
        </>
      )}
    </Button>
  );
}
