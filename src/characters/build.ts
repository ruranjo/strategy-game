import { AlmacenDeOroProperties, AyuntamientoProperties, BarracaProperties, Character, MinaDeOroProperties, MurallaProperties } from "../types/character.type";

  export const Ayuntamiento: Character<AyuntamientoProperties> = {
    id: 5,
    name: 'Ayuntamiento',
    role: 'building',
    imgCode: '🏛️',
    description: 'Centro neurálgico de tu aldea',
    x:0,
    y:0,
    properties: {
        cost: 150,
        administrativeLevel:1,
        publicServices:["hola"]
    }
  };
  
  export const Barraca: Character<BarracaProperties> = {
    id: 2,
    name: 'Barraca',
    role: 'building',
    imgCode: '⚔️',
    x:0,
    y:0,
    description: 'Entrenas tropas para ataques',
    properties: {
        trainingCapacity:1 ,
        troopType:"",
        cost: 150,
    }
  };
  
  export const Muralla: Character<MurallaProperties> = {
    id: 3,
    name: 'Muralla',
    role: 'building',
    imgCode: '🧱',
    x:0,
    y:0,
    description: 'Protege tu aldea de ataques enemigos',
    properties: {
        defenseStrength: 1 ,
        height:1,
        cost: 150,
    }
  };
  
  export const MinaDeOro: Character<MinaDeOroProperties> = {
    id: 4,
    name: 'Mina de oro',
    role: 'building',
    imgCode: '⛏️',
    x:0,
    y:0,
    description: 'Genera oro, moneda principal',
    properties: {
      cost: 150,              // Costo inicial de construcción
      productionRate: 1,    // Producción inicial de oro por hora
      capacity: 500,          // Capacidad inicial de almacenamiento de oro
      timeToFullCapacity: 1, // Tiempo en minutos para alcanzar la capacidad máxima
      buildDate: new Date(),  // Fecha y hora actuales
      isFull: false,          // Indicador inicial de si la mina está llena
      currentGold: 0          // Cantidad inicial de oro almacenado
    }
  };
  
  

export const AlmacenDeOro: Character<AlmacenDeOroProperties> = {
  id: 1,
  name: 'Almacén de Oro',
  role: 'Almacen',
  imgCode: '💰',
  x: 0,
  y: 0,
  description: 'Un almacén para guardar oro.',
  properties: {
    cost: 500, // Ejemplo de costo en oro para construir el almacén
    capacity: 1000, // Ejemplo de capacidad máxima de almacenamiento de oro
  },
  
};


