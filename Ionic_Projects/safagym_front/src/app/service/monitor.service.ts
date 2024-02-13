import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Monitor} from "../modelos/Monitor";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private apiUrl = '/api/monitor';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  obtenerDatos(): Observable<Monitor[]> {

    const options = this.loginService.autorizarPeticion();

    return this.http.get<Monitor[]>(`${this.apiUrl}`, options);
  }
}
