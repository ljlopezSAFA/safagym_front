import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule, CommonModule, HeaderComponent],
})
export class AppComponent {
  constructor() {}
}
