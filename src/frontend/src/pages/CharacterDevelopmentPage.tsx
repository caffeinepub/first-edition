import { useState } from 'react';
import { useGetCharacters, useAddCharacter, useDeleteCharacter } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import CharacterForm from '../components/CharacterForm';
import CharacterCard from '../components/CharacterCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Character } from '../backend';

export default function CharacterDevelopmentPage() {
  const { data: characters = [], isLoading } = useGetCharacters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCharacter(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-story flex items-center gap-3">
            <Users className="w-8 h-8" />
            Character Development
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage the characters in your story
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Character
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCharacter ? 'Edit Character' : 'Create New Character'}
              </DialogTitle>
            </DialogHeader>
            <CharacterForm
              character={editingCharacter}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading characters...</p>
        </div>
      ) : characters.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No characters yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your story by creating your first character!
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Character
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
