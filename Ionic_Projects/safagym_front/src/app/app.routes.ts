import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {MonitorComponent} from "./monitor/monitor.component";
import {ClaseComponent} from "./clase/clase.component";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";
import {ErrorComponent} from "./error/error.component";
import {AbonoComponent} from "./abono/abono.component";
import {EntrenadorPersonalComponent} from "./entrenador-personal/entrenador-personal.component";

export const routes: Routes = [
  {path: 'home',component:HomePage,},
  {path: '',component:LoginComponent,},
  {path: 'monitor',component:MonitorComponent},
  {path: 'clase',component:ClaseComponent},
  {path: 'login',component:LoginComponent},
  {path: 'registro',component:RegistroComponent},
  {path: 'abono',component:AbonoComponent},
  {path: 'error',component:ErrorComponent},
  {path: 'entrenador-personal',component:EntrenadorPersonalComponent},
];
