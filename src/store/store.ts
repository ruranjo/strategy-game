// Importamos create desde 'zustand'
import create from 'zustand';

// Definimos el tipo para el estado del tablero
type BoardState = {
  rows: number;
  cols: number;
  boardMatrix: boolean[][];
  setBoardSize: (rows: number, cols: number) => void;
  setCellValue: (row: number, col: number, value: boolean) => void;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void; // Nueva función para establecer el número de columnas
};

// Creamos el store usando la función create de Zustand
const useGameStore = create<BoardState>((set) => ({
  rows: 0, // Inicializamos con 0 filas
  cols: 0, // Inicializamos con 0 columnas
  boardMatrix: [], // Inicializamos boardMatrix vacío

  // Función para establecer el tamaño del tablero
  setBoardSize: (rows, cols) =>
    set((state) => ({
      ...state,
      rows,
      cols,
      // Creamos una nueva matriz con las nuevas dimensiones y valores iniciales
      boardMatrix: Array(rows)
        .fill(0)
        .map(() => Array(cols).fill(false)),
    })),

  // Función para establecer el valor de una celda en la matriz
  setCellValue: (row, col, value) =>
    set((state) => {
      if (row < 0 || row >= state.rows || col < 0 || col >= state.cols) {
        return state; // Validación básica de rangos para evitar accesos fuera de límites
      }

      const newBoardMatrix = state.boardMatrix.map((r, rowIndex) =>
        rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
      );

      return {
        ...state,
        boardMatrix: newBoardMatrix,
      };
    }),

  // Implementación de setRows para establecer el número de filas
  setRows: (rows) =>
    set((state) => ({
      ...state,
      rows,
      // Si el número de filas aumenta, agregamos nuevas filas con valores iniciales falsos
      boardMatrix:
        rows > state.rows
          ? [
              ...state.boardMatrix,
              ...Array(rows - state.rows)
                .fill(0)
                .map(() => Array(state.cols).fill(false)),
            ]
          : state.boardMatrix.slice(0, rows), // Si el número de filas disminuye, eliminamos las filas extra
    })),

  // Implementación de setCols para establecer el número de columnas
  setCols: (cols) =>
    set((state) => ({
      ...state,
      cols,
      // Actualizamos cada fila para tener el número correcto de columnas
      boardMatrix: state.boardMatrix.map((r) =>
        cols > state.cols
          ? [...r, ...Array(cols - state.cols).fill(false)] // Añadimos nuevas columnas con valores iniciales falsos
          : r.slice(0, cols) // Eliminamos las columnas extra si el número de columnas disminuye
      ),
    })),
}));

export default useGameStore;
