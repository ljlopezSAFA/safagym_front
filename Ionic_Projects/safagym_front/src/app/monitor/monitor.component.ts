import { Component, OnInit } from '@angular/core';
import {MonitorService} from "../service/monitor.service";
import {Monitor} from "../modelos/Monitor";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonList, IonGrid, IonCol, IonRow
} from '@ionic/angular/standalone';
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonList, IonGrid, IonCol, IonRow, CommonModule, HeaderComponent],
  providers: [MonitorService]
})
export class MonitorComponent  implements OnInit {

  monitores: Monitor[] =[];

  constructor(private service: MonitorService) {}

  ngOnInit(): void {
    this.service.obtenerDatos().subscribe({
      next: (d) => this.monitores = d,
      error: (e) => console.error(e),
      complete: () => console.info("Éxito")
    });
  }

}
