import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {MonitorComponent} from "./monitor/monitor.component";

export const routes: Routes = [
  {path: 'home',component:HomePage,},
  {path: '',component:HomePage},
  {path: 'monitor',component:MonitorComponent},
];
