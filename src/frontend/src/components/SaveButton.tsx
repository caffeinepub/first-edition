import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from '../contexts/ProjectContext';
import { toast } from 'sonner';

export default function SaveButton() {
  const { saveProject } = useProject();

  const handleSave = () => {
    saveProject();
    toast.success('Progress saved!', {
      description: 'Your story has been saved to your browser.',
    });
  };

  return (
    <Button onClick={handleSave} size="sm" variant="default" className="gap-2">
      <Save className="w-4 h-4" />
      <span className="hidden sm:inline">Save</span>
    </Button>
  );
}
