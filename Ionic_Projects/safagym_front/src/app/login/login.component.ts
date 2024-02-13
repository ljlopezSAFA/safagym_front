import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {keyOutline, personOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Login} from "../modelos/Login";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports:[IonicModule, FormsModule],
  providers:[LoginService]
})
export class LoginComponent implements  OnInit {

  username: string = '';
  password: string = '';
  login:Login =  new Login();

  constructor(private service: LoginService, private router: Router) {
    addIcons({personOutline, keyOutline})
    localStorage.clear();
  }

  iniciarSesion() {
    this.login.username = this.username;
    this.login.password = this.password;
    this.service.login(this.login).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if(respuesta.token != null){
          localStorage.setItem('token' , respuesta.token);
          localStorage.setItem('username', this.username),
          this.router.navigate(['home']);
        }

      },
      error: (e) => console.error(e),

    });
  }

  ngOnInit(): void {
    this.username='';
    this.password='';
  }


}
