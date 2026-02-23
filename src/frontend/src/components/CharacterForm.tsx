import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import type { Character } from '../backend';

interface CharacterFormProps {
  character?: Character;
  onSubmit: (character: Character) => void;
  onCancel: () => void;
}

export default function CharacterForm({ character, onSubmit, onCancel }: CharacterFormProps) {
  const [name, setName] = useState(character?.name || '');
  const [description, setDescription] = useState(character?.description || '');
  const [traits, setTraits] = useState<string[]>(character?.traits || []);
  const [relationships, setRelationships] = useState<string[]>(character?.relationships || []);
  const [currentTrait, setCurrentTrait] = useState('');
  const [currentRelationship, setCurrentRelationship] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      traits,
      relationships,
    });
  };

  const addTrait = () => {
    if (currentTrait.trim() && !traits.includes(currentTrait.trim())) {
      setTraits([...traits, currentTrait.trim()]);
      setCurrentTrait('');
    }
  };

  const removeTrait = (index: number) => {
    setTraits(traits.filter((_, i) => i !== index));
  };

  const addRelationship = () => {
    if (currentRelationship.trim()) {
      setRelationships([...relationships, currentRelationship.trim()]);
      setCurrentRelationship('');
    }
  };

  const removeRelationship = (index: number) => {
    setRelationships(relationships.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Character name"
          required
          className="text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the character..."
          required
          className="min-h-[100px] text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Traits</Label>
        <div className="flex gap-2">
          <Input
            value={currentTrait}
            onChange={(e) => setCurrentTrait(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTrait())}
            placeholder="Add trait..."
            className="text-sm"
          />
          <Button type="button" onClick={addTrait} size="sm" variant="secondary">
            Add
          </Button>
        </div>
        {traits.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {traits.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs"
              >
                <span>{trait}</span>
                <button
                  type="button"
                  onClick={() => removeTrait(idx)}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Relationships</Label>
        <div className="flex gap-2">
          <Input
            value={currentRelationship}
            onChange={(e) => setCurrentRelationship(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRelationship())}
            placeholder="Add relationship..."
            className="text-sm"
          />
          <Button type="button" onClick={addRelationship} size="sm" variant="secondary">
            Add
          </Button>
        </div>
        {relationships.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {relationships.map((rel, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-xs"
              >
                <span>{rel}</span>
                <button
                  type="button"
                  onClick={() => removeRelationship(idx)}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {character ? 'Update' : 'Create'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
