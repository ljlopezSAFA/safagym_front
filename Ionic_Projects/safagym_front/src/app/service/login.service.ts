import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../modelos/Login";
import {RegistroCliente} from "../modelos/RegistroCliente";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLoginUrl = '/api/login_check';
  private apiRegistroUrl = '/api/registro/cliente';

  constructor(private http: HttpClient, private router: Router) {}

  login(login:Login): Observable<any> {
    return this.http.post(this.apiLoginUrl,login);
  }

  logueado(): boolean {
    let token = localStorage.getItem('token');
    return !!(token && token != '');
  }

  registrarCliente(data:RegistroCliente): Observable<any>{
    return this.http.post(this.apiRegistroUrl, data);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  autorizarPeticion(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers:headers}
  }





}
