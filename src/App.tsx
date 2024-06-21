import { useEffect, useState } from "react";
import { GameMap, GameMenu } from "./components/Game";
import {
  BaseProperties,
  Character,
  TreeProperties,
  MountainProperties,
} from "./types/character.type";
import { Ayuntamiento, Muralla } from "./characters/build"; // Asegúrate de importar el Ayuntamiento y la Muralla
import useBoardStore from "./store/BoardStore";
import { Barbarian, GrandWarden } from "./characters/heros";
import useGameStore from "./store/GameStore";
import { Constructor } from "./characters/builder";
import { Mountain, Tree } from "./characters/decorators";

const App = () => {
  const { setBoardSize, setBoardMatrix } = useBoardStore();
  const [isLoading, setIsLoading] = useState(true);

  const initialRows = 20;
  const initialCols = 50;
  const treeCount = 60;
  const middleCol = Math.ceil(initialCols / 2);

  const { builders } = useGameStore((state) => ({
    builders: state.builders,
  }));

  const getRandomPosition = (
    rows: number,
    cols: number,
    boardMatrix: (Character<BaseProperties> | null)[][],
    minCol: number = 0,
    maxCol: number = cols
  ): { row: number; col: number } => {
    let position;
    do {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * (maxCol - minCol) + minCol);
      if (!boardMatrix[row][col]) {
        position = { row, col };
      }
    } while (!position);
    return position;
  };

  const generateRandomBoardMatrix = (
    rows: number,
    cols: number,
    treeCount: number
  ): (Character<BaseProperties> | null)[][] => {
    const boardMatrix: (Character<
      TreeProperties | MountainProperties
    > | null)[][] = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null));

    // Colocar árboles aleatorios
    let placedTrees = 0;
    while (placedTrees < treeCount) {
      const { row, col } = getRandomPosition(rows, cols, boardMatrix);
      boardMatrix[row][col] = { ...Tree, x: row, y: col };
      placedTrees++;
    }

    // Colocar la línea de montañas
    const middleCol = Math.floor(cols / 2);
    for (let row = 0; row < rows; row++) {
      boardMatrix[row][middleCol] = { ...Mountain, x: row, y: middleCol };
    }

    return boardMatrix;
  };

  useEffect(() => {
    setBoardSize(initialRows, initialCols);
    const aux = generateRandomBoardMatrix(initialRows, initialCols, treeCount);

    // Colocar el Ayuntamiento en el centro de la parte izquierda
    const centerRow = Math.floor(initialRows / 2);
    const centerCol = Math.floor(initialCols / 4);
    const auxAyuntamiento = JSON.parse(JSON.stringify(Ayuntamiento));
    aux[centerRow][centerCol] = {
      ...auxAyuntamiento,
      x: centerRow,
      y: centerCol,
      bando: "jugador",
    };

    // Colocar al primer Bárbaro en una posición aleatoria en la parte izquierda
    const { row: barbarianRow1, col: barbarianCol1 } = getRandomPosition(
      initialRows,
      initialCols,
      aux,
      0,
      middleCol
    );
    const auxBarbarian1 = JSON.parse(JSON.stringify(Barbarian));
    aux[barbarianRow1][barbarianCol1] = {
      ...auxBarbarian1,
      x: barbarianRow1,
      y: barbarianCol1,
      bando: "jugador",
    };

    // Colocar al segundo Bárbaro en una posición aleatoria en la parte izquierda
    const { row: barbarianRow2, col: barbarianCol2 } = getRandomPosition(
      initialRows,
      initialCols,
      aux,
      0,
      middleCol
    );
    const auxBarbarian2 = JSON.parse(JSON.stringify(Barbarian));
    aux[barbarianRow2][barbarianCol2] = {
      ...auxBarbarian2,
      x: barbarianRow2,
      y: barbarianCol2,
      bando: "jugador",
    };

    // Colocar Constructores en posiciones aleatorias no ocupadas en la parte izquierda
    for (let i = 0; i < builders; i++) {
      const { row, col } = getRandomPosition(
        initialRows,
        initialCols,
        aux,
        0,
        middleCol
      );
      const auxConstructor = JSON.parse(JSON.stringify(Constructor));
      aux[row][col] = { ...auxConstructor, x: row, y: col, bando: "jugador" };
    }

    // Colocar 10 arañas en posiciones aleatorias en la parte izquierda
    for (let i = 0; i < 10; i++) {
      const { row, col } = getRandomPosition(
        initialRows,
        initialCols,
        aux,
        middleCol
      );
      const auxSpider = JSON.parse(JSON.stringify(GrandWarden));
      aux[row][col] = {
        ...auxSpider,
        x: row,
        y: col,
        bando: "enemigo",
      };
    }

    // Colocar el Ayuntamiento enemigo en el centro de la parte derecha
    const enemyCenterCol = Math.floor((3 * initialCols) / 4);
    const auxEnemyAyuntamiento = JSON.parse(JSON.stringify(Ayuntamiento));
    aux[centerRow][enemyCenterCol] = {
      ...auxEnemyAyuntamiento,
      x: centerRow,
      y: enemyCenterCol,
      bando: "enemigo",
    };

    // Crear una muralla alrededor del Ayuntamiento enemigo en un cuadrado de 7x7
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        if (i === -3 || i === 3 || j === -3 || j === 3) {
          // Sólo las posiciones en el borde del cuadrado
          const murallaRow = centerRow + i;
          const murallaCol = enemyCenterCol + j;
          if (
            murallaRow >= 0 &&
            murallaRow < initialRows &&
            murallaCol >= 0 &&
            murallaCol < initialCols
          ) {
            const auxMuralla = JSON.parse(JSON.stringify(Muralla));
            aux[murallaRow][murallaCol] = {
              ...auxMuralla,
              x: murallaRow,
              y: murallaCol,
              bando: "enemigo",
            };
          }
        }
      }
    }

    // Colocar al héroe enemigo en una posición aleatoria en la parte derecha
    const { row: enemyHeroRow, col: enemyHeroCol } = getRandomPosition(
      initialRows,
      initialCols,
      aux,
      middleCol,
      initialCols
    );
    const auxEnemyBarbarian = JSON.parse(JSON.stringify(Barbarian));
    aux[enemyHeroRow][enemyHeroCol] = {
      ...auxEnemyBarbarian,
      x: enemyHeroRow,
      y: enemyHeroCol,
      bando: "enemigo",
    };

    // Colocar un Constructor enemigo en una posición aleatoria en la parte derecha
    const { row: enemyBuilderRow, col: enemyBuilderCol } = getRandomPosition(
      initialRows,
      initialCols,
      aux,
      middleCol,
      initialCols
    );
    const auxEnemyConstructor = JSON.parse(JSON.stringify(Constructor));
    aux[enemyBuilderRow][enemyBuilderCol] = {
      ...auxEnemyConstructor,
      x: enemyBuilderRow,
      y: enemyBuilderCol,
      bando: "enemigo",
    };

    setBoardMatrix(aux);
    setIsLoading(false); // Marcar como cargado después de establecer el tablero
  }, []);

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
