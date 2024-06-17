import React, { useEffect, useState } from 'react';
import useGameStore from '../../../store/GameStore';
import { BuildingProperties, Character, MinaDeOroProperties } from '../../../types/character.type';
import { AlmacenDeOro, Barraca, MinaDeOro, Muralla } from '../../../characters/build';
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
  const {
    gold,
    goldTotalCapacity,
    builders,
    heroes,
    selectedCharacter,
    setSelectedBuild,
    selectedBuild,
    isSelected,
    selectedCell,
    resetSelection,
    setSelectedCharacter,
    goldMines,
    updateResources,
  } = useGameStore((state) => ({
    gold: state.gold,
    goldTotalCapacity: state.goldTotalCapacity,
    builders: state.builders,
    heroes: state.heroes,
    selectedCharacter: state.selectedCharacter,
    setSelectedBuild: state.setSelectedBuild,
    selectedBuild: state.selectedBuild,
    isSelected: state.isSelected,
    resetSelection: state.resetSelection,
    selectedCell: state.selectedCell,
    setSelectedCharacter: state.setSelectedCharacter,
    goldMines: state.goldMines,
    updateResources: state.updateResources,
  }));

  const { enablePushMode } = useBoardStore((state) => ({
    enablePushMode: state.enablePushMode
  }));

  useEffect(() => {
    console.log("ha cambiado el isSelected:");
    console.log(isSelected);
  }, [isSelected]);

  useEffect(() => {
    const interval = setInterval(() => {
      let totalGoldProduced = 0;

      goldMines.forEach((mine) => {
        const properties = mine.properties as MinaDeOroProperties;
        const currentTime = new Date();
        const buildTime = new Date(properties.buildDate);
        const timeElapsedInSeconds = (currentTime.getTime() - buildTime.getTime()) / 1000;
        const timeToFullCapacityInSeconds = properties.timeToFullCapacity * 60;
        let goldGenerated;

        if (timeElapsedInSeconds >= timeToFullCapacityInSeconds) {
          goldGenerated = properties.capacity; // Si el tiempo transcurrido supera el tiempo para capacidad máxima, está lleno
        } else {
          goldGenerated = properties.capacity * (timeElapsedInSeconds / timeToFullCapacityInSeconds);
        }

        // Asegurar que el oro generado no exceda la capacidad máxima de la mina
        goldGenerated = Math.min(goldGenerated, properties.capacity);

        totalGoldProduced += goldGenerated;
      });

      // Calcular el nuevo valor de oro sin exceder la capacidad total
      const newGold = Math.min(gold + totalGoldProduced, goldTotalCapacity);

      updateResources(newGold, builders, heroes);
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [goldMines, gold, goldTotalCapacity, updateResources, builders, heroes]);

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

  const buildingMenu: DynamicMenuItem = {
    label: 'CREAR EDIFICIOS',
    emoji: '🏠',
    content: (
      <div className="bg-orange-800 rounded-md text-green-900 font-bold ">
        <div className="grid grid-cols-2 gap-1">
          <button
            className={`bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center ${gold < AlmacenDeOro.properties.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleBuildingClick(AlmacenDeOro)}
            disabled={gold < AlmacenDeOro.properties.cost}
          >
            {AlmacenDeOro.imgCode} {AlmacenDeOro.name} costo: {AlmacenDeOro.properties.cost}
          </button>
          <button
            className={`bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center ${gold < Barraca.properties.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleBuildingClick(Barraca)}
            disabled={gold < Barraca.properties.cost}
          >
            {Barraca.imgCode} {Barraca.name} costo: {Barraca.properties.cost}
          </button>
          <button
            className={`bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center ${gold < Muralla.properties.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleBuildingClick(Muralla)}
            disabled={gold < Muralla.properties.cost}
          >
            {Muralla.imgCode} {Muralla.name} costo: {Muralla.properties.cost}
          </button>
          <button
            className={`bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md flex items-center justify-center ${gold < MinaDeOro.properties.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleBuildingClick(MinaDeOro)}
            disabled={gold < MinaDeOro.properties.cost}
          >
            {MinaDeOro.imgCode} {MinaDeOro.name} costo: {MinaDeOro.properties.cost}
          </button>
        </div>

        <button
          className="mt-2 bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-1 rounded shadow-md"
          onClick={() => {
            setActiveDynamicMenuItem(null)
            resetSelection();

          }
          }
        >
          Volver
        </button>
      </div>
    ),
  };

  const dynamicMenuItems: DynamicMenuItem[] = [

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
      emoji: '⚖️',
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

  const handleBuildingClick = (building: Character<BuildingProperties>) => {
    if (gold >= building.properties.cost) {
      console.log("setSelectedBuild(building);");
      console.log(building);
      setSelectedBuild(building);
      setActiveDynamicMenuItem(null);
      enablePushMode(); // Enable push mode after selection
    } else {
      alert('No tienes suficiente oro para seleccionar este edificio.');
    }
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
      if (selectedCharacter.name === 'Mina de oro') {
        const { currentGold, productionRate, capacity, timeToFullCapacity, buildDate } = selectedCharacter.properties as MinaDeOroProperties;

        // Calcular el tiempo transcurrido en segundos desde la fecha de construcción hasta la fecha actual
        const currentTime = new Date();
        const buildTime = new Date(buildDate);
        const timeElapsedInSeconds = (currentTime.getTime() - buildTime.getTime()) / 1000;

        // Convertir timeToFullCapacity a segundos
        const timeToFullCapacityInSeconds = timeToFullCapacity * 60;

        // Calcular el oro generado
        let goldGenerated;
        console.log("timeElapsedInSeconds: ",timeElapsedInSeconds, "timeToFullCapacityInSeconds: ",timeToFullCapacityInSeconds, timeElapsedInSeconds >= timeToFullCapacityInSeconds)
        if (timeElapsedInSeconds >= timeToFullCapacityInSeconds) {
          goldGenerated = capacity; // Si el tiempo transcurrido supera el tiempo para capacidad máxima, está lleno
        } else {
          goldGenerated = capacity * (timeElapsedInSeconds/timeToFullCapacityInSeconds);
        }

        // Asegurar que el oro generado no exceda la capacidad máxima
        goldGenerated = Math.min(goldGenerated, capacity);

        return (
          <div className="flex flex-col md:flex-row bg-orange-800 rounded-md text-green-300 font-bold gap-4 p-4 shadow-lg">
            <div className="w-full md:w-1/2">
              <p className="text-center text-sm">Detalles de la Mina de Oro:</p>
              <div className="bg-orange-700 text-sm rounded-md shadow-inner">
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="pr-2">💰 Oro actual:</td>
                      <td>{currentGold}</td>
                    </tr>
                    <tr>
                      <td className="pr-2">🏭 Tasa de producción:</td>
                      <td>{productionRate} oro/segundo</td>
                    </tr>
                    <tr>
                      <td className="pr-2">🏦 Capacidad de almacenamiento:</td>
                      <td>{capacity}</td>
                    </tr>
                    <tr>
                      <td className="pr-2">🕒 Oro generado hasta ahora:</td>
                      <td>{goldGenerated}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center">
              <button
                onClick={() => {
                  // Implementa aquí la lógica para retirar fondos de la Mina de Oro
                  console.log('Retirar fondos de la Mina de Oro');
                  // Puedes realizar acciones adicionales aquí, como actualizar el estado del juego
                }}
                className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md mt-2 md:mt-0"
              >
                Retirar Fondos
              </button>
              <button
                onClick={resetSelection}
                className="bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-green-900 p-2 rounded shadow-md mt-2"
              >
                Volver al Menú Principal
              </button>
            </div>
          </div>
        );
        
      } else if (selectedCharacter.role === 'builder') {
        // Menú para el constructor
        return (
          <div className="flex flex-col bg-orange-800 rounded-md text-green-900 font-bold gap-1">
            {buildingMenu.content}
          </div>
        );
      } else {
        // Otra lógica para personajes seleccionados que no son constructores
        return (
          <div>
            <p>Has seleccionado: {selectedCharacter.name}</p>
            <button onClick={resetSelection}>
              Volver al menú principal
            </button>
          </div>
        );
      }
    } else {
      // Mensaje cuando no se ha seleccionado ningún personaje
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
