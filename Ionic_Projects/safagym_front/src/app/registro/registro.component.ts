import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {RegistroCliente} from "../modelos/RegistroCliente";
import {addIcons} from "ionicons";
import {idCardOutline, keyOutline, person, personCircleOutline, personOutline} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
  providers: [LoginService]
})
export class RegistroComponent implements OnInit {

  registroCliente: RegistroCliente = new RegistroCliente();
  nombre: string = '';
  apellidos: string = '';
  dni: string = '';
  fecha: string = '';
  username: string = '';
  password: string = '';

  constructor(private service: LoginService, private router:Router) {
    addIcons({
      personOutline,
      keyOutline,
      idCardOutline,
      person,
      personCircleOutline
    })
  }

  ngOnInit() {
    this.rellenarDatos();
  }

  completarRegistro() {
    this.rellenarDatos();
    this.service.registrarCliente(this.registroCliente).subscribe({
      next:(v) => console.log(v),
      error: (e) =>console.error(e),
      complete: () =>  this.router.navigate(['/login']),
    });
  }

  rellenarDatos() {
    this.registroCliente.nombre = this.nombre;
    this.registroCliente.apellidos = this.apellidos;
    this.registroCliente.dni = this.dni;
    this.registroCliente.fecha = this.fecha;
    this.registroCliente.username = this.username;
    this.registroCliente.password = this.password;
  }

}
