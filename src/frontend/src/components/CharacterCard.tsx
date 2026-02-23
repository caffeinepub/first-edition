import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Character } from '../backend';
import { useDeleteCharacter } from '../hooks/useQueries';
import { toast } from 'sonner';

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
}

export default function CharacterCard({ character, onEdit }: CharacterCardProps) {
  const deleteCharacter = useDeleteCharacter();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${character.name}?`)) {
      deleteCharacter.mutate(character.name, {
        onSuccess: () => {
          toast.success('Character deleted!');
        },
      });
    }
  };

  return (
    <Card
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/character-card-template.dim_350x450.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-story">{character.name}</CardTitle>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(character)}
              className="h-8 w-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <p className="text-sm leading-relaxed">{character.description}</p>

        {character.traits.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">Traits</h4>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((trait, idx) => (
                <Badge key={idx} variant="secondary">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {character.relationships.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">Relationships</h4>
            <div className="space-y-1">
              {character.relationships.map((rel, idx) => (
                <p key={idx} className="text-xs">
                  {rel}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
