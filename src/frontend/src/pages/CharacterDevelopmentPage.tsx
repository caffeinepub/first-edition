import { useState } from 'react';
import { useGetCharacters, useAddCharacter, useDeleteCharacter } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CharacterCard from '../components/CharacterCard';
import CharacterForm from '../components/CharacterForm';
import { Plus, Users } from 'lucide-react';
import type { Character } from '../backend';

export default function CharacterDevelopmentPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | undefined>(undefined);

  const { data: characters = [], isLoading } = useGetCharacters();
  const addCharacter = useAddCharacter();
  const deleteCharacter = useDeleteCharacter();

  const handleAddCharacter = (character: Character) => {
    addCharacter.mutate(character, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  const handleEditCharacter = (character: Character) => {
    setEditingCharacter(character);
    setIsDialogOpen(true);
  };

  const handleDeleteCharacter = (name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteCharacter.mutate(name);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCharacter(undefined);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-elegant text-primary mb-2">Character Development</h1>
          <p className="text-muted-foreground">Create and manage characters for your story</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-md">
              <Plus className="w-4 h-4" />
              Add Character
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl border-primary/30">
            <DialogHeader>
              <DialogTitle className="text-2xl font-elegant text-primary">
                {editingCharacter ? 'Edit Character' : 'Create New Character'}
              </DialogTitle>
            </DialogHeader>
            <CharacterForm
              character={editingCharacter}
              onSubmit={handleAddCharacter}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="shadow-elegant border-primary/20">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading characters...</p>
          </CardContent>
        </Card>
      ) : characters.length === 0 ? (
        <Card className="shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 to-destructive/5">
          <CardContent className="py-12 text-center space-y-4">
            <Users className="w-16 h-16 mx-auto text-primary/40" />
            <div>
              <h3 className="text-lg font-elegant text-primary mb-2">No Characters Yet</h3>
              <p className="text-muted-foreground text-sm">
                Start building your story by creating your first character
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              onEdit={handleEditCharacter}
              onDelete={handleDeleteCharacter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
