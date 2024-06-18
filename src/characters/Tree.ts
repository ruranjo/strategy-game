import { Character, TreeProperties } from "../types/character.type";

export const Tree:Character<TreeProperties> = {
    id:1,
    name:'arbol',
    role:'arbol',
    imgCode:'🌳',
    x:0,
    y:0,
    description:'',
    properties:{
        age:1,
        height:1,
    },
    type: 'decoracion'
}