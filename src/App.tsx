import React, { useEffect, useState } from 'react';
import { GameMap, GameMenu } from './components/Game';
import { BaseProperties, Character, TreeProperties } from './types/character.type';
import { Tree } from './characters/Tree';
import { Ayuntamiento } from './characters/build'; // Asegúrate de importar el Ayuntamiento
import useBoardStore from './store/BoardStore';
import { Barbarian } from './characters/heros';
import useGameStore from './store/GameStore';
import { Constructor } from './characters/builder';

const App: React.FC = () => {
  const { setBoardSize, setBoardMatrix } = useBoardStore();
  const [isLoading, setIsLoading] = useState(true);

  const initialRows = 20;
  const initialCols = 40;
  const treeCount = 60;

  const { builders } = useGameStore((state) => ({
    builders: state.builders,
  }));

  const getRandomPosition = (rows: number, cols: number, boardMatrix: (Character<BaseProperties> | null)[][]): { row: number, col: number } => {
    let position;
    do {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!boardMatrix[row][col]) {
        position = { row, col };
      }
    } while (!position);
    return position;
  };

  const generateRandomBoardMatrix = (rows: number, cols: number, treeCount: number): (Character<BaseProperties> | null)[][] => {
    const boardMatrix: (Character<TreeProperties> | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));

    // Colocar árboles aleatorios
    let placedTrees = 0;
    while (placedTrees < treeCount) {
      const { row, col } = getRandomPosition(rows, cols, boardMatrix);
      boardMatrix[row][col] = { ...Tree, x: row, y: col };
      placedTrees++;
    }

    return boardMatrix;
  };

  useEffect(() => {
    setBoardSize(initialRows, initialCols);
    const aux = generateRandomBoardMatrix(initialRows, initialCols, treeCount);

    // Colocar el Ayuntamiento en el centro
    const centerRow = Math.floor(initialRows / 2);
    const centerCol = Math.floor(initialCols / 2);
    aux[centerRow][centerCol] = { ...Ayuntamiento, x: centerRow, y: centerCol };

    // Colocar al Bárbaro en una posición aleatoria
    const { row: barbarianRow, col: barbarianCol } = getRandomPosition(initialRows, initialCols, aux);
    aux[barbarianRow][barbarianCol] = { ...Barbarian, x: barbarianRow, y: barbarianCol };

    // Colocar Constructores en posiciones aleatorias no ocupadas
    const newBoardMatrix = [...aux];
    for (let i = 0; i < builders; i++) {
      const { row, col } = getRandomPosition(initialRows, initialCols, newBoardMatrix);
      newBoardMatrix[row][col] = { ...Constructor, x: row, y: col };
    }

    setBoardMatrix(newBoardMatrix);
    setIsLoading(false); // Marcar como cargado después de establecer el tablero
  }, [setBoardSize, setBoardMatrix, builders]);

  if (isLoading) {
    return <div>Loading...</div>; // Mostrar mensaje de carga mientras se inicializa
  }

  return (
    <div className="App">
      <h1>Tablero de Juego</h1>
      <GameMap /> {/* Renderizamos el componente GameMap */}
      <GameMenu />
    </div>
  );
};

export default App;
