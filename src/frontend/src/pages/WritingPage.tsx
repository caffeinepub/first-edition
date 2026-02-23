import { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useWordCount } from '../hooks/useWordCount';
import { useAutosave } from '../hooks/useAutosave';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DictionaryTool from '../components/DictionaryTool';
import ThesaurusTool from '../components/ThesaurusTool';
import GoogleSearchTool from '../components/GoogleSearchTool';
import AutosaveIndicator from '../components/AutosaveIndicator';

const MAX_WORD_COUNT = 2000;

export default function WritingPage() {
  const { project, updateStoryText, updateTitle, saveProject } = useProject();
  
  // Local state for textarea to prevent flickering
  const [localStoryText, setLocalStoryText] = useState(project.storyText);
  const [localTitle, setLocalTitle] = useState(project.title);
  
  // Word count based on local state for real-time updates
  const wordCount = useWordCount(localStoryText);

  // Autosave status for visual feedback
  const autosaveStatus = useAutosave(localStoryText, {
    delay: 10000, // 10 seconds
    onSave: saveProject,
  });

  // Sync local state with context when context changes from external sources
  // (e.g., when loading from localStorage or flipbook)
  useEffect(() => {
    setLocalStoryText(project.storyText);
  }, [project.storyText]);

  useEffect(() => {
    setLocalTitle(project.title);
  }, [project.title]);

  const handleStoryTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // Calculate word count for the new text
    const trimmedText = newText.trim();
    const newWordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // Allow updates if:
    // 1. We're below the limit, OR
    // 2. We're at/above the limit but the new text is shorter (deleting)
    if (newWordCount <= MAX_WORD_COUNT || newText.length < localStoryText.length) {
      setLocalStoryText(newText);
      updateStoryText(newText);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    updateTitle(newTitle);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-story">Write Your Story</CardTitle>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/pencil-mascot.dim_256x256.png"
                  alt="Writing mascot"
                  className="w-12 h-12"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Story Title</Label>
              <Input
                id="title"
                value={localTitle}
                onChange={handleTitleChange}
                placeholder="My Amazing Adventure"
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="story">Your Story</Label>
                <div className="flex items-center gap-4">
                  <AutosaveIndicator status={autosaveStatus} />
                  <span className="text-sm text-muted-foreground">
                    {wordCount} / {MAX_WORD_COUNT} {wordCount === 1 ? 'word' : 'words'}
                  </span>
                </div>
              </div>
              <Textarea
                id="story"
                value={localStoryText}
                onChange={handleStoryTextChange}
                placeholder="Once upon a time..."
                className="min-h-[500px] text-base leading-relaxed font-writing"
              />
              {wordCount >= MAX_WORD_COUNT && (
                <p className="text-sm text-warning">
                  You've reached the {MAX_WORD_COUNT} word limit. Delete some text to continue writing.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <DictionaryTool />
          <ThesaurusTool />
          <GoogleSearchTool />
        </div>
      </div>
    </div>
  );
}
