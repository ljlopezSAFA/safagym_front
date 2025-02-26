import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Monitor} from "../modelos/Monitor";
import {LoginService} from "./login.service";
import {TipoAbono} from "../modelos/TipoAbono";
import {Abono} from "../modelos/Abono";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  private baseUrl = environment.baseURL;
  private abonoUrl = '/api/abono/cliente';
  private tipoAbonoUrl = '/api/tipo/abono';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  listarTipoAbonos(): Observable<TipoAbono[]> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<TipoAbono[]>(`${this.baseUrl}${this.tipoAbonoUrl}`, options);
  }

  abonoUsuarioLogueado(): Observable<Abono> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Abono>(`${this.baseUrl}${this.abonoUrl}`, options);
  }

  ultimoAbonoPasadoUsuarioLogueado(): Observable<Abono> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Abono>(`${this.baseUrl}${this.abonoUrl}`+"/last", options);
  }

  contratarRenovarAbono(idTipoAbono: number):  Observable<any>{
    const options = this.loginService.autorizarPeticion();
    return this.http.post(`${this.baseUrl}${this.abonoUrl}`+ "?tipoAbono=" +idTipoAbono,[] ,options)
  }


}
