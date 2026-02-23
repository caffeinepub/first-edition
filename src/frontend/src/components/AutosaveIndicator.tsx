import { Check, Loader2 } from 'lucide-react';

export type AutosaveStatus = 'idle' | 'saving' | 'saved';

interface AutosaveIndicatorProps {
  status: AutosaveStatus;
}

/**
 * Component that displays autosave status feedback.
 * Shows a subtle indicator when content is being saved or has been saved.
 */
export default function AutosaveIndicator({ status }: AutosaveIndicatorProps) {
  if (status === 'idle') {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm animate-in fade-in duration-200">
      {status === 'saving' && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="w-4 h-4 text-success" />
          <span className="text-success font-medium">Saved ✓</span>
        </>
      )}
    </div>
  );
}
