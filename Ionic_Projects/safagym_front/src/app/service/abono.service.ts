import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Monitor} from "../modelos/Monitor";
import {LoginService} from "./login.service";
import {TipoAbono} from "../modelos/TipoAbono";
import {Abono} from "../modelos/Abono";

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  private abonoUrl = '/api/abono/cliente';
  private tipoAbonoUrl = '/api/tipo/abono';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  listarTipoAbonos(): Observable<TipoAbono[]> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<TipoAbono[]>(`${this.tipoAbonoUrl}`, options);
  }

  abonoUsuarioLogueado(): Observable<Abono> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Abono>(`${this.abonoUrl}`, options);
  }

  contratarRenovarAbono(idTipoAbono: number):  Observable<Abono>{
    const options = this.loginService.autorizarPeticion();
    return this.http.post(`${this.abonoUrl}`+ "?tipoAbono=" +idTipoAbono+ "&XDEBUG_SESSION_START=13368",[] ,options)
  }


}
