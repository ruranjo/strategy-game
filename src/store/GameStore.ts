import { create } from 'zustand';
import { BaseProperties, Character } from '../types/character.type';

type GameState<T extends BaseProperties> = {
  gold: number;
  builders: number;
  heroes: number;
  selectedCharacter: Character<T> | null;
  isSelected: boolean;
  selectedCell: { row: number; col: number } | null;
  updateResources: (gold: number, builders: number, heroes: number) => void;
  setSelectedCharacter: (character: Character<T> | null) => void;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  resetSelection: () => void; // Nueva función para reiniciar la selección
};

const createGameState = <T extends BaseProperties>() => (
  set: (partial: GameState<T> | Partial<GameState<T>> | ((state: GameState<T>) => GameState<T> | Partial<GameState<T>>), replace?: boolean) => void
): GameState<T> => ({
  gold: 0,
  builders: 2,
  heroes: 0,
  selectedCharacter: null,
  isSelected: false,
  selectedCell: null,

  updateResources: (gold, builders, heroes) =>
    set((state) => ({
      ...state,
      gold,
      builders,
      heroes,
    })),

  setSelectedCharacter: (character) =>
    set((state) => ({
      ...state,
      selectedCharacter: character,
      isSelected: character !== null,
    })),

  setSelectedCell: (cell) =>
    set((state) => ({
      ...state,
      selectedCell: cell,
    })),

  resetSelection: () =>
    set((state) => ({
      ...state,
      selectedCharacter: null,
      isSelected: false,
    })),
});

const useGameStore = create<GameState<BaseProperties>>((set) => createGameState<BaseProperties>()(set));

export default useGameStore;
