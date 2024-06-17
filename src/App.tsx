import React, { useEffect, useState } from 'react';
import { GameMap, GameMenu } from './components/Game';
import { BaseProperties, Character, TreeProperties } from './types/character.type';
import { Tree } from './characters/Tree';
import { Ayuntamiento } from './characters/build'; // Asegúrate de importar el Ayuntamiento
import useBoardStore from './store/BoardStore';

const App: React.FC = () => {
  const { setBoardSize, setBoardMatrix } = useBoardStore();
  const [isLoading, setIsLoading] = useState(true);

  const initialRows = 21;
  const initialCols = 36;

  const generateRandomBoardMatrix = (rows: number, cols: number, treeCount: number): (Character<BaseProperties> | null)[][] => {
    const boardMatrix: (Character<TreeProperties> | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));

    let placedTrees = 0;
    while (placedTrees < treeCount) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (!boardMatrix[randomRow][randomCol]) {
        boardMatrix[randomRow][randomCol] = { ...Tree, x: randomRow, y: randomCol };
        placedTrees++;
      }
    }

    return boardMatrix;
  };

  useEffect(() => {
    setBoardSize(initialRows, initialCols);
    const aux = generateRandomBoardMatrix(initialRows, initialCols, 60);

    // Calcular la posición central
    const centerRow = Math.floor(initialRows / 2);
    const centerCol = Math.floor(initialCols / 2);

    // Colocar el Ayuntamiento en el centro
    aux[centerRow][centerCol] = { ...Ayuntamiento, x: centerRow, y: centerCol };

    setBoardMatrix(aux);
    setIsLoading(false); // Marcar como cargado después de establecer el tablero
  }, [setBoardSize, setBoardMatrix]);

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

