import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePdfExport } from '../hooks/usePdfExport';
import { useProject } from '../contexts/ProjectContext';

export default function ExportPdfButton() {
  const { project } = useProject();
  const { exportToPdf, isExporting } = usePdfExport();

  const handleExport = () => {
    exportToPdf(project);
  };

  return (
    <Button
      onClick={handleExport}
      size="sm"
      variant="outline"
      className="gap-2"
      disabled={isExporting || !project.storyText.trim()}
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'PDF'}</span>
    </Button>
  );
}
