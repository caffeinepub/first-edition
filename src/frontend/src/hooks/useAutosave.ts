import { useEffect, useRef, useState } from 'react';

export type AutosaveStatus = 'idle' | 'saving' | 'saved';

interface UseAutosaveOptions {
  delay?: number;
  onSave: () => void;
}

/**
 * Custom hook that implements debounced autosave logic.
 * Triggers save callback after user stops typing for the specified delay.
 * Returns the current autosave status for UI feedback.
 */
export function useAutosave(data: string, options: UseAutosaveOptions) {
  const { delay = 10000, onSave } = options;
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<string>(data);
  const savedIndicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only trigger autosave if data has actually changed
    if (data !== previousDataRef.current) {
      setStatus('idle');

      // Set new timeout for autosave
      timeoutRef.current = setTimeout(() => {
        setStatus('saving');
        onSave();
        previousDataRef.current = data;
        
        // Show "saved" status briefly
        setStatus('saved');
        
        // Clear saved indicator after 3 seconds
        if (savedIndicatorTimeoutRef.current) {
          clearTimeout(savedIndicatorTimeoutRef.current);
        }
        savedIndicatorTimeoutRef.current = setTimeout(() => {
          setStatus('idle');
        }, 3000);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (savedIndicatorTimeoutRef.current) {
        clearTimeout(savedIndicatorTimeoutRef.current);
      }
    };
  }, [data, delay, onSave]);

  return status;
}
