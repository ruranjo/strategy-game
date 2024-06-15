// Importamos React y useState desde React
import React, { useState, useEffect } from 'react';
import useBoardStore from '../../../store/BoardStore';
import useGameStore from '../../../store/GameStore';
import { Character, BaseProperties } from '../../../types/character.type';
import { Constructor } from '../../../characters/builder';

// Definimos el tipo para las props
type GameMapProps = {
  rows?: number;
  cols?: number;
};

// Función para generar una posición aleatoria en el tablero
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

// Componente funcional GameMap
const GameMap: React.FC<GameMapProps> = () => {
  // Usamos el store Zustand para obtener y modificar el estado del tablero y del juego
  const { boardMatrix, isPushMode, setBoardMatrix, disablePushMode, rows, cols } = useBoardStore((state) => ({
    boardMatrix: state.boardMatrix,
    rows: state.rows,
    cols: state.cols,
    isPushMode: state.isPushMode,
    setBoardMatrix: state.setBoardMatrix,
    disablePushMode: state.disablePushMode,
  }));

  const { selectedCharacter, isSelected, setSelectedCharacter, setSelectedCell, builders } = useGameStore((state) => ({
    selectedCharacter: state.selectedCharacter,
    isSelected: state.isSelected,
    setSelectedCharacter: state.setSelectedCharacter,
    setSelectedCell: state.setSelectedCell,
    builders: state.builders,
  }));

  // Estado local para rastrear la celda sobre la que se hace hover
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Colocar builders aleatoriamente en el tablero
  useEffect(() => {
    if (builders > 0) {
      const newBoardMatrix = [...boardMatrix];
      console.log(newBoardMatrix)
      
      for (let i = 0; i < builders; i++) {
        const position = getRandomPosition(rows, cols, newBoardMatrix);
        newBoardMatrix[position.row][position.col] = Constructor
        console.log("si")
      }
      setBoardMatrix(newBoardMatrix);
    }
  }, []);

  // Función para determinar el color de cada casilla
  const getCellColor = (row: number, col: number): string => {
    let baseClass = '';

    // Si la celda actual es la que está siendo hover, devolver color rojo
    if (hoveredCell && hoveredCell.row === row && hoveredCell.col === col) {
      baseClass = 'bg-red-500';
    } else if (hoveredCell) {
      // Verificar si la celda actual es una celda circundante a la celda hover
      const { row: hoveredRow, col: hoveredCol } = hoveredCell;
      if (
        (row === hoveredRow - 1 && col === hoveredCol) || // Arriba
        (row === hoveredRow + 1 && col === hoveredCol) || // Abajo
        (row === hoveredRow && col === hoveredCol - 1) || // Izquierda
        (row === hoveredRow && col === hoveredCol + 1)    // Derecha
      ) {
        baseClass = 'bg-gray-400'; // Celdas circundantes en gris
      }
    }

    // Si no está en hover o circundante, aplicar color según paridad
    if (!baseClass) {
      baseClass = (row + col) % 2 === 0 ? 'bg-green-300' : 'bg-green-400';
    }

    // Añadir clase rounded-full si está en modo push y es circundante
    if (
      isPushMode &&
      hoveredCell &&
      ((row === hoveredCell.row - 1 && col === hoveredCell.col) ||
        (row === hoveredCell.row + 1 && col === hoveredCell.col) ||
        (row === hoveredCell.row && col === hoveredCell.col - 1) ||
        (row === hoveredCell.row && col === hoveredCell.col + 1))
    ) {
      baseClass = 'bg-orange-500 rounded-full';
    }

    return baseClass;
  };

  // Función para manejar el evento de hover sobre una celda
  const handleCellHover = (row: number, col: number) => {
    // Actualizamos el estado local con la celda sobre la que se está haciendo hover
    setHoveredCell({ row, col });
  };

  // Función para manejar el clic en una celda
  const handleCellClick = (row: number, col: number) => {
    if (isPushMode && selectedCharacter) {
      // Clonar la matriz para evitar mutaciones directas
      const newBoardMatrix = [...boardMatrix];
      newBoardMatrix[row][col] = { ...selectedCharacter, x: row, y: col };

      // Actualizar el tablero
      setBoardMatrix(newBoardMatrix);

      // Deshabilitar el modo push
      disablePushMode();

      // Restablecer la selección de personaje
      setSelectedCharacter(null);
      setSelectedCell(null);

      // Forzar la re-renderización actualizando el estado del componente
      setHoveredCell(null);
    } else {
      // Manejar la selección de una celda sin push mode
      const selected = boardMatrix[row][col];
      setSelectedCharacter(selected);
      setSelectedCell({ row, col });
    }
  };

  // Renderizamos el tablero usando JSX
  return (
    <div className="flex flex-col items-center border border-red-800">
      {boardMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-7 h-7 ${getCellColor(rowIndex, colIndex)} text-center cursor-pointer`}
              onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
              onMouseLeave={() => setHoveredCell(null)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell?.imgCode}
            </div>
          ))}
        </div>
      ))}
      {hoveredCell && (
        <div className="mb-2 text-black">
          Coordenadas: {hoveredCell.row}, {hoveredCell.col}
        </div>
      )}
    </div>
  );
};

// Exportamos el componente GameMap
export default GameMap;
