import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clase} from "../modelos/Clase";
import {LoginService} from "./login.service";
import {RegistroCliente} from "../modelos/RegistroCliente";

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private apiUrl = '/api/clase';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  obtenerPorFecha(fecha:string): Observable<Clase[]> {

    const options = this.loginService.autorizarPeticion();

    return this.http.get<Clase[]>(`${this.apiUrl}`+ '/fecha?fecha=' +fecha, options);
  }

  asitir(idClase:number): Observable<any>{
    const options = this.loginService.autorizarPeticion();

    return this.http.post(this.apiUrl+ "/join/" + idClase , [], options);

  }


  borrarse(idClase:number): Observable<any>{
    const options = this.loginService.autorizarPeticion();

    return this.http.post(this.apiUrl+ "/abandon/" + idClase , [], options);

  }


  guardarNuevaClase(data:Clase): Observable<any>{
    const options = this.loginService.autorizarPeticion();
    return this.http.post(this.apiUrl, data, options);
  }




}
