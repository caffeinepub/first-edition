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
  const { project, updateStoryText, updateTitle, saveProjectWithText } = useProject();
  
  // Local state for textarea to prevent flickering
  const [localStoryText, setLocalStoryText] = useState(project.storyText);
  const [localTitle, setLocalTitle] = useState(project.title);
  
  // Word count based on local state for real-time updates
  const wordCount = useWordCount(localStoryText);

  // Autosave with progress tracking - 0.5 seconds
  const { status: autosaveStatus, progress: autosaveProgress } = useAutosave(localStoryText, {
    delay: 500,
    onSave: (currentText: string) => {
      console.log('Autosave callback triggered with text:', currentText.substring(0, 50) + '...');
      saveProjectWithText(currentText);
    },
  });

  // Sync local state with context when context changes from external sources
  useEffect(() => {
    if (project.storyText !== localStoryText) {
      console.log('Syncing local story text with context');
      setLocalStoryText(project.storyText);
    }
  }, [project.storyText]);

  useEffect(() => {
    if (project.title !== localTitle) {
      console.log('Syncing local title with context');
      setLocalTitle(project.title);
    }
  }, [project.title]);

  const handleStoryTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // Calculate word count for the new text
    const trimmedText = newText.trim();
    const newWordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // Allow updates if below limit or deleting
    if (newWordCount <= MAX_WORD_COUNT || newText.length < localStoryText.length) {
      console.log('Story text changed, updating local state');
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
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-elegant border-primary/20">
          <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-destructive/10">
            <CardTitle className="text-2xl font-elegant text-primary">Document Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-primary">Title</Label>
              <Input
                id="title"
                value={localTitle}
                onChange={handleTitleChange}
                placeholder="Enter document title"
                className="text-base font-elegant border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="story" className="text-sm font-medium text-primary">Content</Label>
                <div className="flex items-center gap-4">
                  <AutosaveIndicator status={autosaveStatus} progress={autosaveProgress} />
                  <span className="text-xs text-muted-foreground font-medium">
                    {wordCount} / {MAX_WORD_COUNT} words
                  </span>
                </div>
              </div>
              <Textarea
                id="story"
                value={localStoryText}
                onChange={handleStoryTextChange}
                placeholder="Start writing..."
                className="min-h-[500px] text-base leading-relaxed font-content resize-none border-primary/30 focus:border-primary"
              />
              {wordCount >= MAX_WORD_COUNT && (
                <p className="text-xs text-warning font-medium">
                  Word limit reached. Delete text to continue editing.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <DictionaryTool />
        <ThesaurusTool />
        <GoogleSearchTool />
      </div>
    </div>
  );
}
