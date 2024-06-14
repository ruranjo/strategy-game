import React from 'react';
import useGameStore from '../../../store/GameStore';


interface GameMenuProps {
  children?: React.ReactNode;
}

const GameMenu: React.FC<GameMenuProps> = ({ children }) => {
  const { gold, villagers, warriors } = useGameStore((state) => ({
    gold: state.gold,
    villagers: state.villagers,
    warriors: state.warriors,
  }));

  return (
    <div className="flex justify-center items-center border bg-orange-900 gap-4  text-black p-4 fixed bottom-0 left-0 right-0">
      {/* Sección izquierda: Monitores */}
      <div className='flex gap-4 bg-white p-4 rounded-md'>
        <div className="flex flex-col bg-orange-800 ">
          <div className="bg-brown-600 p-2 rounded">Oro: {gold}</div>
          <div className="bg-brown-600 p-2 rounded">Aldeanos: {villagers}</div>
          <div className="bg-brown-600 p-2 rounded">Guerreros: {warriors}</div>
        </div>

        {/* Sección central: Menú dinámico */}
        <div className="flex flex-col  text-center bg-orange-800">
          {children ? (
            children
          ) : (
            <div className="flex flex-col bg-orange-800">
              <button className="bg-brown-500 p-2 rounded">Crear Edificios</button>
              <button className="bg-brown-500 p-2 rounded">Estadísticas del Héroe</button>
              <button className="bg-brown-500 p-2 rounded">Economía</button>
            </div>
          )}
        </div>

        {/* Sección derecha: Opciones del juego */}
        <div className="flex flex-col bg-orange-800">
          <button className="bg-brown-500 p-2 rounded">Opciones</button>
          <button className="bg-brown-500 p-2 rounded">Terminar</button>
          <button className="bg-brown-500 p-2 rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
