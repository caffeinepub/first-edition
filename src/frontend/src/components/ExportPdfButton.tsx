import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from '../contexts/ProjectContext';
import { usePdfExport } from '../hooks/usePdfExport';
import { toast } from 'sonner';

export default function ExportPdfButton() {
  const { project } = useProject();
  const { exportToPdf } = usePdfExport();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!project.storyText.trim()) {
      toast.error('Cannot export', {
        description: 'Please write some content first.',
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportToPdf(project);
      toast.success('PDF ready', {
        description: 'Use your browser\'s print dialog to save as PDF.',
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'Please try again.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      size="sm"
      variant="outline"
      className="gap-2"
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">PDF</span>
    </Button>
  );
}
