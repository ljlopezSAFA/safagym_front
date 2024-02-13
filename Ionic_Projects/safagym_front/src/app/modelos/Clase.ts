import {Monitor} from "./Monitor";
import {Cliente} from "./Cliente";


export class Clase{
  id?:number;
  nombre?:string;
  aforo?:number;
  duracion?:number;
  fecha?:any;
  asistentes?:number;
  monitor?: Monitor;
  clientes?: Cliente[];
}
