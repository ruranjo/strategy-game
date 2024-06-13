import React, { useEffect } from 'react';
import useGameStore from './store/store';
import { GameMap } from './components';



const App: React.FC = () => {
  // Utiliza el hook useBoardStore para acceder a setBoardSize desde el store
  const { setBoardSize } = useGameStore();

  // Definimos las filas y columnas iniciales
  const initialRows = 20;
  const initialCols = 30;

  // Llamamos a setBoardSize para inicializar el tamaño del tablero cuando App se monte
  useEffect(() => {
    setBoardSize(initialRows, initialCols);
  }, [setBoardSize]); // Asegúrate de que setBoardSize sea una dependencia de useEffect si usas eslint-react-hooks

  return (
    <div className="App">
      <h1>Tablero de Juego</h1>
      <GameMap /> {/* Renderizamos el componente GameMap */}
    </div>
  );
};

export default App;
