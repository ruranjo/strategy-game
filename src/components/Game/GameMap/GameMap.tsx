import React, { useState, useEffect } from 'react';
import useBoardStore from '../../../store/BoardStore';
import useGameStore from '../../../store/GameStore';
import { Character, BaseProperties } from '../../../types/character.type';
import { Constructor } from '../../../characters/builder';

type GameMapProps = {
  rows?: number;
  cols?: number;
};

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

const GameMap: React.FC<GameMapProps> = () => {
  const { boardMatrix, isPushMode, setBoardMatrix, disablePushMode, rows, cols } = useBoardStore((state) => ({
    boardMatrix: state.boardMatrix,
    rows: state.rows,
    cols: state.cols,
    isPushMode: state.isPushMode,
    setBoardMatrix: state.setBoardMatrix,
    disablePushMode: state.disablePushMode,
  }));

  const { selectedCharacter, isSelected, setSelectedBuild, setSelectedCharacter, selectedCell, setSelectedCell, selectedBuild, builders, gold, deductGold } = useGameStore((state) => ({
    selectedCharacter: state.selectedCharacter,
    isSelected: state.isSelected,
    setSelectedCharacter: state.setSelectedCharacter,
    setSelectedBuild: state.setSelectedCharacter,
    selectedBuild: state.selectedBuild,
    selectedCell: state.selectedCell,
    setSelectedCell: state.setSelectedCell,
    builders: state.builders,
    gold: state.gold,
    deductGold: state.deductGold
  }));

  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    if (builders > 0) {
      const newBoardMatrix = [...boardMatrix];
      for (let i = 0; i < builders; i++) {
        const position = getRandomPosition(rows, cols, newBoardMatrix);
        newBoardMatrix[position.row][position.col] = Constructor;
      }
      setBoardMatrix(newBoardMatrix);
    }
  }, []);

  const getCellColor = (row: number, col: number): string => {
    let baseClass = '';

    if (hoveredCell && hoveredCell.row === row && hoveredCell.col === col) {
      baseClass = 'bg-red-500';
    } else if (hoveredCell) {
      const { row: hoveredRow, col: hoveredCol } = hoveredCell;
      if (
        (row === hoveredRow - 1 && col === hoveredCol) ||
        (row === hoveredRow + 1 && col === hoveredCol) ||
        (row === hoveredRow && col === hoveredCol - 1) ||
        (row === hoveredRow && col === hoveredCol + 1)
      ) {
        baseClass = 'bg-gray-400';
      }
    }

    if (!baseClass) {
      baseClass = (row + col) % 2 === 0 ? 'bg-green-300' : 'bg-green-400';
    }

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

  const handleCellHover = (row: number, col: number) => {
    setHoveredCell({ row, col });
  };

  type Direction = {
    dRow: number;
    dCol: number;
  }
  const directions: Direction[] = [
    { dRow: -1, dCol: 0 },
    { dRow: 1, dCol: 0 },
    { dRow: 0, dCol: -1 },
    { dRow: 0, dCol: 1 },
    { dRow: -1, dCol: -1 },
    { dRow: -1, dCol: 1 },
    { dRow: 1, dCol: -1 },
    { dRow: 1, dCol: 1 },
  ];

  const findAdjacentAvailableCell = (row: number, col: number): { newRow: number; newCol: number } | null => {
    for (let i = 0; i < directions.length; i++) {
      const newRow = row + directions[i].dRow;
      const newCol = col + directions[i].dCol;
      if (newRow >= 0 && newRow < boardMatrix.length && newCol >= 0 && newCol < boardMatrix[0].length) {
        if (boardMatrix[newRow][newCol] === null) {
          return { newRow, newCol };
        }
      }
    }
    return null;
  };

  const isAdjacentCellAvailable = (row: number, col: number): boolean => {
    for (let i = 0; i < directions.length; i++) {
      const newRow = row + directions[i].dRow;
      const newCol = col + directions[i].dCol;
      if (newRow >= 0 && newRow < boardMatrix.length && newCol >= 0 && newCol < boardMatrix[0].length) {
        if (boardMatrix[newRow][newCol] === null) {
          return true;
        }
      }
    }
    return false;
  };

  const handleCellClick = (row: number, col: number) => {
    if (isAdjacentCellAvailable(row, col)) {
      if (isPushMode && selectedCharacter && selectedBuild) {
        if (boardMatrix[row][col] === null) {
          const newBoardMatrix = [...boardMatrix];
          newBoardMatrix[row][col] = { ...selectedBuild, x: row, y: col };

          const adjacentCell = findAdjacentAvailableCell(row, col);
          if (adjacentCell) {
            const { newRow, newCol } = adjacentCell;

            if (selectedCell) {
              newBoardMatrix[selectedCell.row][selectedCell.col] = null;
            }

            newBoardMatrix[newRow][newCol] = { ...selectedCharacter, x: newRow, y: newCol };
          } else {
            console.error("No se encontró una celda adyacente disponible para el constructor");
          }

          setBoardMatrix(newBoardMatrix);

          disablePushMode();
          setSelectedCharacter(null);
          setSelectedBuild(null);
          setSelectedCell(null);

          setHoveredCell(null);

          // Descontar el oro al colocar el edificio
          if (selectedBuild && selectedBuild.properties) {
            deductGold(selectedBuild.properties.cost);
          }

          

        } else {
          console.log("No es posible colocar en esta posición");
        }
      } else {
        const selected = boardMatrix[row][col];
        setSelectedCharacter(selected);
        setSelectedCell({ row, col });
      }
    } else {
      console.log("No es posible colocar en esta posición");
    }
  };

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

export default GameMap;
