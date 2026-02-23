import { CheckCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AutosaveIndicatorProps {
  status: 'idle' | 'pending' | 'saving' | 'saved';
  progress: number;
}

export default function AutosaveIndicator({ status, progress }: AutosaveIndicatorProps) {
  if (status === 'idle') {
    return null;
  }

  if (status === 'saved') {
    return (
      <div className="flex items-center gap-2 text-xs text-primary">
        <CheckCircle className="w-4 h-4" />
        <span className="font-medium">Saved</span>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-24">
          <Progress value={progress} className="h-1.5 bg-muted" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">Saving...</span>
      </div>
    );
  }

  if (status === 'saving') {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="font-medium">Saving...</span>
      </div>
    );
  }

  return null;
}
