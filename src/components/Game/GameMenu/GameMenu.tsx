import React, { useEffect, useState } from 'react';
import useGameStore from '../../../store/GameStore';


import { BaseProperties, Character } from '../../../types/character.type';
import { Ayuntamiento, Barraca, MinaDeOro, Muralla } from '../../../characters/build';
import useBoardStore from '../../../store/BoardStore';

interface GameMenuProps {}

interface MonitorItem {
  label: string;
  emoji: string;
  value: number;
}

interface DynamicMenuItem {
  label: string;
  emoji: string;
  content: React.ReactNode;
}

const GameMenu: React.FC<GameMenuProps> = () => {
  const { gold, builders, heroes, selectedCharacter, isSelected, selectedCell, resetSelection, setSelectedCharacter } = useGameStore((state) => ({
    gold: state.gold,
    builders: state.builders,
    heroes: state.heroes,
    selectedCharacter: state.selectedCharacter,
    isSelected: state.isSelected,
    resetSelection: state.resetSelection,
    selectedCell: state.selectedCell,
    setSelectedCharacter: state.setSelectedCharacter
  }));
  const { enablePushMode } = useBoardStore((state) =>({
    enablePushMode: state.enablePushMode
  })

)

  useEffect(()=>{
    console.log("ha cambiado el isSelecte:")
    console.log(isSelected)
    
  },[isSelected])

  const monitorItems: MonitorItem[] = [
    { label: 'ORO', emoji: '💰', value: gold },
    { label: 'CONSTRUCTORES', emoji: '👨‍🌾', value: builders },
    { label: 'HEROES', emoji: '⚔️', value: heroes },
  ];

  const staticMenuItems: { label: string; emoji: string }[] = [
    { label: 'OPCIONES', emoji: '⚙️' },
    { label: 'TERMINAR', emoji: '🏁' },
    { label: 'GUARDAR', emoji: '💾' },
  ];

  const dynamicMenuItems: DynamicMenuItem[] = [
    { 
      label: 'CREAR EDIFICIOS', 
      emoji: '🏠', 
      content: (
        <div className="bg-orange-800 rounded-md text-green-900 font-bold ">
  
  <div className="grid grid-cols-2 gap-1">
    <button
      className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center"
      onClick={() => handleBuildingClick(Ayuntamiento)}
    >
      🏛️ Ayuntamiento
    </button>
    <button
      className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center"
      onClick={() => handleBuildingClick(Barraca)}
    >
      ⚔️ Barraca
    </button>
    <button
      className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center"
      onClick={() => handleBuildingClick(Muralla)}
    >
      🧱 Muralla
    </button>
    <button
      className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center"
      onClick={() => handleBuildingClick(MinaDeOro)}
    >
      ⛏️ Mina de oro
    </button>
  </div>
  
  <button
    className="mt-2 bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-1 rounded shadow-md"
    onClick={() => setActiveDynamicMenuItem(null)}
  >
    Volver
  </button>
</div>


      ),
    },
    { 
      label: 'ESTADÍSTICAS DEL HÉROE', 
      emoji: '📊', 
      content: (
        <div>
          <p>Contenido para estadísticas del héroe.</p>
          <button onClick={() => setActiveDynamicMenuItem(null)}>Volver</button>
        </div>
      ),
    },
    { 
      label: 'ECONOMÍA', 
      emoji: '💰', 
      content: (
        <div>
          <p>Contenido para economía.</p>
          <button onClick={() => setActiveDynamicMenuItem(null)}>Volver</button>
        </div>
      ),
    },
  ];

  const [activeDynamicMenuItem, setActiveDynamicMenuItem] = useState<DynamicMenuItem | null>(null);

  const handleDynamicMenuItemClick = (item: DynamicMenuItem) => {
    setActiveDynamicMenuItem(item);
  };

  const handleBuildingClick = (building: Character<BaseProperties>) => {
    setSelectedCharacter(building);
    setActiveDynamicMenuItem(null);
    enablePushMode() // Close dynamic menu after selection
  };

  const renderMonitors = () => {
    return (
      <div className="flex flex-col w-1/4 bg-orange-800 rounded-md text-white font-medium p-2">
        {monitorItems.map((item, index) => (
          <div key={index} className="bg-brown-600 p-2 rounded">
            <span role="img" aria-label={item.label}>{item.emoji}</span> {item.label}: {item.value}
          </div>
        ))}
      </div>
    );
  };

  const renderCentralMenuContent = () => {
    if (isSelected && selectedCharacter) {
      return (
        <div>
          <p>Has seleccionado: {selectedCharacter.name}</p>
          <button onClick={()=> {resetSelection()}}>
            Volver al menú principal
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>No has seleccionado nada</p>
          <button onClick={resetSelection}>Volver al menú principal</button>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center items-center border bg-orange-900 gap-2 text-black p-2 fixed bottom-0 left-0 right-0">
      {/* Sección izquierda: Monitores */}
      <div className='flex gap-4 w-4/6 justify-between bg-white p-2 rounded-md'>
        {renderMonitors()}

        {/* Sección central: Menú dinámico */}
        <div className="w-1/2 flex flex-col text-center bg-orange-800 rounded-md text-green-900 font-bold p-2">
          {isSelected ? (
            <div className="flex flex-col bg-orange-800 rounded-md text-green-900 font-bold gap-1">
              {renderCentralMenuContent()}
            </div>
          ) : (
            <div className="flex flex-col bg-orange-800 rounded-md text-green-900 font-bold gap-1">
              {activeDynamicMenuItem ? (
                <div className="flex flex-col bg-orange-800 rounded-md text-green-900 font-bold gap-1">
                  {activeDynamicMenuItem.content}
                </div>
              ) : (
                <div className="flex flex-col bg-orange-800 rounded-md text-green-900 font-bold gap-1">
                  {dynamicMenuItems.map((item, index) => (
                    <button
                      key={index}
                      className="bg-orange-300 p-2 rounded hover:bg-orange-400 focus:bg-orange-400 shadow-md"
                      onClick={() => handleDynamicMenuItemClick(item)}
                    >
                      {item.emoji} {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sección derecha: Opciones del juego */}
        <div className="w-1/4 flex flex-col bg-orange-800 rounded-md text-green-900 font-bold p-2 gap-1">
          {staticMenuItems.map((item, index) => (
            <button
              key={index}
              className="bg-orange-300 p-2 rounded hover:bg-orange-400 focus:bg-orange-400 shadow-md"
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
