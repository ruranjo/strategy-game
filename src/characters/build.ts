import { AyuntamientoProperties, BarracaProperties, Character, MinaDeOroProperties, MurallaProperties } from "../types/character.type";

  export const Ayuntamiento: Character<AyuntamientoProperties> = {
    id: 5,
    name: 'Ayuntamiento',
    role: 'building',
    imgCode: '🏛️',
    description: 'Centro neurálgico de tu aldea',
    x:0,
    y:0,
    properties: {
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
        capacity: 1,
        productionRate: 1
    }
  };
  