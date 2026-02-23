import { useEffect, useRef, useState, useCallback } from 'react';

export type AutosaveStatus = 'idle' | 'saving' | 'saved';

interface UseAutosaveOptions {
  delay?: number;
  onSave: (data: string) => void;
}

interface UseAutosaveReturn {
  status: AutosaveStatus;
  progress: number;
}

/**
 * Custom hook that implements debounced autosave logic with progress tracking.
 * Triggers save callback after user stops typing for the specified delay.
 * Returns the current autosave status and progress (0-100) for UI feedback.
 */
export function useAutosave(data: string, options: UseAutosaveOptions): UseAutosaveReturn {
  const { delay = 500, onSave } = options;
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<string>(data);
  const savedIndicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const onSaveRef = useRef(onSave);

  // Keep onSave ref up to date without triggering effect
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    console.log('useAutosave effect triggered. Data changed:', data !== previousDataRef.current);
    
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      console.log('Cleared existing save timeout');
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      console.log('Cleared existing progress interval');
    }

    // Only trigger autosave if data has actually changed
    if (data !== previousDataRef.current) {
      console.log('Data changed, starting autosave countdown');
      setStatus('idle');
      setProgress(0);
      startTimeRef.current = Date.now();

      // Update progress every 50ms for smoother animation
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / delay) * 100, 100);
        setProgress(newProgress);
      }, 50);

      // Set timeout for autosave
      timeoutRef.current = setTimeout(() => {
        console.log('Autosave triggered! Saving data:', data.substring(0, 50) + '...');
        
        // Clear progress interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        
        setStatus('saving');
        setProgress(100);
        
        // Execute save with current data
        onSaveRef.current(data);
        previousDataRef.current = data;
        
        // Show "saved" status
        setTimeout(() => {
          setStatus('saved');
          console.log('Save complete, showing saved indicator');
          
          // Clear saved indicator after 2 seconds
          if (savedIndicatorTimeoutRef.current) {
            clearTimeout(savedIndicatorTimeoutRef.current);
          }
          savedIndicatorTimeoutRef.current = setTimeout(() => {
            setStatus('idle');
            setProgress(0);
            console.log('Saved indicator cleared');
          }, 2000);
        }, 100);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (savedIndicatorTimeoutRef.current) {
        clearTimeout(savedIndicatorTimeoutRef.current);
      }
    };
  }, [data, delay]);

  return { status, progress };
}
