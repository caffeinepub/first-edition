import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, User } from 'lucide-react';
import type { Character } from '../backend';

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (name: string) => void;
}

export default function CharacterCard({ character, onEdit, onDelete }: CharacterCardProps) {
  return (
    <Card className="shadow-elegant border-primary/20 hover:shadow-xl transition-shadow bg-gradient-to-br from-card to-accent/20">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/30">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-elegant text-primary">{character.name}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(character)}
              className="h-8 w-8 text-primary hover:bg-primary/10"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(character.name)}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{character.description}</p>
        
        {character.traits.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">Traits</h4>
            <div className="flex flex-wrap gap-1.5">
              {character.traits.map((trait, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {character.relationships.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">Relationships</h4>
            <div className="space-y-1">
              {character.relationships.map((rel, idx) => (
                <p key={idx} className="text-xs text-muted-foreground leading-relaxed">
                  • {rel}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
