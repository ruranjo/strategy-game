export interface BaseProperties {
    // Common properties for all character types can go here if needed
  }

export interface TreeProperties extends BaseProperties {
    height: number;
    age: number;
  }
  
  export interface HeroProperties  extends BaseProperties {
    superpower: string;
    strength: number;
  }
  
export interface Character<T extends BaseProperties> {
    id: number;
    name: string;
    role: string;
    imgCode:string;
    x: number;
    y: number;
    properties: T;
}