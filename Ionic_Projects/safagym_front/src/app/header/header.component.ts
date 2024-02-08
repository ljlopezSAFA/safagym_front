import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonApp} from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  exportAs: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [IonApp,IonicModule],
})
export class HeaderComponent   {

  constructor() { }



}
