import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Unizapp');
  }
}
