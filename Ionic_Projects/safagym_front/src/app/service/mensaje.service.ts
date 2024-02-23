import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {EnvioMensaje, Mensaje} from "../modelos/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private sendurl = '/api/mensaje/enviar';
  private listurl = '/api/mensaje/receptor';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  listarPorReceptor(recetor:number, limit:number, offset:number): Observable<Mensaje[]> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Mensaje[]>(`${this.listurl}`+"?receptor="+recetor+"&limit="+limit+"&offset="+offset, options);
  }


  enviar(mensaje: EnvioMensaje):  Observable<any>{
    const options = this.loginService.autorizarPeticion();
    return this.http.post(`${this.sendurl}`+"?XDEBUG_SESSION_START=11703",mensaje ,options)
  }


}
