import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { Character } from '../backend';
import { useAddCharacter } from '../hooks/useQueries';
import { toast } from 'sonner';

interface CharacterFormProps {
  character?: Character | null;
  onClose: () => void;
}

export default function CharacterForm({ character, onClose }: CharacterFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState<string[]>([]);
  const [traitInput, setTraitInput] = useState('');
  const [relationships, setRelationships] = useState<string[]>([]);
  const [relationshipInput, setRelationshipInput] = useState('');

  const addCharacter = useAddCharacter();

  useEffect(() => {
    if (character) {
      setName(character.name);
      setDescription(character.description);
      setTraits(character.traits);
      setRelationships(character.relationships);
    }
  }, [character]);

  const handleAddTrait = () => {
    if (traitInput.trim() && !traits.includes(traitInput.trim())) {
      setTraits([...traits, traitInput.trim()]);
      setTraitInput('');
    }
  };

  const handleRemoveTrait = (trait: string) => {
    setTraits(traits.filter((t) => t !== trait));
  };

  const handleAddRelationship = () => {
    if (relationshipInput.trim() && !relationships.includes(relationshipInput.trim())) {
      setRelationships([...relationships, relationshipInput.trim()]);
      setRelationshipInput('');
    }
  };

  const handleRemoveRelationship = (rel: string) => {
    setRelationships(relationships.filter((r) => r !== rel));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in name and description');
      return;
    }

    const newCharacter: Character = {
      name: name.trim(),
      description: description.trim(),
      traits,
      relationships,
    };

    addCharacter.mutate(newCharacter, {
      onSuccess: () => {
        toast.success(character ? 'Character updated!' : 'Character created!');
        onClose();
      },
      onError: () => {
        toast.error('Failed to save character');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Character Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Luna the Explorer"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your character..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="trait">Personality Traits</Label>
        <div className="flex gap-2">
          <Input
            id="trait"
            value={traitInput}
            onChange={(e) => setTraitInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTrait())}
            placeholder="e.g., brave, kind, funny"
          />
          <Button type="button" onClick={handleAddTrait} variant="secondary">
            Add
          </Button>
        </div>
        {traits.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {traits.map((trait, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1">
                {trait}
                <button
                  type="button"
                  onClick={() => handleRemoveTrait(trait)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationship">Relationships</Label>
        <div className="flex gap-2">
          <Input
            id="relationship"
            value={relationshipInput}
            onChange={(e) => setRelationshipInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRelationship())}
            placeholder="e.g., best friend to Max"
          />
          <Button type="button" onClick={handleAddRelationship} variant="secondary">
            Add
          </Button>
        </div>
        {relationships.length > 0 && (
          <div className="space-y-2 mt-2">
            {relationships.map((rel, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm bg-muted p-2 rounded">
                <span className="flex-1">{rel}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRelationship(rel)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={addCharacter.isPending}>
          {addCharacter.isPending ? 'Saving...' : character ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
