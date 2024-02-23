import {Component, OnInit} from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FormsModule} from "@angular/forms";
import {Monitor} from "../modelos/Monitor";
import {MonitorService} from "../service/monitor.service";
import {MensajeService} from "../service/mensaje.service";
import {EnvioMensaje, Mensaje} from "../modelos/Mensaje";

@Component({
  selector: 'app-entrenador-personal',
  templateUrl: './entrenador-personal.component.html',
  styleUrls: ['./entrenador-personal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule],
  providers: []
})
export class EntrenadorPersonalComponent  implements OnInit {

  items:any = [];
  entrenador?: Monitor;
  limit:number;
  receptor:number;
  offset:number;
  mensajes:Mensaje[] = [];
  texto:string = "";

  constructor(private serviceMonitor: MonitorService, private serviceMensaje: MensajeService) {
    this.limit = 10;
    this.offset = 0;
    this.receptor = 0;
  }


  ngOnInit() {
    this.getEntrenadorPersonal();
    this.getMensajes(false);
  }

  getMensajes(adicionales: boolean) {
    if (!adicionales) {
      this.mensajes = [];
    }
    this.serviceMensaje.listarPorReceptor(this.receptor, this.limit, this.offset).subscribe({
      next: (l) => {
        l.forEach(m => this.mensajes.unshift(m));
      }
    });
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    if(this.mensajes.length ==10){
      this.offset = this.offset +10;
      this.getMensajes(true);
    }
  }

  enviarMensaje(){
    if(this.texto != ""){
      let envioMensaje = new EnvioMensaje();
      envioMensaje.texto = this.texto;
      envioMensaje.receptor = this.receptor;
      this.serviceMensaje.enviar(envioMensaje).subscribe({
        complete:()=> {
          this.getMensajes(false);
          this.texto='';
        },
        }
      );
    }
  }


  solicitarEntrenadorPersonal(){
    this.serviceMonitor.solitarEntrenadorPersonal().subscribe({
      next: (e) => this.getEntrenadorPersonal(),
      error: (e) => console.error(e),
    });
  }

  getEntrenadorPersonal(){
    this.serviceMonitor.getEntrenadorPersonal().subscribe({
      next: (e) => {
        this.entrenador = e;
        if(e && e.usuario?.id){
          this.receptor = e.usuario.id;
          this.getMensajes(false);
        }
      },
      error: (e) => console.error(e),
    });
  }

}
