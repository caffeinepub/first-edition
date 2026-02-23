import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Character } from '../backend';

export function useGetCharacters() {
  const { actor, isFetching } = useActor();

  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCharacters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (character: Character) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCharacter(character);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
}

export function useDeleteCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteCharacter(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
}

export function useGetSampleCharacters() {
  const { actor, isFetching } = useActor();

  return useQuery<Character[]>({
    queryKey: ['sample-characters'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSampleCharacters();
    },
    enabled: !!actor && !isFetching,
  });
}
