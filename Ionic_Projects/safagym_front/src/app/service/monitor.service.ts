import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Monitor} from "../modelos/Monitor";
import {LoginService} from "./login.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private baseUrl = environment.baseURL;
  private apiUrl = '/api/monitor';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  obtenerDatos(): Observable<Monitor[]> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor[]>(`${this.baseUrl}${this.apiUrl}`, options);
  }

  solitarEntrenadorPersonal(): Observable<Monitor>{
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor>(`${this.baseUrl}${this.apiUrl}`+"/personal", options);
  }

  getEntrenadorPersonal(): Observable<Monitor>{
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor>(`${this.baseUrl}${this.apiUrl}`+"/personal/get", options);
  }

}
