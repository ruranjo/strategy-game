import { Character, HeroProperties } from "../types/character.type";

// Definiendo los héroes
export const BarbarianKing: Character<HeroProperties> = {
    id: 6,
    name: 'Barbarian King',
    role: 'hero',
    imgCode: '🤴',
    x: 0,
    y: 0,
    description: 'A powerful warrior hero with strong attacks.',
    properties: {
        health: 2000,
        attackDamage: 150,
        specialAbility: 'Iron Fist',
    },
    type: 'ser', // Ejemplo de tipo para un héroe
};

export const ArcherQueen: Character<HeroProperties> = {
    id: 7,
    name: 'Archer Queen',
    role: 'hero',
    imgCode: '🏇',
    x: 0,
    y: 0,
    description: 'A ranged hero with deadly accuracy.',
    properties: {
        health: 1500,
        attackDamage: 200,
        specialAbility: 'Royal Cloak',
    },
    type: 'ser', // Ejemplo de tipo para un héroe
};

export const GrandWarden: Character<HeroProperties> = {
    id: 8,
    name: 'Grand Warden',
    role: 'hero',
    imgCode: '🤺',
    x: 0,
    y: 0,
    description: 'A mystical hero who can protect troops.',
    properties: {
        health: 1800,
        attackDamage: 100,
        specialAbility: 'Life Aura',
    },
    type: 'ser', // Ejemplo de tipo para un héroe
};

// Definición del personaje Bárbaro
export const Barbarian: Character<HeroProperties> = {
    id: 9,
    name: 'Bárbaro',
    role: 'troop',
    imgCode: '🏌️‍♂️',
    x: 0,
    y: 0,
    description: 'Un poderoso guerrero cuerpo a cuerpo.',
    properties: {
        health: 300,
        attackDamage: 50,
        specialAbility: '',
    },
    type: 'ser', // Tipo específico para una tropa
};
