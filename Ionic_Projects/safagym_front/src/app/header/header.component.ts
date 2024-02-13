import {Component, createComponent, OnInit} from '@angular/core';
import {IonicModule, MenuController, ModalController} from "@ionic/angular";
import {IonApp} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline} from "ionicons/icons";
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  exportAs: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [IonApp,IonicModule, LoginComponent, CommonModule],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit  {

   logueado: boolean = false;

  constructor(private service: LoginService, private router:Router ) {
    addIcons({personOutline})
  }

  ngOnInit(): void {
    this.logueado = this.service.logueado();
  }

  logout(){
   this.service.logout();
  }




}
