import {Component, OnInit} from '@angular/core';
import {MonitorService} from "../service/monitor.service";
import {Monitor} from "../modelos/Monitor";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {addIcons} from 'ionicons';
import {calendarNumberOutline, idCardOutline} from "ionicons/icons";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent],
  providers: [MonitorService]
})
export class MonitorComponent  implements OnInit {

  monitores: Monitor[] =[];
  tarjetaVolteada: boolean = false;

  constructor(private service: MonitorService) {
    addIcons({calendarNumberOutline,idCardOutline})
  }

  ngOnInit(): void {
    this.service.obtenerDatos().subscribe({
      next: (d) => this.monitores = d,
      error: (e) => console.error(e),
      complete: () => console.info("Éxito")
    });
  }

  voltearTarjeta() {
    this.tarjetaVolteada = !this.tarjetaVolteada;
  }

}
