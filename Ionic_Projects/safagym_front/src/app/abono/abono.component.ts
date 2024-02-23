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

  abonoActual?:Abono;
  tipoAbonoActual?: TipoAbono;

  ultimoAbono?:Abono;
  tipoAbonoUltimo?: TipoAbono;

  serviciosActual?: Servicio[];
  serviciosUltimo?: Servicio[];

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
    this.tiposDisponibles = [];
    this.abonoSeleccionado = 0;
    this.mostrarModal = false;
  }

  ngOnInit() {

    //ABONO ACTUAL
    this.service.abonoUsuarioLogueado().subscribe({
      next: (a) => {
        this.abonoActual = a;
        if(a && a.tipoAbono){
          this.tipoAbonoActual = a.tipoAbono;
          this.tipoAbonoActual.descripcion = this.tipoAbonoActual.descripcion?.substring(2);
          this.serviciosActual = a.tipoAbono.servicios;
        }
      },
      error: (e) => console.error(e),
      complete: () => console.log("Abono Obtenido")

    });


    //ULTIMO ABONO
    this.service.ultimoAbonoPasadoUsuarioLogueado().subscribe({
      next: (a) => {
        this.ultimoAbono = a;
        if(a && a.tipoAbono){
          this.tipoAbonoUltimo = a.tipoAbono;
          this.tipoAbonoUltimo.descripcion = this.tipoAbonoUltimo.descripcion?.substring(2);
          this.serviciosUltimo = a.tipoAbono.servicios;
        }
      },
      error: (e) => console.error(e),
      complete: () => console.log("Abono Obtenido")

    });


    //TIPOS DE ABONO DISPONIBLES
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
      next: (a) =>{
        if(a.status == 204){
          this.mostrarMensaje("Ya tienes un abono vigente actualmente.","warning","sad-outline" );
        }else{
          this.mostrarMensaje("Abono contratado con éxito","primary","happy-outline");
        }
      },
      error: (e) =>{
        this.mostrarMensaje("Ha ocurrido un error al intentar contratar abonos.","danger","sad-outline" );
      } ,
      complete: () => {
        this.mostrarModal = false;
        this.ngOnInit();
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
