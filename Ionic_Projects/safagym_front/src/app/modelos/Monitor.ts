import {Usuario} from "./Usuario";


export class Monitor{
  id?:number;
  nombre?:string;
  apellidos?:string;
  dni?:string;
  fechaNacimiento?:string;
  foto?:string;
  usuario?: Usuario;
}
