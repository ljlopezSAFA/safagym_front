export class Mensaje{
  id?:number;
  texto?:string;
  fecha?:string;
  emisor?: number;
  receptor?: number;
}

export class EnvioMensaje{
  texto?:string;
  receptor?: number;
}
