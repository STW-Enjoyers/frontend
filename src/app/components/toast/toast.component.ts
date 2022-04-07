/**************************************************
 * file: toast.component.ts
 * Coms: This component show all notifications pushed in NotificationService
 **************************************************/

import {Component} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of notificationService.notifications"
      [class]="toast.classname"
      [autohide]="toast.autohide"
      [delay]="toast.delay || 5000"
      (hide)="notificationService.remove(toast)"
    >{{toast.body}}</ngb-toast>
  `
})
export class ToastComponent {
  constructor(public notificationService: NotificationService) {}
}
