import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {Abono} from "../modelos/Abono";
import {addIcons} from "ionicons";
import {calendarOutline, happyOutline, sadOutline} from "ionicons/icons";
import {AbonoService} from "../service/abono.service";
import {TipoAbono} from "../modelos/TipoAbono";
import {Servicio} from "../modelos/Servicio";
import {FormsModule} from "@angular/forms";
import {ToastController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.scss'],
  standalone:true,
  imports:[HeaderComponent, CommonModule, IonicModule, FormsModule],
  providers:[]
})
export class AbonoComponent  implements OnInit {

  abono:Abono;
  tipoAbono: TipoAbono;
  servicios: Servicio[];
  tiposDisponibles: TipoAbono[];
  abonoSeleccionado: number;
  mostrarModal :boolean;
  canDismiss = false;
  presentingElement = null;

  constructor(private service: AbonoService, private toastController: ToastController) {
    addIcons({
      calendarOutline,
      happyOutline,
      sadOutline
    });
    this.abono= new Abono();
    this.tipoAbono= new TipoAbono();
    this.servicios = [];
    this.tiposDisponibles = [];
    this.abonoSeleccionado = 0;
    this.mostrarModal = false;
  }

  ngOnInit() {

    this.service.abonoUsuarioLogueado().subscribe({
      next: (a) => {
        this.abono = a;
        if(a && a.tipoAbono){
          this.tipoAbono = a.tipoAbono;
          this.tipoAbono.descripcion = this.tipoAbono.descripcion?.substring(2);
        }
        if(a.tipoAbono?.servicios){this.servicios = a.tipoAbono.servicios}
        console.log(this.abono);
      },
      error: (e) => console.error(e),
      complete: () => console.log("Abono Obtenido")

    })

    this.service.listarTipoAbonos().subscribe({
      next: (l) => this.tiposDisponibles = l,
      error: (e) => console.error(e),
      complete: () => this.tiposDisponibles.forEach(t=> t.descripcion = t.descripcion?.substring(2))
    });
  }



  opcionSeleccionada(event: any) {
    this.abonoSeleccionado = event.detail.value;
    console.log(this.abonoSeleccionado);
  }

  contratar(){
    this.service.contratarRenovarAbono(this.abonoSeleccionado).subscribe({
      next: (l) => {
        this.abono = l;
        if(l && l.tipoAbono){
          this.tipoAbono = l.tipoAbono;
          this.tipoAbono.descripcion = this.tipoAbono.descripcion?.substring(2);
        }
        if(l.tipoAbono?.servicios){this.servicios = l.tipoAbono.servicios}
        console.log(this.abono);

      },
      error: (e) =>{
        console.log(e);
        this.mostrarMensaje("Ha ocurrido un problema al contratar abono","danger","sad-outline" );
      } ,
      complete: () => {
        this.mostrarMensaje("Abono contratado con éxito","primary","happy-outline");
        this.mostrarModal = false;
      }
    });
  }







  async mostrarMensaje(mensaje:string, color:string, icon:string) {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast',
      icon:icon,
      animated: true,
      color: color
    });

    toast.present();
  }

}
