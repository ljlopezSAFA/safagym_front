import {Cliente} from "./Cliente";
import {TipoAbono} from "./TipoAbono";


export class Abono{
  id?:number;
  codigo?:string;
  fechaInicio?:string;
  fechaCaducidad?:string;
  cliente?:Cliente;
  tipoAbono?:TipoAbono;
}
