import React, { useEffect } from 'react';
import useGameStore from './store/BoardStore';
import { GameMap, GameMenu } from './components/Game';
import { BaseProperties, Character, TreeProperties } from './types/character.type';
import { Tree } from './characters/Tree';




const App: React.FC = () => {
  // Utiliza el hook useBoardStore para acceder a setBoardSize desde el store
  const { setBoardSize, setBoardMatrix } = useGameStore();


  // Definimos las filas y columnas iniciales
  const initialRows = 20;
  const initialCols = 30;
  
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
    const aux = generateRandomBoardMatrix(initialRows, initialCols, 40)
    setBoardMatrix(aux)

  }, [setBoardSize]); // Asegúrate de que setBoardSize sea una dependencia de useEffect si usas eslint-react-hooks

  return (
    <div className="App">
      <h1>Tablero de Juego</h1>
      <GameMap /> {/* Renderizamos el componente GameMap */}
      <GameMenu />
    </div>
  );
};

export default App;
