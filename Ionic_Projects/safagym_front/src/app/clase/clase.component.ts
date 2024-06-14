import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal, ToastController} from "@ionic/angular";
import {CommonModule, DatePipe} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {ClaseService} from "../service/clase.service";
import {FormsModule} from "@angular/forms";
import {addIcons} from "ionicons";
import {
  accessibilityOutline,
  alarmOutline,
  calendarOutline,
  closeOutline,
  eyeOutline,
  happyOutline,
  hourglassOutline,
  people,
  peopleOutline,
  personCircleOutline,
  personOutline,
  sadOutline
} from "ionicons/icons";
import {Clase} from "../modelos/Clase";
import {Monitor} from "../modelos/Monitor";
import {Cliente} from "../modelos/Cliente";
import {Router} from "@angular/router";
import {MonitorService} from "../service/monitor.service";
import {Observable} from "rxjs";
import * as moment from "moment/moment";

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule],
  providers: [ClaseService, DatePipe]
})
export class ClaseComponent implements OnInit {

  @ViewChild('crearClaseModal') modal!: IonModal;
  clases: any = []
  fechaFormateada: any;
  fechaInicio: any;
  fechaFin: any;
  monitorSeleccionado: Monitor;
  mostrarModal: boolean;
  asistentes: Cliente[];
  claseNueva: Clase;
  monitores: Observable<Monitor[]>;

  constructor(private service: ClaseService,private monitorService: MonitorService, private datepipe: DatePipe,
              private toastController: ToastController, private router: Router) {
    this.formatear(new Date());
    this.rellenarInicioYFin(new Date());
    this.monitorSeleccionado = new Monitor();
    this.claseNueva = new Clase();
    this.mostrarModal = false;
    this.asistentes = [];
    this.monitores = monitorService.obtenerDatos();
    addIcons({
      alarmOutline,
      personOutline,
      peopleOutline,
      hourglassOutline,
      calendarOutline,
      accessibilityOutline,
      people,
      personCircleOutline,
      happyOutline,
      sadOutline,
      closeOutline,
      eyeOutline
    })

  }

  ngOnInit(): void {
    this.cargarClases();
  }

  enviarFechaAlServidor(event: CustomEvent) {
    const nuevaFecha: Date = new Date(event.detail.value);
    this.formatear(nuevaFecha);
    this.rellenarInicioYFin(nuevaFecha);
    this.cargarClases();
  }

  formatear(fecha: Date) {
    this.fechaFormateada = this.datepipe.transform(fecha, 'yyyy-MM-dd');
  }


  rellenarInicioYFin(fecha: Date) {

    // Obtener el primer día del mes
    this.fechaInicio = this.datepipe.transform(new Date(fecha.getFullYear(), fecha.getMonth(), 1), 'yyyy-MM-dd');

    // Obtener el último día del mes
    this.fechaFin = this.datepipe.transform(new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0), 'yyyy-MM-dd');

  }

  asistirAClase(idClase: number) {
    this.service.asitir(idClase).subscribe({
      next: (d) => console.log(d),
      error: (e) => {
        console.error(e);
        this.router.navigate(["error"]);
      },
      complete: () => {
        this.mostrarMensaje("Se ha completado tu inscripción a la clase", "primary", "happy-outline");
        this.cargarClases();
      }
    });
  }

  borrarseDeClase(idClase: number) {
    this.service.borrarse(idClase).subscribe({
      next: (d) => console.log(d),
      error: (e) => {
        console.error(e);
        this.router.navigate(["error"]);
      },
      complete: () => {
        this.mostrarMensaje("Te has borrado de la clase correctamente", "danger", "sad-outline");
        this.cargarClases();
      }
    });
  }

  comprobarIncripcion(clase: Clase): boolean {
    let usernameLoged = localStorage.getItem('username');
    return <boolean>clase.clientes?.some(c => c.usuario?.username === usernameLoged);

  }

  cargarClases() {
    this.service.obtenerPorFecha(this.fechaFormateada).subscribe({
      next: (d) => {
        d.forEach(c => c.fecha =  moment(c.fecha,'DD/MM/YYYY HH:mm:ss'))
        this.clases = d.sort((a, b) => a.fecha - b.fecha);
      },
      error: (e) => {
        console.error(e);
        this.router.navigate(["error"]);
      },
      complete: () =>
        console.info(this.clases)

    });
  }


  async mostrarMensaje(mensaje: string, color: string, icon: string) {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'top', // Posición del toast (top, middle, bottom)
      cssClass: 'custom-toast', // clase css
      icon: icon,
      animated: true,
      color: color
    });

    toast.present();
  }

  mostrarDatosMonitor(c: Clase) {
    if (c.monitor) {
      this.monitorSeleccionado = c.monitor;
    }
    if (c.clientes) {
      this.asistentes = c.clientes;
    }
    this.mostrarModal = true;
  }

  guardarClase() {
    this.service.guardarNuevaClase(this.claseNueva).subscribe({
      next: (d) => console.log(d),
      error: (e) => {
        console.error(e);
        this.router.navigate(["error"]);
      },
      complete: () => {
        this.mostrarMensaje("Clase creada correctamente", "primary", "happy-outline");
        this.cargarClases();
        this.modal.dismiss(); // Cerrar el modal
      }
    });
  }


}
