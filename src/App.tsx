import React, { useEffect, useState } from 'react';
import { GameMap, GameMenu } from './components/Game';
import { BaseProperties, Character, TreeProperties } from './types/character.type';
import { Tree } from './characters/Tree';
import useBoardStore from './store/BoardStore';

const App: React.FC = () => {
  // Utiliza el hook useBoardStore para acceder a setBoardSize desde el store
  const { setBoardSize, setBoardMatrix } = useBoardStore();

  // Estado para controlar si la inicialización del tablero ha finalizado
  const [isLoading, setIsLoading] = useState(true);

  // Definimos las filas y columnas iniciales
  const initialRows = 22;
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

  // Llamamos a setBoardSize para inicializar el tamaño del tablero cuando App se monte
  useEffect(() => {
    setBoardSize(initialRows, initialCols);
    const aux = generateRandomBoardMatrix(initialRows, initialCols, 60);
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

/**
 
const buildingEmojis = [
  { name: 'Ayuntamiento', emoji: '🏛️', description: 'Centro neurálgico de tu aldea' },
  { name: 'Barraca', emoji: '⚔️', description: 'Entrenas tropas para ataques' },
  { name: 'Muralla', emoji: '🧱', description: 'Protege tu aldea de ataques enemigos' },
  { name: 'Mina de oro', emoji: '⛏️', description: 'Genera oro, moneda principal' }
];
 */