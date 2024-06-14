// Importamos React y useState desde React
import React, { useState } from 'react';
import useGameStore from '../../../store/BoardStore';

// Definimos el tipo para las props
type GameMapProps = {
  rows?: number;
  cols?: number;
};

// Componente funcional GameMap
const GameMap: React.FC<GameMapProps> = () => {
  // Usamos el store Zustand para obtener y modificar el estado del tablero
  const { boardMatrix } = useGameStore((state) => ({
    boardMatrix: state.boardMatrix,
  }));

  // Estado local para rastrear la celda sobre la que se hace hover
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Función para determinar el color de cada casilla
  const getCellColor = (row: number, col: number): string => {
    // Si la celda actual es la que está siendo hover, devolver color rojo
    if (hoveredCell && hoveredCell.row === row && hoveredCell.col === col) {
      return 'bg-red-500';
    }

    // Verificar si la celda actual es una celda circundante a la celda hover
    if (hoveredCell) {
      const { row: hoveredRow, col: hoveredCol } = hoveredCell;
      if (
        (row === hoveredRow - 1 && col === hoveredCol) || // Arriba
        (row === hoveredRow + 1 && col === hoveredCol) || // Abajo
        (row === hoveredRow && col === hoveredCol - 1) || // Izquierda
        (row === hoveredRow && col === hoveredCol + 1)    // Derecha
      ) {
        return 'bg-gray-400'; // Celdas circundantes en gris
      }
    }

    // Si la suma de índices de fila y columna es par, devuelve 'bg-green-200'
    // Si no, devuelve 'bg-green-300'
    return (row + col) % 2 === 0 ? 'bg-green-300' : 'bg-green-400';
  };

  // Función para manejar el evento de hover sobre una celda
  const handleCellHover = (row: number, col: number) => {
    // Actualizamos el estado local con la celda sobre la que se está haciendo hover
    setHoveredCell({ row, col });
  };

  // Renderizamos el tablero usando JSX
  return (
    <div className="flex flex-col items-center border border-red-800">
      {boardMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 ${getCellColor(rowIndex, colIndex)} text-center cursor-none`}
              onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {cell?.imgCode}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Exportamos el componente GameMap
export default GameMap;
