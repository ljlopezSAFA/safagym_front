import {Servicio} from "./Servicio";


export class TipoAbono{
  id?:number;
  descripcion?:string;
  precio?:number;
  servicios?: Servicio[];


  equals(otraInstancia: TipoAbono): boolean {
    return this.id === otraInstancia.id ;
  }
}
