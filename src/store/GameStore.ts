import { create } from 'zustand';
import { BaseProperties, Character } from '../types/character.type';

// Definimos el tipo para el estado del tablero
type BoardState<T extends BaseProperties> = {
  rows: number;
  cols: number;
  boardMatrix: (Character<T> | null)[][];
  gold: number;
  villagers: number;
  warriors: number;
  setBoardSize: (rows: number, cols: number) => void;
  setCellValue: (row: number, col: number, value: Character<T> | null) => void;
  setBoardMatrix: (boardMatrix: (Character<T> | null)[][]) => void;
  updateResources: (gold: number, villagers: number, warriors: number) => void;
};

// Función inicializadora para el estado del tablero
const createBoardState = <T extends BaseProperties>() => (
  set: (partial: BoardState<T> | Partial<BoardState<T>> | ((state: BoardState<T>) => BoardState<T> | Partial<BoardState<T>>), replace?: boolean) => void
): BoardState<T> => ({
  rows: 0,
  cols: 0,
  boardMatrix: [],
  gold: 0,
  villagers: 0,
  warriors: 0,

  // Función para establecer el tamaño del tablero
  setBoardSize: (rows, cols) =>
    set((state) => ({
      ...state,
      rows,
      cols,
      boardMatrix: Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(null)),
    })),

  // Función para establecer el valor de una celda en la matriz
  setCellValue: (row, col, value) =>
    set((state) => {
      if (row < 0 || row >= state.rows || col < 0 || col >= state.cols) {
        return state;
      }

      const newBoardMatrix = state.boardMatrix.map((r, rowIndex) =>
        rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
      );

      return {
        ...state,
        boardMatrix: newBoardMatrix,
      };
    }),

  // Función para establecer la matriz del tablero
  setBoardMatrix: (boardMatrix) =>
    set((state) => ({
      ...state,
      rows: boardMatrix.length,
      cols: boardMatrix[0]?.length || 0,
      boardMatrix,
    })),

  // Función para actualizar los recursos
  updateResources: (gold, villagers, warriors) =>
    set((state) => ({
      ...state,
      gold,
      villagers,
      warriors,
    })),
});

// Creamos el store usando la función create de Zustand
const useGameStore = create<BoardState<BaseProperties>>((set) => createBoardState<BaseProperties>()(set));

export default useGameStore;
