export interface BaseProperties {
    // Common properties for all character types can go here if needed
    
  }

export interface TreeProperties extends BaseProperties {
    height: number;
    age: number;
  }
  
  export interface BuildingProperties extends BaseProperties {
    // Puedes agregar propiedades comunes a todos los edificios si es necesario
  }

  export interface BarracaProperties extends BuildingProperties {
    // Propiedades específicas de la Barraca
    trainingCapacity: number;
    troopType: string; // Tipo de tropa que entrena
  }


export interface MurallaProperties extends BuildingProperties {
  // Propiedades específicas de la Muralla
  defenseStrength: number;
  height: number; // Altura de la muralla en metros
}

export interface MinaDeOroProperties extends BuildingProperties {
  // Propiedades específicas de la Mina de Oro
  productionRate: number; // Tasa de producción de oro por hora
  capacity: number; // Capacidad máxima de almacenamiento de oro
}

export interface AyuntamientoProperties extends BuildingProperties {
  // Propiedades específicas del Ayuntamiento
  administrativeLevel: number; // Nivel administrativo del Ayuntamiento
  publicServices: string[]; // Servicios públicos ofrecidos por el Ayuntamiento
}

export interface BuilderProperties extends BaseProperties {
  constructionSpeed: number;
}
  
export interface Character<T extends BaseProperties> {
    id:number;
    name: string;
    role: string;
    imgCode:string;
    x: number;
    y: number;
    description:string;
    properties: T;
}