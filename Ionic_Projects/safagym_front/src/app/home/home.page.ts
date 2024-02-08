import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonApp,
  IonMenu,
  IonList, IonItem, IonRouterOutlet, IonMenuButton, IonImg, IonGrid,IonRow, IonCol, IonLabel,
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../header/header.component";



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonApp,IonMenu,IonHeader, IonList,IonItem,
    IonRouterOutlet,IonMenuButton,IonToolbar, IonTitle,
    IonContent, IonButtons, IonButton, IonIcon, IonImg,
    IonGrid, IonRow, IonCol, IonLabel, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
